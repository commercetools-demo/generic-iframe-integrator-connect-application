import { InfoMainPage } from '@commercetools-frontend/application-components';
import messages from './messages';
import { useIntl } from 'react-intl';

import Spacings from '@commercetools-uikit/spacings';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';

const Preview = () => {
  const intl = useIntl();
  const externalUrl = useApplicationContext(({ environment }) => {
    if ('externalUrl' in environment) {
      return environment.externalUrl as string;
    }
    return undefined;
  });

  if (!externalUrl) {
    return <LoadingSpinner />;
  }

  return (
    <InfoMainPage title={intl.formatMessage(messages.title)}>
      <Spacings.Stack scale={'m'}>
        <div
          style={{
            width: 1920,
            height: 1080,
            transform: 'scale(0.5)',
            boxShadow: '0 2px 6px 0 rgba(63, 63, 63, 0.6)',
            transition: 'box-shadow 0.25s',
            borderRadius: '20px',
            borderWidth: '20px 3px',
            backgroundColor: '#3f3f3f',
            margin: '0 auto',
            transformOrigin: 'left top',
          }}
        >
          <iframe
            frameBorder={0}
            loading={'lazy'}
            width={'100%'}
            height={'100%'}
            style={{
              width: 1880,
              height: 1040,
              margin: '20px',
              backgroundColor: '#fff',
            }}
            src={externalUrl}
          ></iframe>
        </div>
      </Spacings.Stack>
    </InfoMainPage>
  );
};
Preview.displayName = 'Preview';

export default Preview;
