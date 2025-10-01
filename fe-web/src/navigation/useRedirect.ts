import {
  Location,
  NavigateFunction,
  useLocation,
  useNavigate,
} from 'react-router';

import { FeScheme, makeHierarchicalPath } from 'shared';

const handler =
  <T>(
    mode: 'replace' | 'detect',
    location: Location,
    navigate: NavigateFunction
  ) =>
  (schemes: T) => {
    const url = schemes as never;
    const to = makeHierarchicalPath(
      location,
      Array.isArray(url) ? url : [url],
      mode
    );

    if (to) {
      void navigate(to, { replace: true });
    }
  };

export const useRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return {
    redirect: handler<FeScheme>('replace', location, navigate),
  };
};
