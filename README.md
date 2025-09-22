# 📱 DZLink - Mobile Networking App

A **React Native (Expo)** + **NestJS** application developed as part of the **technical test** for the **Mobile Developer** role at  <img src="https://bignova-company.com/wp-content/uploads/2023/11/bignova-1.png" alt="Bignova" height="24" style="vertical-align: middle;" />
DZLink is a mobile-first platform that allows users to **create profiles, connect with others, share offers, and explore opportunities** across Algeria.

[![Watch Demo](https://img.shields.io/badge/▶️%20Watch%20Demo-purple?style=for-the-badge)](https://drive.google.com/file/d/1uHHoEP8icUEMSF6JWreMVrJizBI-JB9O/view?usp=sharing)

---

## ✨ Features

- 🔐 **Authentication** (Signup / Signin).
- 👤 **User Profiles** with avatar, bio, city, tags, and links.
- 🌍 **Cities & Tags** seeding (58 wilayas of Algeria + multiple tags).
- 📌 **Offers** system with creation, editing, and browsing.
- 🔎 **Filters & Search** to discover profiles and offers.
- 📱 **Modern UI/UX** with responsive design.

---

## 🛠️ Tech Stack

### 📱 Frontend
- [Expo](https://expo.dev/) (React Native)
- [React Hook Form](https://react-hook-form.com/) - Form handling
- [TailwindCSS / NativeWind](https://www.nativewind.dev/) - Styling
- [React Navigation](https://reactnavigation.org/) - Navigation
- TypeScript

### ⚙️ Backend
- [NestJS](https://nestjs.com/) - Backend framework
- [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/) - Database
- [JWT](https://jwt.io/) - Authentication
- TypeScript

---

## 🚀 Getting Started

### 1. Clone repository
```bash
git clone https://github.com/your-username/dzlink
cd dzlink
```

### 2. Setup backend
```bash
cd dzlink-backend
cp .env.example .env   # Fill in required env variables
npm install
npm run start:dev
```

### 3. Setup frontend
```bash
cd dzlink-frontend
cp .env.example .env   # Fill in API URL
npm install
npx expo start
```

---

## 📂 Project Structure

```
dzlink-backend/   → NestJS backend with APIs, authentication, database, and seeding
mobile/           → Expo React Native app with UI components, navigation, and services
```

---

## 📖 Documentation

Each part of the project has its own README with detailed setup and usage instructions:

- 📂 [Backend (NestJS)](./dzlink-backend/README.md)
- 📱 [Frontend (React Native - Expo)](./mobile/README.md)

👉 Make sure to check the corresponding README before running each part.

---

## ▶️ Demo

[![Watch Demo](https://img.shields.io/badge/▶️%20Watch%20Demo-purple?style=for-the-badge)](https://drive.google.com/file/d/1uHHoEP8icUEMSF6JWreMVrJizBI-JB9O/view?usp=sharing)

---

## 👨‍💻 Author

Developed by **Taha Djemili** as part of the **BigNova Mobile Developer technical test**.
