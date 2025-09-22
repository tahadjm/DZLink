import { Types } from 'mongoose';

export function toObjectId(id: string): Types.ObjectId {
  return new Types.ObjectId(id);
}

export function toObjectIdArray(ids?: string[]): Types.ObjectId[] {
  return ids?.map((id) => new Types.ObjectId(id)) || [];
}

export function buildPoint(
  lng: number,
  lat: number,
): { type: 'Point'; coordinates: [number, number] } {
  return { type: 'Point', coordinates: [lng, lat] };
}

export function buildGeoNear(
  lng?: number,
  lat?: number,
  distance = 5000,
  match: Record<string, any> = {},
) {
  if (lng === undefined || lat === undefined) {
    return null;
  }
  return {
    $geoNear: {
      near: buildPoint(lng, lat),
      distanceField: 'dist',
      maxDistance: distance,
      spherical: true,
      query: match,
    },
  };
}
