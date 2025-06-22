# Waste Sorting Helper - Germany

A smart waste sorting assistant for Germany that helps users properly dispose of their waste by analyzing photos and providing location-specific disposal instructions.

## Features

- 📍 **Location-based sorting**: Enter postal code or detect location automatically
- 📸 **Photo analysis**: Upload waste photos for AI-powered identification
- 🌍 **Multi-language support**: Available in 25+ languages
- 🔒 **Security**: Protected with reCAPTCHA Enterprise
- 📱 **Responsive design**: Works on all devices

## Location Detection

The app includes automatic location detection using:
- Browser Geolocation API
- Backend geocoding service for postal code determination

All API calls are handled securely through backend services, eliminating the need for client-side API keys.

## Development

```bash
npm install
npm run dev
```

## Deployment

The app is configured for Firebase Hosting:

```bash
npm run build
firebase deploy
```

## Environment Variables

No environment variables are required for basic functionality. All external API calls are handled through secure backend endpoints.

## Languages Supported

- German (Deutsch) 🇩🇪
- English 🇬🇧
- Turkish (Türkçe) 🇹🇷
- Russian (Русский) 🇷🇺
- Polish (Polski) 🇵🇱
- Arabic (العربية) 🇸🇦
- Kurdish (Kurdî) 🏳️
- Italian (Italiano) 🇮🇹
- And 17+ more languages...

## Security

- reCAPTCHA Enterprise protection
- Input validation
- Secure API communication through backend services
- No client-side API keys required

## Backend Services

The application uses secure backend endpoints for:
- **Location Detection**: `POST https://backend-geo-7lnemd56tq-ey.a.run.app`
- **Waste Analysis**: `POST https://backend-service-7lnemd56tq-ey.a.run.app`

Both endpoints require reCAPTCHA verification for security.