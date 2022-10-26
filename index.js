"use strict";
let ListItem = [];

const initItem = document.getElementById("enter-item");
const removeItems = document.getElementsByClassName("remove");
const bodyContent = document.getElementsByClassName("list-item");
const noItem = document.getElementsByClassName("no-item");

const actions = {
  convert(item) {},
  check() {
    if (ListItem.length === 0) {
      noItem[0].style.display = "block";
    } else {
      noItem[0].style.display = "none";
    }
  },
  add() {
    initItem.onkeydown = function (e) {
      if (e.key === "Enter") {
        if (initItem.value.trim()) {
          ListItem.push(initItem.value);
        }
        initItem.value = null;
        actions.render(ListItem);
      }
      actions.check();
    };
  },
  remove() {
    for (let i = 0; i < removeItems.length; i++) {
      removeItems[i].onclick = function () {
        ListItem.splice(i, 1);
        actions.render(ListItem);
        actions.check();
      };
    }
  },
  render(ListItem) {
    const htmls = `
    ${ListItem.map(
      (item) =>
        `
        <div class="item">
          <span>${item}</span>
          <span class="remove margin-item">x</span>
        </div>`
    ).join("")}
  `;
    bodyContent[0].innerHTML = htmls;
  },
  start() {
    if (ListItem.length > 0) {
      this.render(ListItem);
      noItem[0].style.display = "none";
    }
    document.onclick = () => {
      this.remove();
      this.add();
    };
  },
};

actions.start();
