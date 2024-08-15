import { InjectionToken } from "@angular/core";

export const RUNNING_IN_MANGO_SPA = new InjectionToken<boolean>('RUNNING_IN_MANGO_SPA', {
    factory: () => false
})

export const MANGO_SPA_DEFAULT_PAGE = '/crem/projects'

export const CREM_FORCE_RELOGIN_URLS = []

export const BREADCUMBS_LENGTH = 5

export const SUB_LEFT_NEV_PAGES_URLS = ['render-form', '/crem/portfolio/expenses', '/crem/accounting/summary', '/crem/projects/project-team', '/crem/projects/project-tasks', 'crem/costar-matching', '/crem/reminders']

//Constants for Lease Equipment Wizard
export const EQUIPMENT_RENDER_SELECT_TEMPLATE_ID = 131;
export const EQUIPMENT_RENDER_SELECT_SUPPLIER_ID = 133;
export const EQUIPMENT_OTID = 4;
export const EQUIPMENT_WIZARD_OTID = 174;
export const EQUIPMENT_WIZARD_SAVE_SUCCESS = 'Equipment Lease created successfully.';
export const EQUIPMENT_WIZARD_SAVE_ERROR = 'An error has occurred while saving equipment lease data. Please try again.';
export const PORTFOLIO_DROPDOWN_ERROR = 'An error occurred while getting portfolio data please contact the system administrator.';
export const CURRENCY_DROPDOWN_ERROR = 'An error occurred while getting currency data please contact the system administrator.';
export const VALIDATION_ERROR = 'Please fill out the required fields.';

//Constants for Add Supplier
export const RENDER_SELECT_TEMPLATE_ID = 132;
export const RENDER_SELECT_SUBGROUP_ID = 9;
export const SUPPLIER_OTID = 3;
export const SUPPLIER_WIZARD_OTID = 175;

//Constants for Add Company
export const RENDER_SELECT_REUQESTTYPE_ID = 11;
export const RENDER_SELECT_COMPANY_LOOKUP_ID = 11;
export const COMPANY_OTID = 11;
export const COMPANY_OTTID = 1100;
export const DEFAULT_DELETE_RIGHT = 5