import { useRouter } from "next/router";
import { createContext, useCallback, useContext } from "react";
import es from "../translations/es.json";
import en from "../translations/en.json";

const I18nContext = createContext();

const languages = { es, en };

export function I18NProvider({ children }) {
  const { locale } = useRouter();
  // detectamos el language a partir del locale, utilizamos el useCallback para que no se vuelva a declarar la funcion
  const t = useCallback(
    (key, ...args) => {
      let translation = languages[locale][key];

      if (args.length === 0) return translation;

      args.forEach((value, index) => {
        translation = translation.replace(`\${${index + 1}}`, value);
      });

      return translation;
    },
    [locale]
  );

  return <I18nContext.Provider value={{ t }}>{children}</I18nContext.Provider>;
}

// this is custom hook, but we could use i18nNext, polyglot, react-intl, etc
export function useI18n() {
  const context = useContext(I18nContext);
  // this is a good practice to throw an error if the context is not defined
  if (context === undefined) {
    throw new Error("useI18n must be used within a I18nProvider");
  }
  return context;
}
