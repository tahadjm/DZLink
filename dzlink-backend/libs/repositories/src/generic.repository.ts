import { Injectable } from '@nestjs/common';
import { Model, FilterQuery, UpdateQuery } from 'mongoose';

function convertObjectIdToString(doc: any): any {
  if (!doc) return doc;
  if (Array.isArray(doc)) return doc.map(convertObjectIdToString);

  if (doc._id?.toString) {
    const { _id, ...rest } = doc;
    return { _id: _id.toString(), ...rest };
  }

  return doc;
}

@Injectable()
export class GenericRepository<T> {
  constructor(protected readonly model: Model<T>) {}

  /* ---------- reads ---------- */
  async findById(id: string, withAudit = false): Promise<any> {
    const doc = await this.model.findById(id).lean({ auditors: withAudit });
    return convertObjectIdToString(doc);
  }

  async findOne(filter: FilterQuery<T>): Promise<any> {
    const doc = await this.model.findOne(filter).lean();
    return convertObjectIdToString(doc);
  }

  async find(filter: FilterQuery<T>, withAudit = false): Promise<any[]> {
    const docs = await this.model.find(filter).lean({ auditors: withAudit });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return convertObjectIdToString(docs);
  }

  async paginate(
    filter: FilterQuery<T>,
    page = 0,
    limit = 20,
    withAudit = false,
  ): Promise<{
    data: any[];
    meta: { page: number; limit: number; total: number };
  }> {
    const MAX_LIMIT = 50;
    const safeLimit = Math.min(limit, MAX_LIMIT);

    const [data, total] = await Promise.all([
      this.model
        .find(filter)
        .skip(page * safeLimit)
        .limit(safeLimit)
        .lean({ auditors: withAudit }),
      this.model.countDocuments(filter),
    ]);

    return {
      data: convertObjectIdToString(data),
      meta: { page, limit: safeLimit, total },
    };
  }

  /* ---------- writes ---------- */
  async create(payload: Partial<T>): Promise<any> {
    const doc = await this.model.create(payload);
    return convertObjectIdToString(doc.toObject());
  }

  async update(id: string, payload: UpdateQuery<T>): Promise<any> {
    const doc = await this.model
      .findByIdAndUpdate(id, payload, { new: true })
      .lean();
    return convertObjectIdToString(doc);
  }

  async delete(id: string): Promise<any> {
    const doc = await this.model.findByIdAndDelete(id).lean();
    return convertObjectIdToString(doc);
  }
}
