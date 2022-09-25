import {
  LitElement,
  html,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";

class LitCounter extends LitElement {
  static properties = {
    count: { type: Number, state: true },
    label: { type: String },
  };

  render() {
    return html`<div>$(label): $(count)</div>`;
  }
}

customElements.define("lit-counter-element", LitCounter);
