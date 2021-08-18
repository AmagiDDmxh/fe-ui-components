const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  mode: "jit",
  prefix: 'okd-',
  purge: {
    mode: 'all',
    content: ["./src/**/*.{js,jsx,ts,tsx}"]
  },
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "gray-50": "var(--gray-50)",
        "gray-100": "var(--gray-100)",
        "gray-200": "var(--gray-200)",
        "gray-300": "var(--gray-300)",
        "gray-400": "var(--gray-400)",
        "gray-500": "var(--gray-500)",
        "gray-600": "var(--gray-600)",
        "gray-700": "var(--gray-700)",
        "gray-800": "var(--gray-800)",
        "gray-900": "var(--gray-900)",
        "brand-50": "var(--brand-50)",
        "brand-100": "var(--brand-100)",
        "brand-200": "var(--brand-200)",
        "brand-300": "var(--brand-300)",
        "brand-400": "var(--brand-400)",
        "brand-500": "var(--brand-500)",
        "brand-600": "var(--brand-600)",
        "brand-700": "var(--brand-700)",
        "brand-800": "var(--brand-800)",
        "brand-900": "var(--brand-900)",
        "green-50": "var(--green-50)",
        "green-100": "var(--green-100)",
        "green-200": "var(--green-200)",
        "green-300": "var(--green-300)",
        "green-400": "var(--green-400)",
        "green-500": "var(--green-500)",
        "green-600": "var(--green-600)",
        "green-700": "var(--green-700)",
        "green-800": "var(--green-800)",
        "green-900": "var(--green-900)",
        "blue-50": "var(--blue-50)",
        "blue-100": "var(--blue-100)",
        "blue-200": "var(--blue-200)",
        "blue-300": "var(--blue-300)",
        "blue-400": "var(--blue-400)",
        "blue-500": "var(--blue-500)",
        "blue-600": "var(--blue-600)",
        "blue-700": "var(--blue-700)",
        "blue-800": "var(--blue-800)",
        "blue-900": "var(--blue-900)",
        "yellow-50": "var(--yellow-50)",
        "yellow-100": "var(--yellow-100)",
        "yellow-200": "var(--yellow-200)",
        "yellow-300": "var(--yellow-300)",
        "yellow-400": "var(--yellow-400)",
        "yellow-500": "var(--yellow-500)",
        "yellow-600": "var(--yellow-600)",
        "yellow-700": "var(--yellow-700)",
        "yellow-800": "var(--yellow-800)",
        "yellow-900": "var(--yellow-900)",
        "red-50": "var(--red-50)",
        "red-100": "var(--red-100)",
        "red-200": "var(--red-200)",
        "red-300": "var(--red-300)",
        "red-400": "var(--red-400)",
        "red-500": "var(--red-500)",
        "red-600": "var(--red-600)",
        "red-700": "var(--red-700)",
        "red-800": "var(--red-800)",
        "red-900": "var(--red-900)",
      },
      fontFamily: {
        sans: [
          ...defaultTheme.fontFamily.sans,
          "PingFang SC",
          '"Microsoft YaHei"',
          '"Source Han Sans SC"',
          '"Noto Sans CJK SC"',
          "WenQuanYi Micro Hei",
        ],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
  ],
};
