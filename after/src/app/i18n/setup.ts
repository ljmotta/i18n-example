import * as React from 'react';
import { useContext } from 'react';
import { I18nDefaults, I18nDictionaries } from '@kogito-tooling/i18n/dist/core';
import { I18nContextType } from '@kogito-tooling/i18n/dist/react-components';
import { AppI18n } from './AppI18n';
import { en, pt_BR } from './locales';

export const appI18nDefaults: I18nDefaults<AppI18n> = { locale: 'en', dictionary: en };
export const appI18nDictionaries: I18nDictionaries<AppI18n> = new Map([
  ['en', en],
  ['pt-BR', pt_BR],
]);
export const AppI18nContext = React.createContext<I18nContextType<AppI18n>>({} as any);

export function useAppI18n(): I18nContextType<AppI18n> {
  return useContext(AppI18nContext);
}
