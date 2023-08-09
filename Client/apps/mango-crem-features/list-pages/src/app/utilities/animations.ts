import {
  animate,
  state,
  style,
  transition,
  trigger,
  query,
} from '@angular/animations';

export const fadeInOut = trigger('fadeInOut', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('0.4s ease-in', style({ opacity: 1 })),
  ]),
  transition(':leave', [animate('0.4s 10ms ease-out', style({ opacity: 0 }))]),
]);

export const fadeAnimation = trigger('fadeAnimation', [
  transition('* => *', [
    query(':enter', [style({ opacity: 0 })], { optional: true }),
    query(
      ':leave',
      [style({ opacity: 1 }), animate('0.2s', style({ opacity: 0 }))],
      { optional: true }
    ),
    query(
      ':enter',
      [style({ opacity: 0 }), animate('0.2s', style({ opacity: 1 }))],
      { optional: true }
    ),
  ]),
]);

export const slideToRight = trigger('routerTransition', [
  state('void', style({ position: 'fixed', width: '100%' })),
  state('*', style({ position: 'fixed', width: '100%' })),
  transition(':enter', [
    style({ transform: 'translateX(-100%)' }),
    animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' })),
  ]),
  transition(':leave', [
    style({ transform: 'translateX(0%)' }),
    animate('0.5s ease-in-out', style({ transform: 'translateX(100%)' })),
  ]),
]);

export const slideToLeft = trigger('routerTransition', [
  state('void', style({ position: 'fixed', width: '100%' })),
  state('*', style({ position: 'fixed', width: '100%' })),
  transition(':enter', [
    style({ transform: 'translateX(100%)' }),
    animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' })),
  ]),
  transition(':leave', [
    style({ transform: 'translateX(0%)' }),
    animate('0.5s ease-in-out', style({ transform: 'translateX(-100%)' })),
  ]),
]);

export const slideToBottom = trigger('slideToBottom', [
  // state('void', style({ position: 'fixed', width: '100%', height: '100%' })),
  // state('*', style({ position: 'fixed', width: '100%', height: '100%' })),
  transition(':enter', [
    style({ transform: 'translateY(-100%)' }),
    animate('0.5s ease-in-out', style({ transform: 'translateY(0%)' })),
  ]),
  transition(':leave', [
    style({ transform: 'translateY(0%)' }),
    animate('0.5s ease-in-out', style({ transform: 'translateY(100%)' })),
  ]),
]);

export const slideToTop = trigger('slideToTop', [
  transition(':enter', [
    style({ transform: 'translateY(100%)' }),
    animate('0.5s ease-in-out', style({ transform: 'translateY(0%)' })),
  ]),
  transition(':leave', [
    style({ transform: 'translateY(0%)' }),
    animate('0.5s ease-in-out', style({ transform: 'translateY(-100%)' })),
  ]),
]);

// export function flyInOut(duration: number = 0.2) {
//     return trigger('flyInOut', [
//         state('in', style({ opacity: 1, transform: 'translateX(0)' })),
//         transition('void => *', [style({ opacity: 0, transform: 'translateX(-100%)' }), animate(`${duration}s ease-in`)]),
//         transition('* => void', [animate(`${duration}s 10ms ease-out`, style({ opacity: 0, transform: 'translateX(100%)' }))])
//     ])
// }
