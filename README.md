# ZenFocus 🌿

**ZenFocus** is a beautifully minimalist New Tab extension designed to help you stay focused and calm. It replaces your cluttered browser start page with a clean, aesthetic interface featuring a clock, a focus timer, and a distraction-free search bar.

![ZenFocus Preview](https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=2068&auto=format&fit=crop&ixlib=rb-4.0.3)
*(Note: Replace with actual screenshot of your extension)*

## ✨ Features

*   **Minimalist Design**: A clutter-free interface that promotes clarity and peace of mind.
*   **Dual Modes**:
    *   **Clock Mode**: Large, elegant time display with date.
    *   **Timer Mode**: A focus timer (Pomodoro style) with a visual progress ring and pleasant completion chimes.
*   **Smart Search**: A centered search bar with Google suggestions that stays out of your way until you need it.
*   **Deep Customization**:
    *   **Theme Presets**: Choose from curated themes like *Zen Dark*, *Midnight*, *Forest*, *Sunset*, *Ocean*, and *Cyber*.
    *   **Custom Color Picker**: Fully customize background, text, and accent colors with real-time preview.
    *   **Gradient Support**: Beautiful gradient text options for a modern look.
*   **Preferences**: Toggle between 12h/24h formats and enable/disable sound effects.

## 🚀 Getting Started

### Prerequisites

*   Node.js (v16 or higher)
*   npm or yarn

### Installation (Development)

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/zenfocus-new-tab.git
    cd zenfocus-new-tab
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Start the development server**
    ```bash
    npm run dev
    ```
    Open your browser to `http://localhost:5173` to see the app running.

## 📦 Building the Extension

To use ZenFocus as your actual browser New Tab page:

1.  **Build the project**
    ```bash
    npm run build
    ```
    This command compiles the React app and prepares the `dist` folder with the necessary `manifest.json` and assets.

2.  **Load into Chrome / Edge / Brave**
    *   Open your browser and navigate to `chrome://extensions/`.
    *   Enable **Developer mode** (toggle in the top right).
    *   Click **Load unpacked**.
    *   Select the `dist` folder inside your project directory.
    *   Open a new tab and enjoy your new Zen space!

## 🛠️ Tech Stack

*   **React 18**: UI Library
*   **TypeScript**: Type safety
*   **Vite**: Fast build tool
*   **Tailwind CSS**: Styling
*   **Lucide React**: Beautiful icons

## 🎨 Customization Guide

Click the **Settings (Gear)** icon in the top right corner to access the customization menu.
*   **Presets**: Click any preset card to instantly apply a theme.
*   **Custom**: Click the multi-colored circle button to open the advanced color picker. You can set specific hex codes for background, text, and accents.

## 📂 Project Structure

```text
zenfocus-new-tab/
├── components/          # React components (Clock, Timer, Settings, etc.)
├── fonts/               # Local font files
├── utils/               # Helper functions (time formatting, etc.)
├── App.tsx              # Main application component
├── build-extension.js   # Script to package the extension
├── constants.ts         # App constants and theme presets
├── manifest.json        # Chrome Extension manifest configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── types.ts             # TypeScript interfaces and types
└── vite.config.ts       # Vite build configuration
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Made with ❤️ for a focused web.
