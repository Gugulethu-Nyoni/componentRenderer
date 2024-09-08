import { JSDOM } from 'jsdom';

// Define your HTML templates as constants
const parentComponent = `<p><slot name="my-text">My default text</slot></p>`;
const childComponent = `
  <my-card>
    <span slot="my-text">Let's have some different text!</span>
  </my-card>
`;

// Create a new JSDOM instance with the initial HTML
const dom = new JSDOM(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Test</title>
</head>
<body>
  <script id="custom-element-definition">
    class MyCard extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = \`${parentComponent}\`;
      }
    }
    customElements.define('my-card', MyCard);
  </script>
  <script id="apply-child-component">
    document.body.innerHTML += \`${childComponent}\`;
  </script>
</body>
</html>
`, { url: "http://localhost" });

// Extract the window and document from the JSDOM instance
const { window } = dom;
const { document } = window;

// Define the custom element class directly in the JSDOM environment
class MyCard extends window.HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = parentComponent;
  }
}
window.customElements.define('my-card', MyCard);

// Apply the child component directly
document.body.innerHTML += childComponent;

// Function to force re-render of custom elements
const forceRender = () => {
  const elements = document.querySelectorAll('my-card');
  elements.forEach(el => el.connectedCallback && el.connectedCallback());
};

// Force re-rendering of custom elements
forceRender();

// Output the final HTML
console.log(document.body.innerHTML);
