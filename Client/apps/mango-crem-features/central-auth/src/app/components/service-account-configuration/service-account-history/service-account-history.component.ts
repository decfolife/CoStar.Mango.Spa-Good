import { Component, Input, OnDestroy} from '@angular/core';
import { Subscription, fromEvent, timer } from 'rxjs';
import { delay, map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'mango-service-account-history',
  templateUrl: './service-account-history.component.html',
  styleUrls: ['./service-account-history.component.scss'],
})
export class ServiceAccountHistoryComponent implements OnDestroy {
  @Input() histories:any;
  subs: Subscription[] = [];

  //Fix header filter ADA related issues
  public onCellPrepared(e) {
    if (e.rowType === "header") {
      ['click', 'keydown'].forEach(event => fromEvent(e.cellElement.querySelector(".dx-header-filter"), event).pipe(
          delay(60), 
          tap(() => this.FixFilterItems()),
          switchMap(() => fromEvent(document.querySelector(".dx-texteditor-input"), 'change')),
          delay(60),
          tap(() => this.FixFilterItems()),
          switchMap (() => fromEvent(document.querySelector("span.dx-clear-button-area"), 'click')),
          delay(60),
          tap(() => this.FixFilterItems())
        ).subscribe()
      );
    }
  }

  //Fix dx-datagrid-borders and table body ADA related issues
  public onContentReady(e) {
      const gridBorder = e.element.querySelector(".dx-datagrid-borders");
      if (gridBorder !== null) {
        ['role', 'aria-label', 'aria-rowcount', 'aria-colcount'].forEach(attribute => gridBorder.removeAttribute(attribute));

        for (var element of gridBorder.getElementsByTagName("tbody")) {
          element.setAttribute("role", "grid");
        };
      }
  };

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe())
  }

  //Filter items can be treeview or listbox, both have dx-scrollable-content.  
  //  1.Listbox: has dx-scrollview with rols as "listbox";  dx-scrollable-content has no role. 
  //  2.Treeview:  does not have dx-scrollview. dx-scrollable-content has role as "tree".
  private FixFilterItems(){
    const scrollableContent = document.querySelector(".dx-scrollable-content");
    if (scrollableContent) {
      const scrollviewContent = document.querySelector(".dx-scrollview-content");
      //Fix Listbox
      if (scrollviewContent) {
        this.FixDxListItems();
        scrollviewContent.setAttribute('aria-label', 'Filter Content');
        scrollviewContent.querySelector(".dx-empty-message") ? scrollviewContent.removeAttribute("role") : scrollviewContent.setAttribute("role", "listbox")
      } 
      //Fix Tree
      else {
        this.FixDxTreeViewItems();
        scrollableContent.querySelector(".dx-empty-message") ? scrollableContent.removeAttribute("role") : scrollableContent.setAttribute("role", "tree")
      }
    } 
  }
 
  private FixDxListItems(){
    const selectAllFilterItem = document.querySelector(".dx-list-select-all");
    if (selectAllFilterItem !== null)
      selectAllFilterItem.setAttribute('role', 'option');

    const selectAllCheckbox = document.querySelector(".dx-list-select-all-checkbox");
    if (selectAllFilterItem !== null)
      selectAllCheckbox.setAttribute('aria-label', 'Select all filter items');

    const filterItems = document.querySelectorAll(".dx-item.dx-list-item");
    if (filterItems) {
      filterItems.forEach((filterItem) => {
        const ariaLabel = filterItem.querySelector("div.dx-item-content.dx-list-item-content").innerHTML;
        const checkbox = filterItem.querySelector("div.dx-widget.dx-checkbox.dx-list-select-checkbox");
        if (checkbox !== null)
          checkbox.setAttribute('aria-label', ariaLabel);
      });
    } 
  }

  private FixDxTreeViewItems(){
    const el = document.querySelector('.dx-treeview-select-all-item');
    if (el !== null) {
      el.removeAttribute("aria-readonly");
      el.setAttribute('role', 'treeitem');
      el.setAttribute('aria-label', 'Select All');
    }

    //Set aria label for each treeview item
    const treeviewItems = document.querySelectorAll(".dx-treeview-item-with-checkbox");
    if (treeviewItems) {
      treeviewItems.forEach((treeviewItem) => {
        const ariaLabel = treeviewItem.querySelector("div.dx-item-content.dx-treeview-item-content").innerHTML;
        const checkbox = treeviewItem.querySelector("div.dx-widget.dx-checkbox");
        if (checkbox !== null)
          checkbox.setAttribute('aria-label', ariaLabel);

          const treeToggle = treeviewItem.querySelector("div.dx-treeview-toggle-item-visibility");     
          if (treeToggle && treeToggle.classList.length === 1) //toggle closed
          {   
            treeToggle.addEventListener("click", () => {
              this.subs.push(timer(60).subscribe(() => {
                this.FixDxTreeViewItems();  
              }));
            });
        }
      });
    }
  }
}
