class ComponentRenderer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  async render() {
    const template = this.querySelector('template');
    if (template) {
      const content = template.content.cloneNode(true);
      const slots = content.querySelectorAll('[slot]');
      
      slots.forEach(slot => {
        const slotName = slot.getAttribute('slot');
        const parentSlots = document.querySelectorAll(`slot[name="${slotName}"]`);

        parentSlots.forEach(parentSlot => {
          // Remove the default text
          parentSlot.innerHTML = '';

          // Append the slot content to the parent slot
          parentSlot.appendChild(slot.cloneNode(true));
        });
      });
    }
  }
}

// Define the custom element
customElements.define('dynamic-component', ComponentRenderer);