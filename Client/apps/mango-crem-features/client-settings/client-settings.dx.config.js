'use strict';

/* Core (dx.module-core.js) */
/* eslint-disable import/no-commonjs */
const DevExpress = require('devextreme/bundles/modules/core');

/* Integrations (dx.module-core.js) */

require('devextreme/integration/jquery');
require('devextreme/integration/angular');

require('devextreme/localization/globalize/core');
require('devextreme/localization/globalize/message');
require('devextreme/localization/globalize/number');
require('devextreme/localization/globalize/date');
require('devextreme/localization/globalize/currency');

/* Events (dx.module-core.js) */

require('devextreme/events/click');
require('devextreme/events/contextmenu');
require('devextreme/events/double_click');
require('devextreme/events/drag');
require('devextreme/events/hold');
require('devextreme/events/hover');
require('devextreme/events/pointer');
require('devextreme/events/swipe');
require('devextreme/events/transform');

/* Data (dx.module-core.js) */

DevExpress.data = require('devextreme/bundles/modules/data');

/* UI core (dx.module-core.js) */

const ui = (DevExpress.ui = require('devextreme/bundles/modules/ui'));

ui.themes = require('devextreme/ui/themes');

/* Base widgets (dx.module-widgets-base.js) */

ui.dxAutocomplete = require('devextreme/ui/autocomplete');
ui.dxBox = require('devextreme/ui/box');
ui.dxButton = require('devextreme/ui/button');
ui.dxDropDownButton = require('devextreme/ui/drop_down_button');
ui.dxButtonGroup = require('devextreme/ui/button_group');
ui.dxCheckBox = require('devextreme/ui/check_box');
ui.dxDateBox = require('devextreme/ui/date_box');
ui.dxDropDownBox = require('devextreme/ui/drop_down_box');
ui.dxDropDownMenu = require('devextreme/ui/drop_down_menu');
ui.dxForm = require('devextreme/ui/form');
ui.dxList = require('devextreme/ui/list');
ui.dxLoadIndicator = require('devextreme/ui/load_indicator');
ui.dxLoadPanel = require('devextreme/ui/load_panel');
ui.dxNavBar = require('devextreme/ui/nav_bar');
ui.dxNumberBox = require('devextreme/ui/number_box');
ui.dxOverlay = require('devextreme/ui/overlay/ui.overlay');
ui.dxPopover = require('devextreme/ui/popover');
ui.dxPopup = require('devextreme/ui/popup');
ui.dxRadioGroup = require('devextreme/ui/radio_group');
ui.dxSelectBox = require('devextreme/ui/select_box');
ui.dxSwitch = require('devextreme/ui/switch');
ui.dxTabPanel = require('devextreme/ui/tab_panel');
ui.dxTagBox = require('devextreme/ui/tag_box');
ui.dxTextArea = require('devextreme/ui/text_area');
ui.dxTextBox = require('devextreme/ui/text_box');
ui.dxToast = require('devextreme/ui/toast');
ui.dxToolbar = require('devextreme/ui/toolbar');
ui.dxTooltip = require('devextreme/ui/tooltip');
ui.dxSortable = require('devextreme/ui/sortable');

const viz = (DevExpress.viz = require('devextreme/bundles/modules/viz'));
viz.dxBullet = require('devextreme/viz/bullet');
