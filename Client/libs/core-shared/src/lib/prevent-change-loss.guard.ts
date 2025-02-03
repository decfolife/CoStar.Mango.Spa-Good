import { CanDeactivateFn } from '@angular/router';
import { Observable } from 'rxjs';

/**
 * Interface defining a contract for components that need to
 * handle change loss prevention.
 */
export interface IChangeLossPreventedComponent {
  /**
   * Method that should be implemented to handle change loss prevention logic.
   * It should return a boolean indicating whether the navigation should proceed,
   * a Promise that resolves to a boolean, or an Observable emitting a boolean.
   *
   * @returns boolean | Promise<boolean> | Observable<boolean>
   */
  tryPreventChangeLoss: () => boolean | Promise<boolean> | Observable<boolean>;
  windowBeforeUnload: ($event: any) => Promise<void>;
}

/**
 * Guard function to prevent route deactivation if there are unsaved changes.
 * It checks if the component implements the tryPreventChangeLoss method.
 * If the method exists, it is executed to determine whether navigation is allowed.
 * If it does not exist, navigation is allowed by default.
 *
 * @param component - The component that implements IChangeLossPrevention.
 * @returns boolean | Promise<boolean> | Observable<boolean> - Result of tryPreventChangeLoss
 * or true if the method does not exist.
 */
export const preventChangeLossGuardFn: CanDeactivateFn<
  IChangeLossPreventedComponent
> = (component: IChangeLossPreventedComponent) => {
  return component.tryPreventChangeLoss
    ? component.tryPreventChangeLoss()
    : true;
};
