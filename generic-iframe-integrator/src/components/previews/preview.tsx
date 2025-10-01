import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';

const Preview = () => {
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
    <div
      style={{
        width: '100%',
        aspectRatio: '16 / 9',
        // boxShadow: '0 2px 6px 0 rgba(63, 63, 63, 0.6)',
        transition: 'box-shadow 0.25s',
        // borderRadius: '20px',
        // borderWidth: '20px 3px',
        // backgroundColor: '#3f3f3f',
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
          width: 'calc(100%)',
          height: 'calc(100%)',
          backgroundColor: '#fff',
        }}
        src={externalUrl}
      ></iframe>
    </div>
  );
};
Preview.displayName = 'Preview';

export default Preview;
