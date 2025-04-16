import { Pipe, PipeTransform } from '@angular/core';

export function transform(formItemId: string, datasource: any[]): any {
  if (!formItemId || !datasource) {
    return null;
  }

  // Use getParameters function to fetch parameters
  const parameters = getParameters(formItemId, datasource);
  if (!parameters) {
    return [];
  }

  // Parse parameters
  return parameters.split('|').map((param) => {
    const [valuePart, labelPart] = param.split(',');
    const value = valuePart.split('=')[1];
    const display = labelPart.split('=')[1];
    return { value, display };
  });
}

function getParameters(formItemId: string, datasource: any[]): string | null {
  const matchingItem = datasource?.find(
    (item) => item.formItemID === formItemId.toString()
  );
  return matchingItem ? matchingItem.formItemParameters : null;
}

export function clauseTransform(formItemParameters: string) {
  if (!formItemParameters) {
    return null;
  }

  // Parse parameters
  return formItemParameters.split('|').map((param) => {
    const splitParam = param.split('=')
    const fieldName = splitParam[0];
    const fieldVisible = splitParam[1];
    return { fieldName, fieldVisible };
  });
}

@Pipe({
  name: 'parseformItemParameters',
  standalone: true,
})
export class ParseFormItemParametersPipe implements PipeTransform {
  transform = transform;
  clauseTransform = clauseTransform;
}
