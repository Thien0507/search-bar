"use strict";
let ListItem = [];

const initItem = document.getElementById("enter-item");
const removeItems = document.getElementsByClassName("remove");
const bodyContent = document.getElementsByClassName("list-item");
const noItem = document.getElementsByClassName("no-item");
let currentItem;

const actions = {
  check(isRomve = 0) {
    if (ListItem.length === 0) {
      noItem[0].style.display = "block";
    } else {
      noItem[0].style.display = "none";
    }
    if (isRomve) {
      for (let i = 0; i < ListItem.length; i++) {
        if ((i + 1) % 2 == 0) {
          removeItems[i].parentElement.classList.add("even-item");
        } else {
          removeItems[i].parentElement.classList.remove("even-item");
        }
      }
    }
  },
  add() {
    initItem.onkeydown = function (e) {
      if (e.key === "Enter") {
        const value = initItem.value.trim();
        if (value) {
          ListItem.push(value);

          const divEl = document.createElement("div");
          divEl.classList.add("item");
          if (ListItem.length % 2 == 0 ? `even-item` : "" == "even-item") {
            divEl.classList.add(`even-item`);
          }

          const chilEl1 = document.createElement("span");
          chilEl1.textContent = `${ListItem[ListItem.length - 1]}`;

          const chilEl2 = document.createElement("span");
          chilEl2.classList.add("remove");
          chilEl2.classList.add("margin-item");
          chilEl2.textContent = "x";

          divEl.appendChild(chilEl1);
          divEl.appendChild(chilEl2);

          bodyContent[0].appendChild(divEl);
          chilEl2.addEventListener("click", (e) => {
            actions.remove(e);
          });

          // chilEl.addEventListener("click", function (e) {
          //   console.log(e.target);
          // });

          //   currentItem = `
          // <div class="item ${ListItem.length % 2 == 0 ? `even-item` : ``}">
          //   <span>${ListItem[ListItem.length - 1]}</span>
          //   <span class="remove margin-item ">x</span>
          // </div>`;
          // bodyContent[0].insertAdjacentHTML("beforeend", currentItem);
        }
        initItem.value = null;
      }
      actions.check();
    };
  },
  remove(event) {
    ListItem.pop();
    event.target.parentElement.remove();
    actions.check(true);
  },
  start() {
    if (ListItem.length > 0) {
      this.render(ListItem);
      noItem[0].style.display = "none";
    }
    // this.remove();
    this.add();
  },
};

actions.start();
