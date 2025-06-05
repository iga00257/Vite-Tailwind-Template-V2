import { useEffect } from 'react';
import { debounce } from 'lodash';
import { atom, useSetAtom } from 'jotai';

// Libs

// Constants
import { LAYOUT, MAX_MOBILE_WIDTH, MAX_TABLET_WIDTH } from '@/constants/layout';

type LayoutType = {
  currentLayout: string;
};

export const mediaAtom = atom<LayoutType>({ currentLayout: LAYOUT.MOBILE });

export const useLayout = () => {
  const setMedia = useSetAtom(mediaAtom);

  useEffect(() => {
    const onResize = () => {
      const currentWidth = window.innerWidth;
      const currentMedia =
        MAX_MOBILE_WIDTH > currentWidth
          ? LAYOUT.MOBILE
          : MAX_TABLET_WIDTH > currentWidth
            ? LAYOUT.TABLET
            : LAYOUT.DESKTOP;
      setMedia({ currentLayout: currentMedia });
    };
    onResize();
    const debouncedResize = debounce(onResize, 200);

    window.addEventListener('resize', debouncedResize);
    return () => {
      window.removeEventListener('resize', debouncedResize);
    };
  }, [setMedia]);
};
