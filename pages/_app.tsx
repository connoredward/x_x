import { AppProps } from 'next/app';

import { Store as AuthStore } from '../store/auth';

import '../styles/index.scss';

const Main: React.FunctionComponent<AppProps> = ({ Component, pageProps }: AppProps): React.ReactElement => {
  return (
    <AuthStore>
      <Component {...pageProps} />
    </AuthStore>
  );
};

export default Main;
