class TemplateRenderer {
  static render() {
    const templates = document.querySelectorAll('template');
    templates.forEach(template => {
      const content = template.content.cloneNode(true);
      const customElements = content.querySelectorAll('[slot]');

      customElements.forEach(element => {
        const slotName = element.getAttribute('slot');
        const parentSlots = document.querySelectorAll(`slot[name="${slotName}"]`);

        parentSlots.forEach(parentSlot => {
          parentSlot.innerHTML = '';
          parentSlot.appendChild(element.cloneNode(true));
        });
      });
    });
  }
}

// Render the templates
TemplateRenderer.render();