import * as React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppLayout } from '@app/AppLayout/AppLayout';
import { AppRoutes } from '@app/routes';
import '@app/app.css';
import { I18nDictionariesProvider } from '@kogito-tooling/i18n/dist/react-components';
import { AppI18nContext, appI18nDefaults, appI18nDictionaries } from '@app/i18n';

const App: React.FunctionComponent = () => (
  <I18nDictionariesProvider
    defaults={appI18nDefaults}
    dictionaries={appI18nDictionaries}
    initialLocale={navigator.language}
    ctx={AppI18nContext}
  >
    <Router>
      <AppLayout>
        <AppRoutes />
      </AppLayout>
    </Router>
  </I18nDictionariesProvider>
);

export default App;
