# ZenFocus 🌿

**ZenFocus** is a beautifully minimalist New Tab extension designed to help you stay focused and calm. It replaces your cluttered browser start page with a clean, aesthetic interface featuring a clock, a focus timer, quick access to AI tools, and a distraction-free search bar.

![ZenFocus Preview](https://drive.google.com/uc?export=view&id=1M97wo3h2pnovN933JUv6zKS6y6sjtvAi)

## ✨ Features

*   **Minimalist Design**: A clutter-free interface that promotes clarity and peace of mind with ambient background effects.
*   **Dual Modes**:
    *   **Clock Mode**: Large, elegant time display with date.
    *   **Timer Mode**: A focus timer (Pomodoro style) with a visual progress ring and pleasant completion chimes.
*   **AI Tools Hub**: Quick access to popular AI assistants like ChatGPT, Gemini, Copilot, Claude, DeepSeek, Perplexity, Grok, Meta AI, and Qwen.
    *   *Toggleable*: Can be enabled/disabled in settings.
    *   *Scrollable*: Horizontal scrolling for easy access to all tools.
*   **Google Apps Menu**: Quick access to your favorite Google services.
*   **Smart Search**: A centered search bar with Google suggestions that stays out of your way until you need it.
*   **Deep Customization**:
    *   **Theme Presets**: Choose from curated color presets.
    *   **Custom Colors**: Fully customize background, text, and accent colors.
    *   **Preferences**: Toggle between 12h/24h formats, enable/disable sound effects, and toggle features like the AI Tools menu.

## 🚀 Getting Started

### Prerequisites

*   Node.js (v16 or higher)
*   npm or yarn

### Installation (Development)

1.  **Clone the repository**
    ```bash
    git clone https://github.com/Subhankar-Patra1/zenfocus-new-tab-website.git
    cd zenfocus-new-tab-website
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
*   **Time Format**: Switch between 12-hour and 24-hour clocks.
*   **Sound**: Enable or disable timer sounds.
*   **Features**: Toggle the visibility of the Google Apps Menu and AI Tools Menu.
*   **Colors**: Select from presets or use the palette icon to choose custom colors for the background, text, and accents.

## 📂 Project Structure

```text
zenfocus-new-tab-website/
├── api/                 # Backend API functions (e.g., search suggestions)
├── components/          # React components (Clock, Timer, Settings, AiToolsMenu, etc.)
├── fonts/               # Local font files
├── utils/               # Helper functions (time formatting, etc.)
├── App.tsx              # Main application component
├── build-extension.js   # Script to package the extension
├── constants.ts         # App constants and theme presets
├── index.css            # Global styles and Tailwind directives
├── manifest.json        # Chrome Extension manifest configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── types.ts             # TypeScript interfaces and types
└── vite.config.ts       # Vite build configuration
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Made with ❤️ for a focused web.
