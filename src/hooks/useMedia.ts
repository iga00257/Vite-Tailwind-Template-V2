import { mediaAtom } from './useLayout';
import { useAtomValue } from 'jotai';
import { LAYOUT } from '@/constants/layout';
// Constants

const useMedia = () => {
  const value = useAtomValue(mediaAtom);
  const { currentLayout } = value;

  const isMobile = currentLayout === LAYOUT.MOBILE;
  const isTablet = currentLayout === LAYOUT.TABLET;
  const isDesktop = currentLayout === LAYOUT.DESKTOP;
  const isSmallScreen = isMobile || isTablet;
  return {
    isMobile: isMobile,
    isTablet: isTablet,
    isDesktop: isDesktop,
    isSmallScreen: isSmallScreen,
  };
};

export default useMedia;
