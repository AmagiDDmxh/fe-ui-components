/** default white theme */
const theme1 = {
  "brand-50": "#EBF9EC",
  "brand-100": "#D7F4DA",
  "brand-200": "#A3E5A9",
  "brand-300": "#67D572",
  "brand-400": "#33C641",
  "brand-500": "#00B812",
  "brand-600": "#00930E",
  "brand-700": "#006F0B",
  "brand-800": "#005809",
  "brand-900": "#004206",
  "gray-50": "#F9F9FB",
  "gray-100": "#F2F2F7",
  "gray-200": "#E7E7EE",
  "gray-300": "#D3D3DE",
  "gray-400": "#A0A0B0",
  "gray-500": "#6E6E86",
  "gray-600": "#49495F",
  "gray-700": "#35354B",
  "gray-800": "#1F1F31",
  "gray-900": "#12121E",
  "green-50": "#EFFBF2",
  "green-100": "#DFF6E5",
  "green-200": "#B6EBC3",
  "green-300": "#86DE9C",
  "green-400": "#5DD27A",
  "green-500": "#34C759",
  "green-600": "#2A9F47",
  "green-700": "#1F7836",
  "green-800": "#195F2B",
  "green-900": "#134820",
  "blue-50": "#EBF5FF",
  "blue-100": "#D7EAFF",
  "blue-200": "#A3CFFF",
  "blue-300": "#67B0FF",
  "blue-400": "#3395FF",
  "blue-500": "#007AFF",
  "blue-600": "#0062CC",
  "blue-700": "#004A9A",
  "blue-800": "#003A7A",
  "blue-900": "#002C5C",
  "yellow-50": "#FFFBEB",
  "yellow-100": "#FFF7D7",
  "yellow-200": "#FFEDA3",
  "yellow-300": "#FFE167",
  "yellow-400": "#FFD633",
  "yellow-500": "#FFCC00",
  "yellow-600": "#CCA300",
  "yellow-700": "#9A7B00",
  "yellow-800": "#7A6200",
  "yellow-900": "#5C4A00",
  "red-50": "#FFF0EF",
  "red-100": "#FFE0DF",
  "red-200": "#FFB8B4",
  "red-300": "#FF8A84",
  "red-400": "#FF6259",
  "red-500": "#FF3B30",
  "red-600": "#CC2F26",
  "red-700": "#9A241D",
  "red-800": "#7A1C17",
  "red-900": "#5C1511",
  "white-ground": "#FFFFFF",
  "white": "#FFFFFF",
  "black": "#000000",
  "shadowRGB": "0,0,0",
} as const;

/** dark theme */
const theme2 = {
  "brand-50": "#004206",
  "brand-100": "#005809",
  "brand-200": "#006F0B",
  "brand-300": "#00930E",
  "brand-400": "#00B812",
  "brand-500": "#33C641",
  "brand-600": "#67D572",
  "brand-700": "#A3E5A9",
  "brand-800": "#D7F4DA",
  "brand-900": "#EBF9EC",
  "gray-50": "#12121E",
  "gray-100": "#1F1F31",
  "gray-200": "#35354B",
  "gray-300": "#49495F",
  "gray-400": "#6E6E86",
  "gray-500": "#A0A0B0",
  "gray-600": "#D3D3DE",
  "gray-700": "#E7E7EE",
  "gray-800": "#F2F2F7",
  "gray-900": "#F9F9FB",
  "green-50": "#134820",
  "green-100": "#195F2B",
  "green-200": "#1F7836",
  "green-300": "#2A9F47",
  "green-400": "#34C759",
  "green-500": "#5DD27A",
  "green-600": "#86DE9C",
  "green-700": "#B6EBC3",
  "green-800": "#DFF6E5",
  "green-900": "#EFFBF2",
  "blue-50": "#002C5C",
  "blue-100": "#003A7A",
  "blue-200": "#004A9A",
  "blue-300": "#0062CC",
  "blue-400": "#007AFF",
  "blue-500": "#3395FF",
  "blue-600": "#67B0FF",
  "blue-700": "#A3CFFF",
  "blue-800": "#D7EAFF",
  "blue-900": "#EBF5FF",
  "yellow-50": "#5C4A00",
  "yellow-100": "#7A6200",
  "yellow-200": "#9A7B00",
  "yellow-300": "#CCA300",
  "yellow-400": "#FFCC00",
  "yellow-500": "#FFD633",
  "yellow-600": "#FFE167",
  "yellow-700": "#FFEDA3",
  "yellow-800": "#FFF7D7",
  "yellow-900": "#FFFBEB",
  "red-50": "#5C1511",
  "red-100": "#7A1C17",
  "red-200": "#9A241D",
  "red-300": "#CC2F26",
  "red-400": "#FF3B30",
  "red-500": "#FF6259",
  "red-600": "#FF8A84",
  "red-700": "#FFB8B4",
  "red-800": "#FFE0DF",
  "red-900": "#FFF0EF",
  "white-ground": "#0D0D12",
  "white": "#12121E",
  "black": "#FFFFFF",
  "shadowRGB": "255,255,255",
} as const;

const theme = {
  light: theme1,
  dark: theme2,
} as const;

const DEFAULT_THEME_VARIANT = 'light';

export const getDefaultTheme = (initial: string): keyof typeof theme => {
  if (Object.keys(theme).includes(initial)) return initial as keyof typeof theme;
  if (typeof window === "undefined") return DEFAULT_THEME_VARIANT;

  /** 如果被 OneKey Desktop 注入，使用默认 desktop 注入的结果 */
  const isHostByOneKeyDesktop = (window as any).$ONEKEY_SETTINGS_THEME === 'dark' ? 'dark' : 'light';
  /** 当前系统主题 */
  const isSystemDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches ? 'dark' : 'light';
  return isHostByOneKeyDesktop || isSystemDarkMode || DEFAULT_THEME_VARIANT;
}

export type ThemeVariant = keyof typeof theme;
export type ThemeValues = typeof theme[ThemeVariant];

export default theme;
