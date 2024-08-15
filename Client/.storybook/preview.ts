import { themes } from '@storybook/theming';

// Compodoc documentation generation
// documentation.json is build via 'nx run ui-shared-storybook-host:build-storybook'
import { setCompodocJson } from '@storybook/addon-docs/angular';
import * as docJson from '../libs/ui-shared/documentation.json';
setCompodocJson(docJson);

export const previewParameters = {
  options: {
    /*
     * Pages sorting
     * source: https://storybook.js.org/docs/react/writing-stories/naming-components-and-hierarchy#sorting-stories
     */
    storySort: {
      method: 'alphabetical',
      order: [
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
  layout: 'padded',

};