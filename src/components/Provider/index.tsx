import React, { FC, useEffect, useState, useMemo, useCallback } from "react";
import {
  createIntl,
  createIntlCache,
  RawIntlProvider,
  IntlConfig,
} from "react-intl";
import cookie from "js-cookie";
import { Web3ReactProvider } from "@web3-react/core";
import { ExternalProvider, Web3Provider } from "@ethersproject/providers";

import Resize from "./Resize";
import { Context } from "./hooks";

import { COLORS, getDefaultTheme } from "../Theme";
import type { ThemeValues } from "../Theme/colors";
import type { ScreenState } from "./hooks";
import locales from "../locales";
import {
  getLocaleSymbol,
  LocaleSymbol,
  OK_LOCALE_CACHE_KEY,
  TranslationMap,
} from "../utils";
import { NotificationContainer } from "../Notification";

const cache = createIntlCache();

const getLibrary = (provider: ExternalProvider) => {
  return new Web3Provider(provider); // this will vary according to whether you use e.g. ethers or web3.js
};

export type UIProviderProps = {
  /**
   * react-intl config
   */
  intl?: IntlConfig;
  /**
   * message map for locale config, using partial for non required translation projects
   */
  messagesMap?: Partial<TranslationMap>;
  /**
   * fallback locale symbol
   */
  defaultLocale?: LocaleSymbol;
  /**
   * default theme variant
   */
  defaultTheme?: keyof typeof COLORS;
};

const Provider: FC<UIProviderProps> = ({
  children,
  intl,
  messagesMap,
  defaultLocale,
  defaultTheme: initialTheme,
}) => {
  const defaultTheme = getDefaultTheme(initialTheme);
  const [theme, setTheme] = useState<ThemeValues>({} as ThemeValues);
  const [themeVariant, setThemeVariant] = useState<keyof typeof COLORS>(
    defaultTheme
  );

  const [layout, setLayout] = useState<ScreenState>({
    layout: "lg",
    screenWidth: null,
    screenHeight: null,
  } as const);

  useEffect(() => {
    const currentTheme = COLORS[themeVariant];
    Object.entries(currentTheme).forEach(([key, value]) => {
      if (typeof document === "undefined") return;
      document.documentElement.style.setProperty(`--${key}`, value);
    });
    const rgbColors = Object.entries(currentTheme).reduce((memo, current) => {
      const [key, val] = current;
      return {
        ...memo,
        [key]: `rgb(${val})`,
      };
    }, {} as ThemeValues);
    setTheme(rgbColors);
  }, [themeVariant]);

  const validLocaleSymbol = getLocaleSymbol(intl?.locale ?? defaultLocale);

  const getMessage = useCallback(
    (activeLocale) => ({
      ...locales[activeLocale],
      ...({
        ...(messagesMap?.[defaultLocale] ?? {}),
        ...(messagesMap?.[activeLocale] ?? {}),
      } ??
        intl?.messages ??
        {}),
    }),
    [intl?.messages, messagesMap, defaultLocale]
  );

  const [globalIntl, setGlobalIntl] = useState(
    createIntl(
      {
        locale: validLocaleSymbol,
        messages: getMessage(validLocaleSymbol),
      },
      cache
    )
  );

  useEffect(() => {
    setGlobalIntl(
      createIntl(
        { locale: validLocaleSymbol, messages: getMessage(validLocaleSymbol) },
        cache
      )
    );
  }, [validLocaleSymbol, getMessage]);

  const providerValue = useMemo(() => {
    const setLocale = (nextLocale: LocaleSymbol) => {
      const validNextLocaleSymbol = getLocaleSymbol(nextLocale);
      const nextMessages = getMessage(validNextLocaleSymbol);
      setGlobalIntl(
        createIntl(
          {
            locale: validNextLocaleSymbol,
            messages: nextMessages,
          },
          cache
        )
      );
      cookie.set(OK_LOCALE_CACHE_KEY, validNextLocaleSymbol, {
        expires: 365,
        domain: ".onekey.so",
      });
    };

    return {
      theme,
      themeVariant,
      setThemeVariant,
      setLocale,
      locale: globalIntl.locale as LocaleSymbol,
      ...layout,
    };
  }, [
    theme,
    globalIntl.locale,
    getMessage,
    themeVariant,
    setThemeVariant,
    layout,
  ]);

  return (
    <Context.Provider value={providerValue}>
      <Resize setLayout={setLayout} />
      <RawIntlProvider value={globalIntl}>
        <Web3ReactProvider getLibrary={getLibrary}>
          {children}
        </Web3ReactProvider>
      </RawIntlProvider>
      <NotificationContainer />
    </Context.Provider>
  );
};

export default Provider;
