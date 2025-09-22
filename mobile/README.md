# 📱 DZLink - Mobile App

A **React Native (Expo)** application developed as part of the **technical test** for the **Mobile Developer** role at <img src="https://temtemone.com/_next/static/media/Logo-temtemOne.15009a93.svg" alt="Temtem" height="24" style="vertical-align: middle;" />

DZLink allows users to **create profiles, browse offers, and interact with sponsors**, built with a **modern UI/UX** and connected to the DZLink Backend API.

---

## ✨ Features

- 🔐 **Authentication** (signup / signin).
- 👤 **Profile management** with avatar, bio, tags, and city.
- 🌍 **Browse Algerian cities (Wilayas)** and filter content.
- 🏷️ **Tags system** for discovering relevant offers and profiles.
- 📢 **Offers & Sponsorships** creation and browsing.
- 📱 **Responsive design** using TailwindCSS (NativeWind).
- ⚡ State management with React hooks & contexts.

---

## 🛠️ Tech Stack

- [Expo](https://expo.dev/) (React Native)
- [React Navigation](https://reactnavigation.org/) - Navigation
- [React Hook Form](https://react-hook-form.com/) - Form validation
- [NativeWind](https://www.nativewind.dev/) - TailwindCSS styling
- [Axios](https://axios-http.com/) - API calls
- TypeScript for strong typing

---

## 🚀 Getting Started

### 1. Clone repo

```bash
git clone https://github.com/<your-username>/dzlink-frontend
cd dzlink-frontend
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Setup environment variables

1. Copy the `.env.example` file to create your own `.env` file:

   ```bash
   cp .env.example .env
   ```

2. Open the new `.env` file and configure your backend API endpoint:

   ```env
   EXPO_PUBLIC_API_URL=http://localhost:4000
   ```

### 4. Run the project

1. Start the Expo development server:

   ```bash
   npx expo start
   ```

2. You can then choose how to run the app:
   - Press `i` to launch it on **iOS Simulator** (Mac only).
   - Press `a` to launch it on **Android Emulator**.
   - Scan the QR code in the terminal (or Expo Go app) to run it on a **real device**.

---

## 📂 Project structure

```
.
├── README.md
├── app
│   ├── (tabs)
│   │   ├── _layout.tsx
│   │   ├── index.tsx
│   │   └── profile.tsx
│   ├── +not-found.tsx
│   ├── _layout.tsx
│   ├── index.tsx
│   └── profile
│       └── preview.tsx
├── app.json
├── assets
│   ├── adaptive-icon.png
│   ├── fonts
│   │   └── SpaceMono-Regular.ttf
│   ├── images
│   │   ├── ChatGPT Image Sep 17, 2025, 08_54_00 AM.png
│   │   ├── android-icon-background.png
│   │   ├── android-icon-foreground.png
│   │   ├── android-icon-monochrome.png
│   │   ├── favicon.png
│   │   ├── icon.png
│   │   ├── partial-react-logo copy.png
│   │   ├── partial-react-logo.png
│   │   ├── react-logo.png
│   │   ├── react-logo@2x.png
│   │   ├── react-logo@3x.png
│   │   └── splash-icon.png
│   ├── splash.png
│   ├── thumbnails
│   │   ├── profile-1.jpg
│   │   └── profile-2.jpg
│   └── uploads
│       └── logo-pack.png
├── babel.config.js
├── components
│   ├── HapticTab.tsx
│   ├── Home
│   │   ├── feed-item.tsx
│   │   ├── filters
│   │   ├── filters-bottom-sheet.tsx
│   │   ├── home-header.tsx
│   │   ├── profiles-list.tsx
│   │   └── unsponsored-profiles-list.tsx
│   ├── PreviewButton.tsx
│   ├── cta-button.tsx
│   ├── floating-back-button.tsx
│   ├── keyboard-avoiding-view-wrapper.tsx
│   ├── layout
│   │   ├── header-Right.tsx
│   │   └── header-left.tsx
│   ├── loading.tsx
│   ├── overlay.tsx
│   ├── preview
│   │   ├── form-lead.tsx
│   │   └── preview-header.tsx
│   ├── profile
│   │   ├── links-list.tsx
│   │   ├── offer-card.tsx
│   │   ├── offers-section.tsx
│   │   ├── profile-header.tsx
│   │   ├── sheets-renderer.tsx
│   │   ├── sponsorship-block.tsx
│   │   ├── sponsorship-section.tsx
│   │   ├── styles.ts
│   │   └── user-link-cards.tsx
│   ├── screen-container.tsx
│   ├── section-header.tsx
│   ├── sheets
│   │   ├── avatar-sheet.tsx
│   │   ├── lead-form-sheet.tsx
│   │   ├── link-sheet.tsx
│   │   ├── offer-sheet.tsx
│   │   ├── profile-sheet.tsx
│   │   ├── sheet-container.tsx
│   │   ├── sheet-header.tsx
│   │   └── sponsorship-bottom-sheet.tsx
│   ├── skeleton.tsx
│   ├── stats
│   │   ├── stats-card.tsx
│   │   └── stats-summary.tsx
│   ├── thumbnail-container.tsx
│   ├── truncate-text.tsx
│   └── ui
│       ├── IconSymbol.tsx
│       ├── TabBarBackground.tsx
│       ├── avatar.tsx
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── confirm-modal.tsx
│       ├── header-section.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── separator.tsx
│       ├── switch.tsx
│       └── text.tsx
├── config
│   └── filters.ts
├── eslint.config.js
├── expo-env.d.ts
├── global.css
├── hooks
│   ├── profile
│   │   ├── index.ts
│   │   ├── useLeadForm.ts
│   │   ├── useProfileActions.ts
│   │   ├── useProfileFIlters.ts
│   │   └── useProfileForms.ts
│   ├── useDebounce.ts
│   └── useSheet.ts
├── libs
│   ├── base-url.ts
│   ├── constants.ts
│   ├── enums
│   │   └── roles.ts
│   ├── helpers
│   │   └── leadFormValidator.ts
│   ├── navigation
│   │   └── index.ts
│   ├── toast
│   │   └── config.tsx
│   └── utils
│       ├── filters.ts
│       ├── helpers.ts
│       ├── index.ts
│       └── truncate-text.ts
├── metro.config.js
├── nativewind-env.d.ts
├── package.json
├── pnpm-lock.yaml
├── services
│   ├── __mocks__
│   │   ├── filters.ts
│   │   ├── index.ts
│   │   ├── offers.ts
│   │   └── users.ts
│   ├── api
│   │   └── axios-instance.ts
│   ├── filters-service.ts
│   ├── http.ts
│   ├── offers-service.ts
│   ├── sponsorshipApi.ts
│   ├── stats.ts
│   └── user-service.ts
├── tailwind.config.js
├── tsconfig.json
└── types
    ├── analytics.ts
    ├── api
    │   ├── filters.ts
    │   └── index.ts
    ├── filters.ts
    ├── forms
    │   ├── profile.ts
    │   └── type.ts
    ├── index.ts
    ├── lead.ts
    ├── offers.ts
    ├── sponorship.ts
    └── user.ts


```

---

## 👤 Author

- **Taha Djemili**  
  [GitHub](https://github.com/<your-username>) | [Email](mailto:taha.djm087@gmail.com)

---

## 📄 License

This project is for assessment purposes only.
