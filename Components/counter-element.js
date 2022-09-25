class CounterElement extends HTMLElement {
  inner = this.attachShadow({ mode: "closed" });
  count = 0;

  connectedCallBack() {
    this.inner.innerHTML = `
    <style>
    div {
        border: 1px solid red;
    }
    </style>
<div>
<span> 0 </span>
    <div> Number of Hours Worked </div>
    <button> + </button>


</div>`;

    const button = this.inner.querySelector("button");
    const display = this.inner.querySelector("span");

    const handler = () => {
      const newCount = this.count + 1;
      display.innerText = newCount;
    };

    button.addEventListener("click", handler);
  }
}

customElements.define("counter-element", CounterElement);
