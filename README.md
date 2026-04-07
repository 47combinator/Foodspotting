# Foodspotting

> A modern, health-conscious food decision assistant.

Foodspotting helps users make smarter, healthier food decisions in real-time. Designed specifically for health-conscious individuals and students in India.

## Features

- **Daily Food Decision Assistant:** Generate realistic meal suggestions based on budget (₹50–₹500), goals (weight loss, muscle gain, clean eating), and dietary preferences.
- **Smart Food Dictionary:** Search 60+ Indian food items with health scores, protein levels, and practical insights. Uses real, high-quality images from Wikimedia Commons.
- **Health-Conscious Mode:** A strict filter that prioritizes whole foods and penalizes processed sugars and saturated fats.
- **Weekly Analytics Dashboard:** Track healthy vs. junk food ratio, protein intake, and consistency metrics locally via your browser.
- **Privacy First:** 100% offline, local-storage based architecture. No servers, no tracking.
- **Premium Editorial Design:** Beautiful UI featuring light cream and lime green palette, utilizing Space Grotesk and DM Serif Display.

## Tech Stack

- **Frontend:** React 19, Vite 6
- **Architecture:** Context API for State, Custom Hooks for LocalStorage
- **Design:** Pure Vanilla CSS (No UI frameworks used)
- **Deployment Ready:** Multi-stage Dockerfile + Nginx for lightweight production hosting

## Local Development

```bash
# Install dependencies
npm install

# Start local server
npm run dev

# Build for production
npm run build
```

## License
MIT
