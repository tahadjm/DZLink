import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { AdminsRepository } from '@/libs/repositories';
import { CitesService } from './cities/cities.service';
import { TagService } from './tags/tags.service';
import * as argon2 from 'argon2';

// --- Seed Admin ---
async function seedAdmin(adminsRepo: AdminsRepository, config: ConfigService) {
  const email = config.get<string>('seeder.SEED_ADMIN_EMAIL');
  const password = config.get<string>('seeder.SEED_ADMIN_PASSWORD');

  const exists = await adminsRepo.findByEmail(email);
  if (exists) {
    console.log('ℹ️ Admin already exists, skipping.');
    return;
  }

  const hash = await argon2.hash(password);
  await adminsRepo.createAdmin({ email, password_hash: hash });

  console.log(`✅ Admin created: ${email} / ${password}`);
}

// --- Seed Cities (58 wilayas of Algeria) ---
async function seedCities(citiesService: CitesService) {
  const wilayas = [
    'Adrar',
    'Chlef',
    'Laghouat',
    'Oum El Bouaghi',
    'Batna',
    'Béjaïa',
    'Biskra',
    'Béchar',
    'Blida',
    'Bouira',
    'Tamanrasset',
    'Tébessa',
    'Tlemcen',
    'Tiaret',
    'Tizi Ouzou',
    'Algiers',
    'Djelfa',
    'Jijel',
    'Sétif',
    'Saïda',
    'Skikda',
    'Sidi Bel Abbès',
    'Annaba',
    'Guelma',
    'Constantine',
    'Médéa',
    'Mostaganem',
    'M’Sila',
    'Mascara',
    'Ouargla',
    'Oran',
    'El Bayadh',
    'Illizi',
    'Bordj Bou Arréridj',
    'Boumerdès',
    'El Tarf',
    'Tindouf',
    'Tissemsilt',
    'El Oued',
    'Khenchela',
    'Souk Ahras',
    'Tipaza',
    'Mila',
    'Aïn Defla',
    'Naâma',
    'Aïn Témouchent',
    'Ghardaïa',
    'Relizane',
    'Timimoun',
    'Bordj Badji Mokhtar',
    'Ouled Djellal',
    'Béni Abbès',
    'In Salah',
    'In Guezzam',
    'Touggourt',
    'Djanet',
    'El M’Ghair',
    'El Meniaa',
  ];

  for (const name of wilayas) {
    let exists = null;
    try {
      exists = await citiesService.findByName(name);
    } catch {
      // ignore NotFoundException
    }

    if (!exists) {
      await citiesService.create({ name });
      console.log(`✅ City added: ${name}`);
    } else {
      console.log(`ℹ️ City exists: ${name}`);
    }
  }
  console.log('🌍 Cities seeding done.');
}

// --- Seed Tags ---
async function seedTags(tagService: TagService) {
  const tags = [
    // Web & Frontend
    'JavaScript',
    'TypeScript',
    'React',
    'React Native',
    'Next.js',
    'Angular',
    'Vue.js',
    'TailwindCSS',
    'Sass',

    // Backend
    'Node.js',
    'NestJS',
    'Express.js',
    'GraphQL',
    'REST API',

    // Databases
    'MongoDB',
    'PostgreSQL',
    'MySQL',
    'Redis',

    // DevOps
    'Docker',
    'Kubernetes',
    'CI/CD',
    'AWS',
    'Azure',
    'GCP',

    // Design & UI
    'UI/UX',
    'Figma',
    'Adobe XD',

    // Business & Freelancing
    'Freelancing',
    'Startup',
    'SEO',
    'Marketing',

    // Mobile
    'iOS',
    'Android',
    'Flutter',

    // Others
    'AI/ML',
    'Data Science',
    'Cybersecurity',
    'Blockchain',
  ];

  for (const name of tags) {
    let exists = null;
    try {
      exists = await tagService.findByName(name);
    } catch {
      // ignore NotFoundException
    }

    if (!exists) {
      await tagService.create({ name });
      console.log(`✅ Tag added: ${name}`);
    } else {
      console.log(`ℹ️ Tag exists: ${name}`);
    }
  }

  console.log('🏷️ Tags seeding done.');
}

// --- Bootstrap ---
async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const config = app.get(ConfigService);

  try {
    console.log('🌱 Starting database seeding...');

    const adminsRepo = app.get(AdminsRepository);
    const citiesService = app.get(CitesService);
    const tagService = app.get(TagService);

    if (config.get('seeder.SEED_ADMIN') === 'true') {
      await seedAdmin(adminsRepo, config);
    }
    if (config.get('seeder.SEED_CITIES') === 'true') {
      await seedCities(citiesService);
    }
    if (config.get('seeder.SEED_TAGS') === 'true') {
      await seedTags(tagService);
    }

    console.log('✅ Seeding complete!');
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  } finally {
    await app.close();
  }
}

bootstrap();
