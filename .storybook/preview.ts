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
        'Introduction', ['Getting Started', 'For Developers', 'For Designers', 'FAQ'],
        'Components', ['Getting Started', 'Atoms', 'Molecules', 'Organisms'],
        'Styling', ['Getting Started', 'Single Properties', 'Multiple Properties', 'Colors', 'Fonts'],
        'Patterns',
        'Pages',
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