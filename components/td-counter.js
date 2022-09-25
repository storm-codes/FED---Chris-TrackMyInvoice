import {
  LitElement,
  html,
  css,
  classMap,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js";

class ToDoAppCounter extends LitElement {
  static properties = {
    count: { type: Number },
    label: { type: String },
  };

  static styles = css`
    span {
      color: black;
    }

    span.great {
      color: green;
    }

    span.error {
      color: red;
    }
  `;

  add() {
    this.count = this.count + 1;
  }

  remove() {
    this.count = this.count - 1;
  }

  render() {
    const valueStyle = classMap({
      error: this.count < 0,
      great: this.count >= 10,
    });

    return html`
      <div>
        <button @click="${this.remove}">-</button>
        <span class="${valueStyle}"> ${this.label}: ${this.count} </span>
        <button @click="${this.add}">+</button>
      </div>
    `;
  }
}

customElements.define("td-counter", ToDoAppCounter);
