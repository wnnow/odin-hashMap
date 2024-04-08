class Node {
  constructor(key = null, value = null, prevNode = null, nextNode = null) {
    this.key = key;
    this.value = value;
    this.prevNode = prevNode;
    this.nextNode = nextNode;
  }
}

class LinkedList {
  #size = 0;

  constructor() {
    this.head = null;
    this.tail = null;
  }

  get size() {
    return this.#size;
  }

  append(key, value) {
    const newNode = new Node(key, value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.nextNode = newNode;
      newNode.prevNode = this.tail;
      this.tail = newNode;
    }

    this.#size++;
  }

  prepend(key, value) {
    const newNode = new Node(key, value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.nextNode = this.head;
      this.head.prevNode = newNode;
      this.head = newNode;
    }

    this.#size++;
  }

  print() {
    let current = this.head;

    while (current) {
      console.log(current);
      current = current.nextNode;
    }
  }

  at(index) {
    let current = this.head;

    if (index === 0) {
      return current;
    }

    for (let i = 0; i < index; i++) {
      current = current.nextNode;
      if (current === null) break;
    }
    return current;
  }

  pop() {
    const tempTail = { ...this.tail };
    this.tail.prevNode.nextNode = null;
    this.tail.prevNode = null;
    this.tail = tempTail.prevNode;
    this.#size--;
  }

  contain(key) {
    let current = this.head;

    while (current) {
      if (current.key === key) {
        return true;
      }
      current = current.nextNode;
    }
    return false;
  }

  find(key) {
    let current = this.head;
    let i = 0;

    while (current) {
      if (current.key === key) {
        return i;
      }
      current = current.nextNode;
      i++;
    }
    return null;
  }

  toString() {
    let current = this.head;
    let tempStr = '';

    while (current) {
      tempStr += `key:(${current.key}, value: ${current.value}) -> `;
      current = current.nextNode;
    }
    return (tempStr += `null`);
  }

  insertAt(key, value, index) {
    if (index < 0 || index > this.#size) {
      throw new Error(`Index out of bound`);
    }

    const newNode = new Node(key, value);

    if (index === 0) {
      this.prepend(key, value);
    } else if (index === this.#size) {
      this.append(key, value);
    } else {
      const indexNode = this.at(index);
      newNode.prevNode = indexNode.prevNode;
      newNode.nextNode = indexNode;
      indexNode.prevNode.nextNode = newNode;
      indexNode.prevNode = newNode;
      this.#size++;
    }
  }

  removeAt(index) {
    if (index < 0 || index >= this.#size) {
      throw new Error(`Index out of bounds`);
    }

    let removeNode;

    if (index === 0) {
      removeNode = this.head;
      this.head = removeNode.nextNode;
      if (this.head) {
        this.head.prevNode = null;
      } else {
        this.tail = null;
      }
    } else if (index === this.#size - 1) {
      removeNode = this.tail;
      this.tail = removeNode.prevNode;
      this.tail.nextNode = null;
    } else {
      removeNode = this.at(index);
      removeNode.prevNode.nextNode = removeNode.nextNode;
      removeNode.nextNode.prevNode = removeNode.prevNode;
    }
  }
}

class Hash {
  constructor(capacity = 16, loadFactor = 0.75) {
    this.capacity = capacity;
    this.loadFactor = 0.75;
    this.table = [];
  }

  checkLoadFactor() {
    if (this.table.length > this.capacity * this.loadFactor) {
      return true;
    } else {
      return false;
    }
  }

  resizeTable() {
    const tempArr = structuredClone(this);

    this.capacity *= 2;
    this.clearTable();

    for (let i = 0; i < this.table.length; i++) {
      if (tempArr.table[i] === null || tempArr.table[i] === undefined) continue;

      let current = tempArr.table[i].head;

      while (current) {
        this.set(current.key, current.value);
        current = current.nextNode;
      }
    }
  }

  createHashTable() {
    for (let i = 0; i < this.capacity; i++) {
      if (this.table[i] === undefined) {
        this.table[i] = null;
      }
      if (this.table[i] !== null) continue;
    }
  }

  clearTable() {
    for (let i = 0; i < this.capacity; i++) {
      this.table[i] = null;
    }
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  set(key, value) {
    if (this.table[0] === undefined) {
      this.createHashTable();
    }

    const keyIndex = this.hash(key);

    if (this.table[keyIndex] === null) {
      this.table[keyIndex] = new LinkedList();
      this.table[keyIndex].append(key, value);
    } else {
      this.table[keyIndex].append(key, value);
    }
  }
}

let testHash = new Hash();

testHash.set('Miyuki', 'test1');
testHash.set('Miyuki', 'test2');
testHash.set('Miyuki', 'test3');
testHash.set('Miyuki', 'test4');

testHash.resizeTable();
console.log('🚀 ~ testHash:', testHash);
console.log('🚀 ~ testHash:', testHash.table[22].toString());
