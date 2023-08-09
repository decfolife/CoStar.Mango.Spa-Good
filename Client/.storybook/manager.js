import { create } from '@storybook/theming';
import brandImage from '../apps/mango/src/assets/images/logos/logo-color.svg';

const cremTheme = create({
  base: 'light',
  brandTitle: 'CoStar Real Estate Manager Storybook',
  brandImage: brandImage,

  // UI
  appBg: '#f5f5f5',
  appContentBg: 'white',
  appBorderRadius: 4,

  // Form colors
  inputBorderRadius: 4,

});

export const uiConfig = {
  theme: cremTheme,
  isFullscreen: false,
  showNav: true,
  showPanel: true,
  panelPosition: 'bottom',
  enableShortcuts: true,
  isToolshown: true,
  selectedPanel: undefined,
  initialActive: 'sidebar',
  sidebar: {
    showRoots: true,
    collapsedRoots: ['other'],
  },
  toolbar: {
    title: { hidden: false, },
    zoom: { hidden: false, },
    eject: { hidden: false, },
    copy: { hidden: false, },
    fullscreen: { hidden: false, },
  },
};
