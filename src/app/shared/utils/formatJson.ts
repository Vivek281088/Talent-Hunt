
export function formatJson(json: any): string {
    const jsonString = JSON.stringify(json, null, 2);
    return jsonString
      .replace(/\"([^(\")"]+)\":/g, '<span class="json-key">"$1"</span>:')
      .replace(/: \"([^\"]*)\"/g, ': <span class="json-value">"$1"</span>')
      .replace(/: (\d+)/g, ': <span class="json-value">$1</span>');
  }