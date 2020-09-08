import { useContext } from 'react';

import Navigation from '@components/Navigation';
import SplashScreen from '@components/Splash';

import { Context as AuthContext } from '../store/auth';

const Main: React.FC = () => {
  const { auth } = useContext(AuthContext);
  if (!auth) return <SplashScreen content={'Authenticating'} />;
  return <Navigation />;
};

export default Main;
