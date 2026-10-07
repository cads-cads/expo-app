cat > global.css <<'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;
EOF

cat > babel.config.js <<'EOF'
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
  };
};
EOF

cat > metro.config.js <<'EOF'
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

module.exports = withNativeWind(getDefaultConfig(__dirname), {
  input: "./global.css",
});
EOF

cat > nativewind-env.d.ts <<'EOF'
/// <reference types="nativewind/types" />
EOF

ls global.css tailwind.config.js babel.config.js metro.config.js
npx expo start --clear