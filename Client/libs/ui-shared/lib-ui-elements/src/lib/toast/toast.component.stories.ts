import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, Injector } from '@angular/core';
import { ToastState } from '@mango/data-models/lib-data-models';
import { AngularRenderer, Meta, StoryObj, applicationConfig, moduleMetadata } from '@storybook/angular';
import { DecoratorFunction } from '@storybook/types';
import { DxToastModule } from 'devextreme-angular';
import { ButtonModule } from '../button';
import { IconModule } from '../icon';
import { ToastComponent } from './toast.component';
import { CremToastService } from './toast.service';

let toastService: CremToastService = null;

// This Injector to make CremToastService available in Storybook
function injectInjectorToProps<TArgs = unknown>(): DecoratorFunction<AngularRenderer, TArgs> {
  return (storyFn) => {
    const story = storyFn();
    if (!story.applicationConfig) {
      story.applicationConfig = { providers: [] };
    }
    story.applicationConfig.providers.push({
      provide: APP_INITIALIZER,
      useFactory: (injector: Injector): void => {
        toastService = null
        if (!story.props) {
          story.props = { injector };
        }
        Object.assign(story.props, { injector });
      },
      deps: [Injector],
    });

    return story;
  };
}

export default {
  title: 'Components/Toast',
  component: ToastComponent,
  argTypes: {
    'CremToastService.show()': {
      description: `.show(<b>content</b>: string, <b>title</b>?: string, <b>state</b>?: ToastState, <b>options</b>?: CremToastOptions)
      <br><br>
      <b>content:</b> The content of the toast.
      <br>
      <b>title:</b> (optional) The title of the toast.
      <br>
      <b>state:</b> (optional) The type of toast (INFORMATION, SUCCESS, ERROR, WARNING). INFORMATION is the default option.
      <br>
      <b>options:</b> (optional) Set the options of the toast:<br>
      <br>
      <b>CremToastOptions</b> {
      <br>
        &nbsp; <b>duration?</b>: number (default 3000),<br>
        &nbsp; <b>showBody?</b>: boolean (default true),<br>
        &nbsp; <b>width?</b>: string (default 320px),<br>
        &nbsp; <b>position?</b>: string (default bottom right),<br>
        &nbsp; <b>showCloseButton?</b>: boolean (default true)
      <br>
      }
      `,
      table: {
        category: 'Methods',
        defaultValue: {
          summary: null,
        } 
      }
    },
    visible: {
      table: {
        disable: true
      }
    },
    showCloseButton: {
      table: {
        disable: true
      }
    },
    showBody: {
      table: {
        disable: true
      }
    }
  },
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        IconModule,
        DxToastModule,
        ButtonModule
      ],
    }),
    applicationConfig({
      providers: [CremToastService]
    }),
    injectInjectorToProps()
  ],
} as Meta<ToastComponent>;


type Story = StoryObj<ToastComponent>;

export const Default: Story = {
  args: {
    visible: true,
    messageHeader: 'Lorem lpsum',
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    state: ToastState.INFORMATION,
    duration: 3000,
    showBody: true,
    maxWidth: '320px',
    position: 'bottom right',
    showCloseButton: true,
  },
  render: (args: ToastComponent, ctx: any) => {
    (args as any).onShowClick = () => {
      toastService = toastService || ctx.args.injector.get(CremToastService)
      toastService.show(args.message, args.messageHeader, args.state, {
        duration: args.duration,
        position: args.position,
        showBody: args.showBody,
        showCloseButton: args.showCloseButton,
        maxWidth: args.maxWidth
      })
    }
    return {
      props: args,
      template: `<crem-button text='Show Toast' btnStyle='flat' color='primary' (buttonClick)='onShowClick()'></crem-button>`
    }
  }
}