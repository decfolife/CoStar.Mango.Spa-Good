import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  OnInit,
} from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { MatMenuTrigger } from '@angular/material/menu';

import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { InputComponent } from '@mango/ui-shared/lib-ui-elements';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'mango-more-menu',
  templateUrl: './more-menu.component.html',
  styleUrls: ['./more-menu.component.scss'],
})
export class MoreMenuComponent implements OnInit {
  @Input() showMoreMenu: boolean;
  @Input() showColumnChooser: boolean;
  @Input() isExpanded: boolean;
  @Input() isSuperUser: boolean;
  @Input() isCoStarListView: boolean;
  @Input() showSaveAs: boolean;
  @Input() showSave: boolean;
  @Input() showExpandCollapse: boolean;
  @Input() showExport: boolean;
  @Input() showResetView: boolean;
  @Input() showArchiveToggle: boolean;
  @Input() includeActive: boolean;
  @Input() includeArchived: boolean;
  @Input() buttonbDisabled: boolean;
  @Input() isGLEvent: boolean;

  @Output() createListView = new EventEmitter<string>(null);
  @Output() displayColumnChooser = new EventEmitter(null);
  @Output() saveDefault = new EventEmitter(null);
  @Output() toggleExpanded = new EventEmitter(null);
  @Output() toggleActive = new EventEmitter<boolean>();
  @Output() toggleArchived = new EventEmitter<boolean>();
  @Output() updateListView = new EventEmitter(null);
  @Output() exportExcel = new EventEmitter(null);
  @Output() resetListView = new EventEmitter(null);
  @Output() showDynamicSQL = new EventEmitter(null);

  @ViewChild('listMenuTrigger') listMenuTrigger: MatMenuTrigger;

  @ViewChild('saveViewName') saveViewNameInput: InputComponent;

  public isRemUser$: Observable<boolean> = of(false);

  faCaretDown = faCaretDown;

  nameFormControl = new UntypedFormControl('', [Validators.required]);

  public hasError = (errorName: string) => {
    return this.nameFormControl.hasError(errorName);
  };

  constructor(private mangoAppFacade: MangoAppFacade) {}

  ngOnInit() {
    this.isRemUser$ = this.mangoAppFacade.authenticatedUser$.pipe(
      filter((user) => !!user),
      map((user) => !!user.isRemUser)
    );
  }

  createNewListView() {
    if (this.nameFormControl.valid) {
      this.createListView.next(this.nameFormControl.value);

      this.nameFormControl.reset();
      this.nameFormControl.markAsUntouched();

      setTimeout(() => {
        this.listMenuTrigger.closeMenu();
      }, 500);
    }
  }

  toggleShowArchived(includeArchived: any) {
    this.toggleArchived.emit(includeArchived.checked);
  }

  toggleShowActive(includeActive: any) {
    this.toggleActive.emit(includeActive.checked);
  }

  focusSavedViewSubMenu() {
    this.saveViewNameInput.focusInputBox();
  }
}
