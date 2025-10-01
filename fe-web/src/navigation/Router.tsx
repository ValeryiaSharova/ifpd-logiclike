import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router';

import 'src/threads';

import { actions } from 'src/actions';
import { Preloader } from 'src/components/atoms/Preloader';
import { GroupsSwitch } from 'src/navigation/Switch';

export const Router: React.FC = () => {
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();

    void actions.api['/'].GET({ Axios: { signal: abortController.signal } });

    setIsPending(false);

    return () => abortController.abort();
  }, []);

  if (isPending) {
    return <Preloader fullScreen />;
  }

  return (
    <BrowserRouter>
      <GroupsSwitch mode="guest" />
    </BrowserRouter>
  );
};
