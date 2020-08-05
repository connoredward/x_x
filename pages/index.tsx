import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import Navigation from '@components/Navigation';
import SplashScreen from '@components/Splash';

import { checkToken } from '../api/auth';

const Main: React.FC = () => {
  const router = useRouter();
  const [hide, setHide] = useState(false);

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    const response = await checkToken();
    if (response === true) {
      setHide(true);
    } else {
      router.push('/login');
    }
  }

  return (
    <div>
      <SplashScreen hide={hide} />
      <Navigation />
    </div>
  );
};

export default Main;
