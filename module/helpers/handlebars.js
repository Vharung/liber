export function registerHandlebarsHelpers() {
  Handlebars.registerHelper('magicSelect', function(field, options) {
    const value = options.hash.value || '';
    const magicList = options.hash.options || [];
    
    let html = `<select name="${field.fieldPath}" data-dtype="String">`;
    html += `<option value="">-- Sélectionner --</option>`;
    
    magicList.forEach(magic => {
      const selected = magic.id === value ? 'selected' : '';
      const tooltip = `${magic.name} : ${magic.description || ''}`;
      html += `<option value="${magic.id}" ${selected} title="${tooltip}">${magic.name} (${magic.quantity})</option>`;
    });
    
    html += `</select>`;
    return new Handlebars.SafeString(html);
  });
}