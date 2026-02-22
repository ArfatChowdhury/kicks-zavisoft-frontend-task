# KICKS - Frontend Implementation Task

A responsive sneaker store web application built with Next.js, TypeScript, and Redux, integrating the Platzi Fake Store API.

## 🚀 Live Demo
[Live Deployment URL](https://kicks-store-task.vercel.app/) *(Placeholder)*

## 🛠 Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **State Management**: Redux Toolkit (Cart functionality)
- **Data Fetching**: Axios
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Carousel**: Embla Carousel

## ✨ Features
### Core Requirements
- **Landing Page**:
  - Dynamic "New Drops" product listing via API.
  - Interactive "Categories" carousel fetching live data.
  - Fully responsive Hero and Review sections.
- **Product Detail Page**:
  - Live data fetching for individual products.
  - **Pixel-perfect Image Magnifier** for detailed view.
  - Size and Color selectors with local state.
  - Related products implementation ("You may also like").
- **API Integration**: Complete integration with Platzi Fake Store API for products and categories.
- **Responsive Design**: Tailored layouts for Mobile and Desktop.

### Bonus Features
- **Cart Page**:
  - Full Redux-based state management.
  - Add/Remove items.
  - Update quantity and size from the cart.
  - Favorite (Heart) toggle functionality.
- **UI/UX Polish**:
  - Loading skeletons for API requests.
  - Hover animations and smooth transitions.
  - Micro-interactions on buttons and navigation.

## 📦 Setup Instructions
1. **Clone the repository**:
   ```bash
   git clone https://github.com/ArfatChowdhury/kicks-zavisoft-frontend-task.git
   cd kicks-zavisoft-frontend-task
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Run the development server**:
   ```bash
   npm run dev
   ```
4. **Build for production**:
   ```bash
   npm run build
   ```

## 📝 Notes
- Handled API data cleaning (e.g., parsing image URL strings from Platzi API).
- Footer restructured to match Figma spacing exactly.
- Implemented vertical-pair carousel logic for mobile categories.

