import { themes } from '@storybook/theming';

export const previewParameters = {
  options: {
    /*
     * Pages sorting
     * source: https://storybook.js.org/docs/react/writing-stories/naming-components-and-hierarchy#sorting-stories
     */
    storySort: {
      method: 'alphabetical',
      order: [
        'Components',
        'Organisms',
        'Pages',
        'Introduction', ['Getting Started', 'For Developers', 'For Designers', 'FAQ'],
        'Styling', [
          'Getting Started',
          'Single Properties',
          'Multiple Properties',
          'Utility Classes',
          'Responsive Design',
          'Color Palettes',
          'Font Family'
        ],
        'Patterns',
      ],
      locales: 'en-US',
    },
    /*
     * Theming
     * Source: https://storybook.js.org/docs/angular/configure/theming
     */
    docs: {
      theme: themes.light,
    },
  },

  /*
   * Center
   * Source: https://storybook.js.org/docs/angular/configure/story-layout
   */
  layout: 'centered',

};