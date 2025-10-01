import { PERMISSIONS } from './src/constants';

/**
 * @type {import('@commercetools-frontend/application-config').ConfigOptionsForCustomApplication}
 */
const config = {
  name: 'Generic Iframe Integrator',
  entryPointUriPath: '${env:ENTRY_POINT_URI_PATH}',
  cloudIdentifier: '${env:CLOUD_IDENTIFIER}',
  env: {
    development: {
      initialProjectKey: 'tech-sales-good-store',
    },
    production: {
      applicationId: '${env:CUSTOM_APPLICATION_ID}',
      url: '${env:APPLICATION_URL}',
    },
  },
  oAuthScopes: {
    view: ['view_products'],
  },
  headers: {
    csp: {
      'connect-src': ['${env:EXTERNAL_URL}'],
      'frame-src': ['${env:EXTERNAL_URL}'],
    },
  },
  additionalEnv: {
    externalUrl: '${env:EXTERNAL_URL}',
  },
  icon: '${path:@commercetools-frontend/assets/application-icons/rocket.svg}',
  mainMenuLink: {
    defaultLabel: '${env:EXTERNAL_LABEL_TEXT}',
    labelAllLocales: [],
    permissions: [PERMISSIONS.View],
  },
};

export default config;
