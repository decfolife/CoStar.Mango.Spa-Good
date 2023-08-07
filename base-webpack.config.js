const IGNORED_MODULES = [
  "devextreme/ui/pivot_grid/data_source",
  "devextreme/ui/notify"
]

/**
 * Extract 'devextreme' imports from 'devextreme-angular' module
 */

 function extractDevExtremeModule(context, request) {
    if (request.includes('devextreme/') && !IGNORED_MODULES.includes(request)) {
      const uiModule = mapImportToWindowDevExtreme(request, 'ui')
      const vizModule = mapImportToWindowDevExtreme(request, 'viz')
      return uiModule || vizModule
    }
  }
  
  
  /**
   * Map import path to window object modules
   * @example import { DxDataGridModule } from 'devextreme/ui/data_grid' 
   * will be converted to "window.ui.dxDataGrid"
   */
  
  function mapImportToWindowDevExtreme(request, bundle) {
    if (request.includes(bundle)) {
      const moduleName = request.replace(`devextreme/${bundle}/`, '')
      const parsedModuleName = importPathToDevExtremeModule(moduleName)
      return `window.DevExpress.${bundle}.${parsedModuleName}`
    }
  }
  
  
  /**
   * Convert the import path to a DevExtreme module name
   * @example "data_grid" will be converted to "dxDataGrid"
   */
  
  function importPathToDevExtremeModule(importPath) {
    return 'dx'.concat(importPath.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(''))
  }
  
  
  module.exports = {
    externals: [
      (context, request, callback) => {
        const devExtremeModule = extractDevExtremeModule(context, request)
        if (devExtremeModule) {
          return callback(null, `root ${devExtremeModule}`);
        }
        callback()
      },
    ],
  }
  