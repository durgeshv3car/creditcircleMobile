// module.exports = {
//   presets: ['module:@react-native/babel-preset'],
// };


module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@': './src', // Allows '@/hooks/useThemeColor' to resolve correctly
        },
      },
    ],
    ['react-native-reanimated/plugin'],
  ],
};
