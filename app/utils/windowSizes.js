export const isMobile = () => getWindowSizes().width < 520;
export const isTablet = () =>
  getWindowSizes().width >= 520 && getWindowSizes().width < 1024;
export const isDesktop = () => getWindowSizes().width >= 1024;

export const isGtMobile = sizes => !isMobile(sizes);
export const isGtTablet = sizes => isDesktop(sizes);

export const isStTablet = sizes => isMobile(sizes);
export const isStDesktop = sizes => !isDesktop(sizes);

export const isTabletAndGreater = sizes => !isMobile(sizes);
export const isTabletAndSmaller = sizes => !isStDesktop(sizes);

const getWindowSizes = () => {
  const canUseDOM = typeof window !== 'undefined';

  return {
    width: canUseDOM ? window.innerWidth : 9999999,
    height: canUseDOM ? window.innerHeight : 9999999,
    canUseDOM,
  };
};

export default getWindowSizes;
