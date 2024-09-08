class ComponentRenderer {
  static render() {
    const templates = document.querySelectorAll('template');
    templates.forEach(template => {
      const content = template.content.cloneNode(true);
      const customElements = content.querySelectorAll('[slot], :not([slot])');

      customElements.forEach(element => {
        if (element.hasAttribute('slot')) {
          const slotName = element.getAttribute('slot');
          const parentSlots = document.querySelectorAll(`slot[name="${slotName}"]`);

          parentSlots.forEach(parentSlot => {
            parentSlot.innerHTML = '';
            parentSlot.appendChild(element.cloneNode(true));
          });
        } else {
          const parentSlot = document.querySelector('slot:not([name])');
          if (parentSlot) {
            parentSlot.innerHTML = '';
            parentSlot.appendChild(element.cloneNode(true));
          }
        }
      });
    });
  }
}

// Render the templates
ComponentRenderer.render();