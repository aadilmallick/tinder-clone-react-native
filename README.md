# Project quickstart

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
