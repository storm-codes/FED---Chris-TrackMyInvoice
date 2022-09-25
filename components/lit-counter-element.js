import {
  LitElement,
  html,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";

class LitCounter extends LitElement {
  static properties = {
    count: { type: Number },
    label: { type: String },
  };

  render() {
    return html`<div>${this.label}: ${this.count}</div>`;
  }
}

customElements.define("lit-counter-element", LitCounter);
