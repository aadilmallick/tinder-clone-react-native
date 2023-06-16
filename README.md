# Project Overview

This is a personal project that I created using React Native and Firebase. The app is designed to emulate Tinder, including the swiping, matching, and messaging functionality. The main flow of the app goes as follows:

1. Login with Google
2. Setup your profile
3. Swipe or pass on people
4. If you swipe on a person who has already swiped on you, you will get a match and be able to message that person.

## Techonologies used

- Firebase
- Nativewind
- React Native + Expo
- React Native swiper
- Expo Authsession

## Project Demo

If you want to test out this app of build up on it, follow these steps:

1. Clone the repository
2. Install all dependencies with `npm install`
3. Modify your `app.json` so that it includes your own package name, your own credentials, etc. Make sure to fill in the `scheme`, `ios.bundleIdentifier`, and `android.package` with your own package name, like a `com.myname.myappname` sort of syntax.

```json
// app.json
"scheme": "your_package_name",
...
"ios": {
  ...
  "bundleIdentifier": "your_package_name",
  "buildNumber": "1.0.0"
},
"android": {
  ...
  "package": "your_package_name",
  "versionCode": 1
}
```

4. Create a Google Cloud project

# How I did this project

## Installation

```bash
#react native navigation
npm install @react-navigation/native
npx expo install react-native-screens react-native-safe-area-context
npm install @react-navigation/native-stack

# redux
npm i prop-types @reduxjs/toolkit react-redux axios

# other libraries
npm i toastify-react-native react-native-uuid
npm i formik yup
npm i -D react-native-dotenv
npm i @tanstack/react-query

# nativewind initialization
npm i nativewind
npm i --save-dev tailwindcss
npx tailwindcss init
```

## Nativewind setup

1. Add the files to allow tailwind styling for in the `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

2. Add nativewind plugin to `babel.config.js`:

```javascript
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: ["nativewind/babel"],
  };
};
```

## React native dotenv setup

2. Add the `["module:react-native-dotenv"]` to list of `plugins` in your `babel.config.js`.

```javascript
// babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: ["nativewind/babel", ["module:react-native-dotenv"]],
  };
};
```

3. Clear the cache and start your project

```bash
npx expo start --clear
```
