import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormattingService {
  /**
   * Formats a number for display.
   * @param value The number to be formatted.
   * @returns String formatted number.
   */
  localFormat(
    number: number,
    precision: number = 2,
    decimalPoint: string = '.',
    thousandsSeparator: string = ','
  ) {
    let isNegative = false;

    if (number < 0) {
      isNegative = true;
      number *= -1;
    }

    const toFixedFix = function (num, decimals) {
      const k = Math.pow(10, decimals);

      return '' + Math.round(num * k) / k;
    };

    const stringParts = (
      precision ? toFixedFix(number, precision) : '' + Math.round(number)
    ).split('.');

    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    if (stringParts[0].length > 3) {
      stringParts[0] = stringParts[0].replace(
        /\B(?=(?:\d{3})+(?!\d))/g,
        thousandsSeparator
      );
    }

    if ((stringParts[1] || '').length < precision) {
      stringParts[1] = stringParts[1] || '';
      stringParts[1] += new Array(precision - stringParts[1].length + 1).join(
        '0'
      );
    }

    // trim whitespace
    if (stringParts[1]) {
      stringParts[1] = stringParts[1].replace(/\s+/g, '');

      while (stringParts[1].length < 2) {
        stringParts[1] += '0';
      }
    }

    let formatted =
      precision === 0 ? stringParts[0] : stringParts.join(decimalPoint);

    if (isNegative) {
      formatted = '(' + formatted + ')';
    }

    return formatted;
  }

  functionalFormat(
    number: number,
    precision: number = 2,
    decimalPoint: string = '.',
    thousandsSeparator: string = ','
  ) {
    let isNegative = false;

    if (number < 0) {
      isNegative = true;
      number *= -1;
    }

    const toFixedFix = function (num, decimals) {
      const k = Math.pow(10, decimals);

      return '' + Math.round(num * k) / k;
    };

    const stringParts = (
      precision ? toFixedFix(number, precision) : '' + Math.round(number)
    ).split('.');

    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    if (stringParts[0].length > 3) {
      stringParts[0] = stringParts[0].replace(
        /\B(?=(?:\d{3})+(?!\d))/g,
        thousandsSeparator
      );
    }

    if ((stringParts[1] || '').length < precision) {
      stringParts[1] = stringParts[1] || '';
      stringParts[1] += new Array(precision - stringParts[1].length + 1).join(
        '0'
      );
    }

    // trim whitespace
    if (stringParts[1]) {
      stringParts[1] = stringParts[1].replace(/\s+/g, '');

      while (stringParts[1].length < 2) {
        stringParts[1] += '0';
      }
    }

    let formatted =
      precision === 0 ? stringParts[0] : stringParts.join(decimalPoint);

    if (isNegative) {
      formatted = '(' + formatted + ')';
    }

    return formatted;
  }

  formatNumber(
    number: number,
    precision: number = 2,
    decimalPoint: string = '.',
    thousandsSeparator: string = ','
  ) {
    let isNegative = false;

    if (number < 0) {
      isNegative = true;
      number *= -1;
    }

    const toFixedFix = function (num, decimals) {
      const k = Math.pow(10, decimals);

      return '' + Math.round(num * k) / k;
    };

    const stringParts = (
      precision ? toFixedFix(number, precision) : '' + Math.round(number)
    ).split('.');

    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    if (stringParts[0].length > 3) {
      stringParts[0] = stringParts[0].replace(
        /\B(?=(?:\d{3})+(?!\d))/g,
        thousandsSeparator
      );
    }

    if ((stringParts[1] || '').length < precision) {
      stringParts[1] = stringParts[1] || '';
      stringParts[1] += new Array(precision - stringParts[1].length + 1).join(
        '0'
      );
    }

    // trim whitespace
    if (stringParts[1]) {
      stringParts[1] = stringParts[1].replace(/\s+/g, '');

      while (stringParts[1].length < 2) {
        stringParts[1] += '0';
      }
    }

    if (stringParts[1]) {
      let lastIndex = precision;

      for (let i = stringParts[1].length - 1; i > 1; --i) {
        if (stringParts[1][i] !== '0') {
          break;
        }

        lastIndex = i;
      }

      stringParts[1] = stringParts[1].substr(0, lastIndex);
    }

    let formatted =
      precision === 0 ? stringParts[0] : stringParts.join(decimalPoint);

    if (isNegative) {
      formatted = '(' + formatted + ')';
    }

    return formatted;
  }

  //This formats DX numberbox module inputs for currency. To use it add the [format] property and provide the required decimal precision variable.
  //This returns a custom mask that respects decimal precision and the accounting style. This does not return a formatted number string. This only works
  //with DX Numberbox it will not work with Crem Inputs.
  buildCurrencyMask(decimalPrecision: number) {
    let precision = decimalPrecision;
    let format = ' #,##0';
    let trailingZeros = '.';
    for (let i = 0; i < precision; i++) {
      trailingZeros += '0';
    }
    let returnString = '';
    if (precision > 0) {
      returnString =
        format + trailingZeros + ';(' + format + trailingZeros + ')';
    } else {
      returnString = format + ';(' + format + ')';
    }
    return returnString;
  }

  /**
   * Transforms a localFormat string containing a number back to the corresponding number type.
   * If the number is enclosed in parentheses, it indicates a negative number.
   * This is meant to be used with localFormat strings.
   *
   * @param {string} str - The string containing the number to be transformed.
   * @returns {number} - The corresponding number, negative if enclosed in parentheses.
   */
  transformLocalFormatToNumber(input: string | number): number {
    if (typeof input === 'number') {
      return input;
    }
    let str = input as string;
    str = str.replace(/,/g, ''); // Remove commas (thousand separators)

    if (str.startsWith('(') && str.endsWith(')')) {
      return -parseFloat(str.slice(1, -1));
    } else {
      return parseFloat(str);
    }
  }

  /**
   * Adds '%' to discount rate for display.
   * @param value The number to be formatted.
   * @returns String formatted number
   */
  discountRateFormat(value: number): string {
    return value + '%';
  }

  /**
   * Adds '%' to implicit rate, or returns 'N/A' for display.
   * @param value The number to be formatted.
   * @returns String formatted number or N/A.
   */
  implicitRateFormat(value: number): string {
    return value === -1234 || value === 0 ? 'N/A' : value * 100 + '%';
  }

  /**
   * Returns either the number as a string, or "N/A" for display.
   * @param value The number to be formatted.
   * @returns String formatted number or N/A.
   */
  fmvFormat(value: number): string {
    return value === -1234 || value === 0 ? 'N/A' : value + '';
  }
}
