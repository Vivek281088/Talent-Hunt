
export function transformDataToInputFields(data: any, parentKey: string = ''): any[] {
    const inputFields: any = [];
  
    function processObject(obj: any, parentKey: string) {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          let value = obj[key];
          const newKey = parentKey ? `${parentKey}. - ${key}` : key;
          if (key === 'deleted' || value == "" || value == null) {
            continue;
          }
          if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            processObject(value, newKey);
          } else {
            if (Array.isArray(value)) {
              value = value.join(', ');
            } else if (typeof value === 'object' && value !== null) {
              value = JSON.stringify(value);
            }
            inputFields.push({
              label: newKey.replace(/\b([A-Z]+)\b/g, match => match.charAt(0) + match.slice(1).toLowerCase())
              .replace(/([A-Z])/g, ' $1')
              .replace(/\./g, ' ')
              .replace(/\b\w/g, str => str.toUpperCase()),
              id: newKey,
              value
            });
          }
        }
      }
    }
  
    processObject(data, parentKey);
    inputFields.sort((a: { label: string; }, b: { label: any; }) => a.label.localeCompare(b.label));
    return inputFields;
  }