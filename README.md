# KICKS - Premium Sneaker Store

A high-end, responsive sneaker store web application built with **Next.js 15**, **TypeScript**, and **Redux Toolkit**. This project demonstrates advanced frontend implementation, including custom UI components, robust API state handling, and interactive micro-animations.

## 🚀 Live Demo
**[Live Project Site](https://kicks-zavisoft-frontend-task-q49v.vercel.app/)**

---

## 🛠 Tech Stack
- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animation**: CSS Transitions & Lucide Micro-animations
- **Carousel**: [Embla Carousel](https://www.embla-carousel.com/)
- **API**: [Platzi Fake Store API](https://fakeapi.platzi.com/)

---

## ✨ Key Features

### 🛍 Shopping Experience
- **Interactive Product Detail**: Features a **Pixel-perfect Custom Image Magnifier** for a premium "explore" feel.
- **Dynamic Cart**: Full cart functionality managed via Redux. Users can add, remove, and update quantities/sizes seamlessly.
- **Animated Feedback**: "Add to Cart" button features a smooth success transition with color changes and checkmark icons.
- **Color & Size Selectors**: Fine-tuned selectors for a tailored shopping experience.

### 🌐 Performance & Reliability
- **Robust API States**: Custom `ApiState` component ensures a professional experience during data fetching.
  - **Loading**: Pulse skeletons tailored to each section.
  - **Error handling**: Styled error cards with a **"Try Again"** button to recover from failed requests.
  - **Empty states**: Context-specific messages when no products/categories are found.
- **Image Optimization**: Utilizes Next.js `Image` component for high performance and remote image handling.

### 📱 Premium Design
- **Fully Responsive**: Optimized for everything from mobile phones up to [1400px] desktop displays.
- **Balanced Header**: Custom three-column layout to ensure consistent logo centering regardless of navigation width.
- **Complex Carousels**: Implements unique vertical-pair carousels for mobile categories while maintaining standard horizontal carousels for desktop.

---

## 📦 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/ArfatChowdhury/kicks-zavisoft-frontend-task.git
cd kicks-zavisoft-frontend-task
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run development server
```bash
npm run dev
```

### 4. Build for production
```bash
npm run build
```

---

## 📝 Deployment Notes (Vercel)
- The project includes an `.npmrc` file with `legacy-peer-deps=true` to ensure smooth dependency installation on Vercel's build servers.
- All remote image hostnames are whitelisted in `next.config.ts` to support the Platzi API's various CDN sources.

---

## 🤝 Contributing
Built as part of the Zavisoft Frontend Technical Task.
