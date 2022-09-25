import {
  LitElement,
  html,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js";

class ToDoAppComp extends LitElement {
  render() {
    return html` 
        <div>
          <td-counter count="3" label="Chords" ></td-counter>
          <td-counter count="6" label="Working Flash Drives" ></td-counter>
          <td-counter count="99" label="Corrupted Flash Drives" ></td-counter>
          <td-counter count="43" label="Wrong Answers" ></td-counter>
          <td-counter count="42" label="Answers Life the Universe and Everything" ></td-counter>
          <td-counter count="-110" label="Electricity" ></td-counter> 
            </div> 
            `;
  }
}

customElements.define("todo-appy", ToDoAppComp);
