# ⚡ DZLink - Backend API

A **NestJS + MongoDB** backend developed as part of the **technical test** for the **Backend Developer** role at <img src="https://temtemone.com/_next/static/media/Logo-temtemOne.15009a93.svg" alt="Temtem" height="24" style="vertical-align: middle;" />

DZLink provides the **API services** for the DZLink platform: authentication, user profiles, offers, sponsorships, cities (Wilayas), and tags.  

---

## ✨ Features

- 🔐 **Authentication & Authorization** with JWT + Argon2.
- 👤 **User profiles** with avatar, bio, tags, and location.
- 🌍 **58 Algerian Wilayas** pre-seeded in the database.
- 🏷️ **Tags system** for categorizing users and offers.
- 📢 **Offers & Sponsorships** modules.
- 📂 **Clean modular architecture** (NestJS best practices).
- 🛠️ **Docker-ready** for containerized deployment.

---

## 🛠️ Tech Stack

- [NestJS](https://nestjs.com/) - Framework
- [MongoDB + Mongoose](https://mongoosejs.com/) - Database & ODM
- [JWT](https://jwt.io/) - Authentication
- [Argon2](https://www.npmjs.com/package/argon2) - Password hashing
- [Class Validator](https://github.com/typestack/class-validator) - Validation

---

## 🚀 Getting Started

### 1. Clone repo

```bash
git clone https://github.com/<your-username>/dzlink-backend
cd dzlink-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

1. Copy the `.env.example` file to create your own `.env` file:

   ```bash
   cp .env.example .env
   ```

2. Open the new `.env` file and fill in your config:

   ```env
   # MongoDB
    MONGO_HOST=localhost
    MONGO_PORT=27017
    MONGO_INITDB_DATABASE=your-db-name

    # Server
    PORT=4000

    # Debugging
    DEBUG=true
    
    # Authentication
    JWT_SECRET=your-jwt-secret
    
    # Admin seeding
    SEED_ADMIN=true
    SEED_ADMIN_EMAIL=admin@dzlink.com
    SEED_ADMIN_PASSWORD=password123
    
    # Data seeding
    SEED_CITIES=true
    SEED_TAGS=true
   ```

### 4. Seed database

Preloads **58 Algerian Wilayas** and common tags:

```bash
npm run seed
```



---

## 📂 Project structure

```
  ..
├── README.md
├── dist
│   ├── libs
│   │   ├── repositories
│   │   ├── schemas
│   │   ├── storage
│   │   └── utils
│   ├── src
│   │   ├── admin-auth
│   │   ├── app.controller.d.ts
│   │   ├── app.controller.js
│   │   ├── app.controller.js.map
│   │   ├── app.module.d.ts
│   │   ├── app.module.js
│   │   ├── app.module.js.map
│   │   ├── app.service.d.ts
│   │   ├── app.service.js
│   │   ├── app.service.js.map
│   │   ├── auth
│   │   ├── cities
│   │   ├── config
│   │   ├── database
│   │   ├── main.d.ts
│   │   ├── main.js
│   │   ├── main.js.map
│   │   ├── offers
│   │   ├── seeder.d.ts
│   │   ├── seeder.js
│   │   ├── seeder.js.map
│   │   ├── sponsorship
│   │   ├── tags
│   │   ├── upload
│   │   └── users
│   └── tsconfig.build.tsbuildinfo
├── eslint.config.mjs
├── libs
│   ├── repositories
│   │   ├── index.ts
│   │   ├── src
│   │   └── tsconfig.lib.json
│   ├── schemas
│   │   ├── index.ts
│   │   ├── src
│   │   └── tsconfig.lib.json
│   ├── storage
│   │   ├── index.ts
│   │   └── src
│   └── utils
│       ├── index.ts
│       ├── src
│       └── tsconfig.lib.json
├── nest-cli.json
├── package.json
├── pnpm-lock.yaml
├── src
│   ├── admin-auth
│   │   ├── admin-auth.controller.ts
│   │   ├── admin-auth.module.ts
│   │   ├── admin-auth.service.ts
│   │   ├── dto
│   │   ├── guards
│   │   └── strategies
│   ├── app.controller.spec.ts
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   ├── auth
│   │   ├── auth.controller.ts
│   │   ├── auth.module.ts
│   │   ├── auth.service.ts
│   │   ├── decorators
│   │   ├── dto
│   │   ├── guards
│   │   ├── interfaces
│   │   └── strategies
│   ├── cities
│   │   ├── cities.controller.ts
│   │   ├── cities.module.ts
│   │   ├── cities.service.ts
│   │   └── dto
│   ├── config
│   │   ├── index.ts
│   │   ├── jwt-env.config.ts
│   │   ├── mongo-env.config.ts
│   │   ├── seeder-config.ts
│   │   └── validate-env.ts
│   ├── database
│   │   └── database.module.ts
│   ├── main.ts
│   ├── offers
│   │   ├── dto
│   │   ├── offers.controller.ts
│   │   ├── offers.module.ts
│   │   └── offers.service.ts
│   ├── seeder.ts
│   ├── sponsorship
│   │   ├── dto
│   │   ├── sponsorship.controller.ts
│   │   ├── sponsorship.module.ts
│   │   └── sponsorship.service.ts
│   ├── tags
│   │   ├── dto
│   │   ├── tags.controller.ts
│   │   ├── tags.module.ts
│   │   └── tags.service.ts
│   ├── upload
│   │   ├── dto
│   │   ├── upload.controller.ts
│   │   ├── upload.module.ts
│   │   ├── upload.service.ts
│   │   └── validations
│   └── users
│       ├── dto
│       ├── users.controller.ts
│       ├── users.module.ts
│       └── users.service.ts
├── test
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── tsconfig.build.json
├── tsconfig.json
└── uploads

```


## 👤 Author

- **Taha Djemili**  
  [GitHub](https://github.com/<your-username>) | [Email](mailto:taha.djm087@gmail.com)

---

## 📄 License

This project is for assessment purposes only.
