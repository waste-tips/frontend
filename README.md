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
- Google Geocoding API for postal code determination

### Setup Google Geocoding API

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable "Geocoding API"
4. Create API credentials:
   - Go to "Credentials" → "Create Credentials" → "API key"
   - **Important**: Set "Application restrictions" to "None" (not HTTP referrers)
   - Set "API restrictions" to only "Geocoding API"
5. Add your API key to `.env`:
   ```
   VITE_GOOGLE_GEOCODING_API_KEY=your_api_key_here
   ```

### API Key Restrictions

**Important**: The Geocoding API requires an unrestricted API key (no HTTP referrer restrictions). This is a Google API limitation. For production use, consider:

1. **Server proxy**: Create a backend endpoint that calls Google API with a server-side key
2. **IP restrictions**: Use IP address restrictions instead of referrer restrictions
3. **Usage quotas**: Set daily/monthly usage limits in Google Cloud Console

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

Create a `.env` file with:

```
VITE_GOOGLE_GEOCODING_API_KEY=your_google_geocoding_api_key_here
```

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
- Secure API communication