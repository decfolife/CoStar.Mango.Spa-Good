/* eslint-disable @angular-eslint/component-selector */
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FaIconComponent, AnimationProp } from '@fortawesome/angular-fontawesome';
import {
  config,
  IconStyle,
  FlipProp,
  IconPrefix,
  PullProp,
  RotateProp,
  SizeProp,
} from '@fortawesome/fontawesome-svg-core';
import { IconDefinition, IconPack } from '@fortawesome/free-solid-svg-icons';

import { colorProp } from './definitions/fontAwesome';

config.autoAddCss = false;

/** @deprecated */
import { environment } from '../../../../../../apps/mango/src/environments/environment.local';

/**
 * Icon
 * @class IconComponent
 * <example-url>/?path=/docs/components-icon--docs&full=1&shortcuts=false&singleStory=true</example-url>
 * @see {@link https://github.com/FortAwesome/angular-fontawesome/blob/0.12.1/docs/usage/features.md} for further information about Angular FontAwesome
 */
@Component({
  selector: 'crem-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class IconComponent implements OnChanges, OnInit {
  @ViewChild('faIconHost', {static: false, read: ViewContainerRef}) iconContainer: ViewContainerRef;

  /**
   * Provide the name of the FontAwesome icon E.g. 'faStar'
   *
   * @type {string}
   * @memberof IconComponent
   */
  @Input() icon: string;

  /**
   * The default icon library 'local' is the legacy version for v06
   *
   * @type {('fontAwesome' | 'local')}
   * @memberof IconComponent
   */
  @Input() library?: 'fontAwesome' | 'local';

  /**
   * If using FontAwesome provide the already installed package type, E.g. 'solid' or 'regular'.
   * Where 'crem' corresponds to the custom made icons, and 'solid' or 'regular' corresponds to the packages provided by FontAwesome
   *
   * @type {('crem' | 'solid' | 'regular' | IconStyle)}
   * @memberof IconComponent
   */
  @Input() pack?: 'crem' | 'solid' | 'regular' | IconStyle;

  /**
   * fontAwesome's rotation parameter
   *
   * @type {RotateProp}
   * @memberof IconComponent
   */
  @Input() rotate?: RotateProp;

  /**
   * fontAwesome's flip parameter
   *
   * @type {FlipProp}
   * @memberof IconComponent
   */
  @Input() flip?: FlipProp;

  /**
   * fontAwesome's animation parameter
   *
   * @type {AnimationProp}
   * @memberof IconComponent
   */
  @Input() animation?: AnimationProp;

  /**
   * fontAwesome's size parameter
   *
   * @type {SizeProp}
   * @memberof IconComponent
   */
  @Input() size?: SizeProp;

  /**
   * fontAwesome's pull parameter
   *
   * @type {PullProp}
   * @memberof IconComponent
   */
  @Input() pull?: PullProp;

  /**
   * Use the standard colors names from the 'common' library
   *
   * @type {colorProp}
   * @memberof IconComponent
   */
  @Input() color?: colorProp;
  // Internal
  faIcon: IconDefinition | IconPack | IconPrefix; // For assigning the fa-icon during dynamic import

  /**
   * Deprecated, use with 'local' library
   *
   * @ignore
   * @deprecated when @library is 'local'
   */
  @Input() fill?: string = '#000';

  /**
   * Deprecated, use with 'local' library
   *
   * @ignore
   * @deprecated when @library is 'local'
   */
  @Input() transform?: string;
  iconClass: string[];
  iconPath: string;

  /**
   *
   * @ignore
   * @memberof IconComponent
   */
  envPath = '../../../../../../apps/mango/src/environments/environment.local';
  iconCat: string;
  iconArray: string[];

  constructor(){
    /** @deprecated */
    this.iconPath = "/v06/content/assets/icons/";
    if (environment["isRestful"]) {
      this.iconPath = "../assets/images/icons/";
    }
  }

  ngOnInit(){
    /** @deprecated */
    // CSS Class, todo: check if being used
    this.iconClass = [`icon-${this.icon}`, `icon-${this.icon}-dims`];
    if (this.icon !== null && this.icon !== undefined) {
      this.iconArray = this.icon.includes('-') ? this.icon.split('-') : [this.icon];
      this.iconCat = this.iconPath + this.iconArray[0];
    }
  }

  ngOnChanges(){
    if (this.library === undefined) {
      this.library = 'fontAwesome';
    }
    if (this.pack === undefined){
      this.pack = 'solid';
    }
    if (this.library === 'fontAwesome' && this.pack !== undefined && (this.icon !== null && this.icon !== undefined)) {
      this.getIcon();
    }
  }

  getIcon(){
    switch(true) {
      case (this.library === 'fontAwesome' && this.pack === 'crem'):
        import('./definitions/cremIcons')
        .then( icon => {
          this.faIcon = icon[this.icon as keyof typeof icon] as IconDefinition;
          this.createIcon(this.faIcon);
        }).catch( () => { console.log(`Icon ${this.icon} was not found in package ${this.pack}`)});
      break;

      case (this.library === 'fontAwesome' && this.pack === 'solid'):
      default:
        import('@fortawesome/free-solid-svg-icons')
        .then( icon => {
          this.faIcon = icon[this.icon as keyof typeof icon] as IconDefinition;
          this.createIcon(this.faIcon);
        }).catch( () => { console.log(`Icon ${this.icon} was not found in package ${this.pack}`)});
      break;

      case (this.library === 'fontAwesome' && this.pack === 'regular'):
        import('@fortawesome/free-regular-svg-icons')
        .then( icon => {
          this.faIcon = icon[this.icon as keyof typeof icon] as IconDefinition;
          this.createIcon(this.faIcon);
        }).catch( () => { console.log(`Icon ${this.icon} was not found in package ${this.pack}`)});
      break;
    }
  }

  createIcon(faIcon: any) {
    this.iconContainer.remove();
    const componentRef = this.iconContainer.createComponent(FaIconComponent);
    componentRef.instance.icon = faIcon;
    componentRef.instance.rotate = this.rotate;
    componentRef.instance.flip = this.flip;
    componentRef.instance.size = this.size;
    componentRef.instance.animation = this.animation;
    componentRef.instance.transform = this.transform;
    componentRef.instance.pull = this.pull;
    componentRef.instance.render();
  }

  public getCssClasses() {
    return {
      // Color
      'icon-primary':   this.color === 'primary',
      'icon-secondary': this.color === 'secondary',
      'icon-light':     this.color === 'light',
      'icon-dark':      this.color === 'dark',
      'icon-warning':   this.color === 'warning',
      'icon-danger':    this.color === 'danger',
      'icon-info':      this.color === 'info',
    }
  }

}
