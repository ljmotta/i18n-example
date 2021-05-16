import { ReferenceDictionary } from '@kogito-tooling/i18n/dist/core';

export interface AppI18n extends ReferenceDictionary<AppI18n> {
  notFound: {
    title: string;
  }

  restaurantList: string;

  title: string;
  currency: string;
  form: {
    name: string;
    nameHelper: string;
    nameInvalidHelper: string;

    review: string;
    reviewInvalidHelper: string;

    date: string;
    dateInvalidHelper: string;

    value: string;
    valueInvalidHelper: string;

    save: string;
    cancel: string;
  };
  saved: {
    title: string;
    createYourFirst: string;
  };
}
