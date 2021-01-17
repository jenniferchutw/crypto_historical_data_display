const breakpoints = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  mobileXL: '600px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  laptopXL: '1650px',
  desktop: '2560px',
};

export const device = {
  mobileS: `(max-width: ${breakpoints.mobileS})`,
  mobileM: `(max-width: ${breakpoints.mobileM})`,
  mobileL: `(max-width: ${breakpoints.mobileL})`,
  mobileXL: `(max-width: ${breakpoints.mobileXL})`,
  tablet: `(max-width: ${breakpoints.tablet})`,
  laptop: `(max-width: ${breakpoints.laptop})`,
  laptopL: `(max-width: ${breakpoints.laptopL})`,
  laptopXL: `(max-width: ${breakpoints.laptopXL})`,
  desktop: `(max-width: ${breakpoints.desktop})`,
};
