import {
  selectBoxMenuItems,
  moreMenuItem,
} from '../definitions';

export class ModuleDropdownUtil {

  /**
   * Item's more menu or ellipsis: Prepares more menu items for a given set of data.
   * @description This method combines the 'moreMenuData' data and the 'itemMenu' object configuration creating an ellipsis/menu for each menu item.
   * @method
   * @param {any[]} moreMenuData - An array of data representing the main menu items. If it has a moreMenu.
   * @param {selectBoxMenuItems} itemMenu - The select box menu items configuration.
   * @returns {moreMenuItem[]} itemsWithMoreMenu - An array of main menu items with associated more menu options.
   * @throws {Error} Will throw an error if there is an issue preparing the more menu items.
   */
  static prepareMoreMenu(moreMenuData: any[], itemMenu: selectBoxMenuItems) {
    const itemsWithMoreMenu = [];
    moreMenuData.map( (menuItem) => {
      const menuItems = [];
      itemMenu.map( e => {
        let newItem: Partial<moreMenuItem> = {};
        newItem = this.prepareItemMoreMenu(
            e,
            menuItem,
            menuItem[e.attribute] ?? undefined,
          ); // Transform more menu
        menuItems.push(newItem); // Build Array of Menu Options
      });

      // Add Array of Menu Options to Segment Object
      moreMenuData = menuItem;
      moreMenuData['moreMenu'] = menuItems;
      itemsWithMoreMenu.push(moreMenuData);

    });

    return itemsWithMoreMenu;
  }

  /**
   * MoreMenu's Items: Prepare each item of the more menu transforming it's data
   * @description Prepare an Item for the 'crem-dropdown' More Menu
   * @method
   * @param {moreMenuItem} menuItem: Main element to be transformed
   * @param {any} menu: The main 'crem-dropdown' item, used by the hideTransformer
   * @param {(string | number | boolean)} comparingValue: If compared with the condition provided as part of the menu item.
   * @param {*} [attribute]: Adds an additional custom element to the menu item, this is the value of the attributeName.
   * @param {string} [attributeName]: Name of the attribute, if non provided the attribute name will be 'attribute'.
   * @return {*}  {moreMenuItem}: Returning Item for the more menu.
   */
  static prepareItemMoreMenu(
    menuItem: moreMenuItem,
    menu: any,
    comparingValue?: string | number | boolean,
    attribute?: any,
    attributeName?: string,
  ): moreMenuItem {
    let item = {...menuItem}

    if(item.dataTransformer){
      if (comparingValue) { // Only proceeds if there is something to compare with
        const elementExists = item.dataTransformer.find( e => {
          switch(e.operator) {
            case '>=':
              return e.condition >= comparingValue;
            case '<=':
              return e.condition <= comparingValue;
            case '>':
              return e.condition > comparingValue;
            case '<':
              return e.condition < comparingValue;
            case '!=':
              return e.condition != comparingValue;
            case '=':
            default:
              return e.condition === comparingValue;
          }
        });
        if(elementExists){
          item.name = elementExists?.name ?? item.name;
          item.title = elementExists?.title ?? item.title;
          item.disabled = elementExists?.disabled ? elementExists?.disabled : item.disabled || false;
        }
        attribute && (item[ attributeName ?? 'attribute'] = attribute); // Adding custom attribute if exists
      }
    }
    
    if(item.transform){
      item.transform.forEach( e => {
        switch(e.operator){
          case '>=':
            if(menu[e.comparingKey] >= e.comparingValue){
              item = this.applyValues(e, item);
            }
            break;
          case '<=':
            if(menu[e.comparingKey] <= e.comparingValue){
              item = this.applyValues(e, item);
            }
            break;
          case '>':
            if(menu[e.comparingKey] > e.comparingValue){
              item = this.applyValues(e, item);
            }
            break;
          case '<':
            if(menu[e.comparingKey] < e.comparingValue){
              item = this.applyValues(e, item);
            }
            break;
          case '!=':
            if(menu[e.comparingKey] != e.comparingValue){
              item = this.applyValues(e, item);
            }
            break;
          case '=':
          default:
            if(menu[e.comparingKey] === e.comparingValue){
              item = this.applyValues(e, item);
            }
            break;
        }
      });
    }
    return item;
  }

  static applyValues(e, item: moreMenuItem): moreMenuItem{
    if(e.name) item['name'] = e.name;
    if(e.title) item['title'] = e.title;
    if(e.disabled) item['disabled'] = e.disabled;
    if(e.hide) item['hide'] = e.hide;
    return item;
  }

}
