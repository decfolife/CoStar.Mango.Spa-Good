import { IconDefinition, IconPack } from '@fortawesome/free-solid-svg-icons';
import {
  FlipProp,
  IconPrefix,
  PullProp,
  RotateProp,
  SizeProp,
} from '@fortawesome/fontawesome-svg-core';
import { AnimationProp } from '@fortawesome/angular-fontawesome';
import { IconStyle } from '@fortawesome/fontawesome-svg-core';
import { colorProp } from './fontAwesome';

/**
 * Custom Icon definitions
 */
export type cremIcon = {
  icon: string;
  library?: 'fontAwesome' | 'local';
  pack?: 'crem' | 'solid' | 'regular' | IconStyle;
  // FontAwesome Options
  rotate?: RotateProp;
  flip?: FlipProp;
  animation?: AnimationProp;
  size?: SizeProp;
  pull?: PullProp;
  // Styling
  color?: colorProp;
  // Internal
  faIcon: IconDefinition | IconPack | IconPrefix; // For assigning the fa-icon during dynamic import
  /** @deprecated when @library is 'local' */
  fill?: string;
  transform?: string;
};

/**
 * Custom Icon definitions
 */
export const cremInfo: IconDefinition = {
  prefix: 'crem',
  iconName: 'info',
  icon: [
    24,
    24,
    [],
    'U+E002',
    `M11 7H13V9H11V7ZM11 11H13V17H11V11ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z`,
  ],
} as any;

export const cremXMark: IconDefinition = {
  prefix: 'crem',
  iconName: 'xmark',
  icon: [
    24,
    24,
    [],
    'U+E002',
    `M19.5265 6.73247C20.1512 6.10776 20.1512 5.09324 19.5265 4.46853C18.9018 3.84382 17.8872 3.84382 17.2625 4.46853L12 9.73606L6.73247 4.47353C6.10776 3.84882 5.09324 3.84882 4.46853 4.47353C3.84382 5.09824 3.84382 6.11276 4.46853 6.73747L9.73606 12L4.47353 17.2675C3.84882 17.8922 3.84882 18.9068 4.47353 19.5315C5.09824 20.1562 6.11276 20.1562 6.73747 19.5315L12 14.2639L17.2675 19.5265C17.8922 20.1512 18.9068 20.1512 19.5315 19.5265C20.1562 18.9018 20.1562 17.8872 19.5315 17.2625L14.2639 12L19.5265 6.73247Z`,
  ],
} as any;

export const cremEllipsis: IconDefinition = {
  prefix: 'crem',
  iconName: 'ellipsis',
  icon: [
    24,
    24,
    [],
    'U+E002',
    `M5.71423 10C4.76742 10 4 10.8527 4 11.9048C4 12.9568 4.76742 13.8095 5.71423 13.8095C6.66104 13.8095 7.4286 12.9568 7.4286 11.9048C7.4286 10.8527 6.66104 10 5.71423 10ZM12 10C11.0532 10 10.2858 10.8527 10.2858 11.9048C10.2858 12.9568 11.0532 13.8095 12 13.8095C12.9468 13.8095 13.7142 12.9568 13.7142 11.9048C13.7142 10.8527 12.9468 10 12 10ZM18.2858 10C17.339 10 16.5714 10.8527 16.5714 11.9048C16.5714 12.9568 17.339 13.8095 18.2858 13.8095C19.2326 13.8095 20 12.9568 20 11.9048C20 10.8527 19.2326 10 18.2858 10Z`,
  ],
} as any;

export const cremCircleMinus: IconDefinition = {
  prefix: 'crem',
  iconName: 'CircleMinus',
  icon: [
    24,
    24,
    [],
    'U+E002',
    `M11.9976 22C14.6694 22 17.1812 20.9598 19.0703 19.071C20.9596 17.1823 22 14.6711 22 12C22 9.32891 20.9596 6.8177 19.0703 4.92897C17.1812 3.04018 14.6694 2 11.9977 2C9.3259 2 6.8141 3.04018 4.92492 4.92891C1.02503 8.82794 1.02503 15.172 4.92492 19.071C6.8141 20.9598 9.3259 22 11.9976 22ZM11.9977 3.81818C14.1836 3.81818 16.2387 4.66927 17.7844 6.21455C19.3301 7.75994 20.1814 9.81454 20.1814 12C20.1814 14.1855 19.3301 16.2401 17.7844 17.7855C16.2387 19.3308 14.1836 20.1818 11.9976 20.1818C9.81166 20.1818 7.75656 19.3308 6.21086 17.7854C3.02004 14.5953 3.02004 9.40467 6.21086 6.21455C7.75662 4.66927 9.81172 3.81818 11.9977 3.81818ZM6.53992 12.9128H17.4515C17.9537 12.9128 18.3608 12.5058 18.3608 12.0038C18.3608 11.5017 17.9537 11.0947 17.4515 11.0947H6.53992C6.03774 11.0947 5.63062 11.5017 5.63062 12.0038C5.63062 12.5058 6.03774 12.9128 6.53992 12.9128Z`,
  ],
} as any;
