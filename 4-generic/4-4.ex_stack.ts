{
  interface Stack<T> {
    readonly size: number;
    push(value: T): void;
    pop(): T;
  }

  type StackNode<T> = {
    readonly value: T;
    readonly next?: StackNode<T>;
  };

  class StackImpl<T> implements Stack<T> {
    private _size: number = 0; // 내부에서만 쓰이는 변수 + 동일한 public 변수가 존재
    private head?: StackNode<T>;

    constructor(private capacity: number) {}

    // 외부에서 size 정보를 얻을 때
    get size() {
      return this._size;
    }

    // 새로운 노드 추가 Last In
    push(value: T) {
      // 정해진 용량을 초과할 때
      if (this.size === this.capacity) {
        throw new Error('Stack is full!');
      }

      const node = { value, next: this.head };
      this.head = node;
      this._size++;
    }

    // 노드 삭제 Last Out
    pop(): T {
      if (this.head == null) {
        throw new Error('Stack is empty!');
      }

      const node = this.head;
      this.head = node.next;
      this._size--;

      return node.value;
    }
  }

  // 문자 stack
  const stackStr = new StackImpl<string>(10);
  stackStr.push('Ellie 1');
  stackStr.push('Bob 2');
  stackStr.push('Steve 3');

  console.log(stackStr.pop());

  // 숫자 stack
  const stackNum = new StackImpl<number>(10);
  stackNum.push(123);
  stackNum.push(345);
  stackNum.push(456);

  console.log(stackNum.pop());
}
