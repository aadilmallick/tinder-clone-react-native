# Project quickstart

1. Run quick installation of all necessary dependencies

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

1. Setup up nativewind accordingly: [](https://www.nativewind.dev/quick-starts/expo)

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
expo r -c
```
