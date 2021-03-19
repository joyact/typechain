interface Stack {
  readonly size: number;
  push(value: string): void;
  pop(): string;
}

type StackNode = {
  readonly value: string;
  readonly next?: StackNode;
};

class StackImpl implements Stack {
  private _size: number = 0; // 내부에서만 쓰이는 변수 + 동일한 public 변수가 존재
  private head?: StackNode;

  constructor(private capacity: number) {}

  // 외부에서 size 정보를 얻을 때
  get size() {
    return this._size;
  }

  // 새로운 노드 추가 Last In
  push(value: string) {
    // 정해진 용량을 초과할 때
    if (this.size === this.capacity) {
      throw new Error('Stack is full!');
    }

    const node: StackNode = { value, next: this.head };
    this.head = node;
    this._size++;
  }

  // 노드 삭제 Last Out
  pop(): string {
    if (this.head == null) {
      throw new Error('Stack is empty!');
    }

    const node = this.head;
    this.head = node.next;
    this._size--;

    return node.value;
  }
}

const stack = new StackImpl(10);
stack.push('Ellie 1');
stack.push('Bob 2');
stack.push('Steve 3');

console.log(stack.pop());
