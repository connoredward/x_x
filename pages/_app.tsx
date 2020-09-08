import { AppProps } from 'next/app';
import { SWRConfig } from 'swr';

import { Store as AuthStore } from '../store/auth';

import '../styles/index.scss';

const Main: React.FunctionComponent<AppProps> = ({ Component, pageProps }: AppProps): React.ReactElement => {
  return (
    <AuthStore>
      <SWRConfig
        value={{
          refreshInterval: 1000,
          fetcher: (...args) => fetch(args).then((res) => res.json()),
        }}
      >
        <Component {...pageProps} />
      </SWRConfig>
    </AuthStore>
  );
};

export default Main;
