// Node List
class MyNode {
  data: string | number | null;
  next: MyNode | null;
  constructor(data?: string | number) {
    if (data) this.data = data;
    else this.data = null;
    this.next = null;
  }
}

// Node tree
class TreeNode {
  data: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(data: number) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

// Implementation Linked list
class LinkedList {
  head: MyNode | null;
  size: number;
  constructor() {
    this.head = null;
    this.size = 0;
  }

  add(data: string | number): void {
    let node = new MyNode(data);
    let currentNode = new MyNode();

    if (!this.head) {
      this.head = node;
    } else {
      currentNode = this.head;
      while (currentNode.next) {
        currentNode = currentNode.next;
      }
    }
    currentNode.next = node;
    this.size++;
  }

  removeById(id: number): void {
    if (id < 0 || id >= this.size) return;
    else {
      let currentNode: MyNode,
        prevNode: MyNode,
        index = 0;

      currentNode = this.head!;
      prevNode = currentNode;

      if (!id) this.head = currentNode.next;
      else {
        while (index < id) {
          prevNode = currentNode;
          currentNode = currentNode.next!;
          index++;
        }
        prevNode.next = currentNode.next;
        this.size--;
      }
    }
  }

  printList(): void {
    let currentNode = this.head;
    while (currentNode) {
      console.log(currentNode.data);
      currentNode = currentNode.next;
    }
  }
}

//Implementation Binary Search Tree
class MyTree {
  root: TreeNode | null;
  constructor() {
    this.root = null;
  }

  insert(node: TreeNode | null, data: number): void {
    let newNode = new TreeNode(data);
    if (this.root == null) {
      this.root = newNode;
    } else {
      if (newNode.data < this.root.data) {
        if (node!.left == null) node!.left = newNode;
        else this.insert(node!.left, data);
      } else if (node!.right == null) node!.right = newNode;
      else this.insert(node!.right, data);
    }
  }

  inorder(node: TreeNode): void {
    if (node !== null) {
      this.inorder(node.left!);
      console.log(node.data);
      this.inorder(node.right!);
    }
  }
}

// Init HTML elements
const LinkedListItems = new LinkedList();
const BinarySearchTree = new MyTree();

const initItem = document.getElementById("enter-item")! as HTMLInputElement;
const removeItems = document.getElementsByClassName("remove") as any;
const bodyContent = document.getElementsByClassName(
  "list-item"
)[0] as HTMLDivElement;
const noItem = document.getElementsByClassName("no-item") as any;
const notifi = document.getElementById("notifi") as HTMLDivElement;

let NumberArrayFromList: number[] = [];

const actions = {
  // add Number form LinkedList
  addNumber(node: MyNode, MyList: LinkedList) {
    if (Number(node.data!)) {
      // add number to tree
      BinarySearchTree.insert(BinarySearchTree.root, Number(node.data!));

      NumberArrayFromList.push(Number(node.data!));
    }
    if (node.next != null) this.addNumber(node.next!, MyList);
  },
  // check LinkedList is null or notNull
  check(myList: LinkedList) {
    if (myList.size === 0) noItem[0].style.display = "block";
    else noItem[0].style.display = "none";
  },
  addItem(myList: LinkedList): void {
    initItem.onkeydown = function (event): void {
      if (event.key == "Enter") {
        if (initItem.value.trim()) {
          myList.add(initItem.value);
          if (Number(initItem.value.trim()))
            notifi.innerHTML = `<p>You enter a number!</p>`;
        }
        initItem.value = "";

        // when size of List equals 10, use the function in order to test
        if (myList.size == 10) {
          actions.addNumber(myList.head!, myList);
          console.log(
            "NumberArrayFromList when size of list is " +
              myList.size +
              ": " +
              NumberArrayFromList
          );
          BinarySearchTree.inorder(BinarySearchTree.root!);
        }
      }
      actions.check(myList);
      actions.render(myList);
    };
  },

  // render Htmls from data of LinkedList
  render(myList: LinkedList): void {
    let htmls = ``;
    let currentNode = myList.head;
    while (currentNode) {
      htmls += `<div class="item">
                  <span>${currentNode.data}</span>
                  <span class="remove margin-item">x</span>
                </div>
                `;
      currentNode = currentNode.next;
    }
    bodyContent.innerHTML = htmls;
  },

  // remove tags from bodycontent
  remove(myList: LinkedList): void {
    bodyContent.onmouseover = () => {
      for (let i = 0; i < myList.size; i++) {
        removeItems[i].onclick = () => {
          removeItems[0].parentNode.parentNode.removeChild(
            removeItems[i].parentNode
          );
          myList.removeById(i);
        };
      }
    };
  },

  // Main function
  start(): void {
    if (LinkedListItems.size > 0) {
      actions.render(LinkedListItems);
    }

    actions.addItem(LinkedListItems);
    actions.remove(LinkedListItems);
  },
};

actions.start();
