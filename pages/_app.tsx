import { AppProps } from 'next/app';

import '../styles/index.scss';

const Main: React.FunctionComponent<AppProps> = ({ Component, pageProps }: AppProps): React.ReactElement => {
  return <Component {...pageProps} />;
};

export default Main;
