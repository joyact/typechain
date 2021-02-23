{
  /**
   * Javascript
   * Primitive type : number, string, boolean, bigint, symbol, null, undefined
   * Object type : function, array ...
   */

  // number
  const num: number = -6;

  // string
  const str: string = 'hello';

  // boolean
  const boal: boolean = false;

  // undefined : 값이 있는지 없는지 결정 x
  let name: undefined; // 💩
  let age: number | undefined; // optional
  age = undefined;
  age = 1;
  function find(): number | undefined {
    return undefined;
  }

  // null : 값이 없다
  let person: null; // 💩
  let person2: string | null;

  // unknown 💩
  let notSure: unknown = 0;
  notSure = 'he';
  notSure = true;

  // any 💩
  let anything: any = 0;
  anything = 'hello';

  // void
  function print(): void {
    console.log('hello');
    return;
  }
  let unusable: void = undefined; // 💩

  // never
  function throwError(message: string): never {
    // message -> server (log)
    throw new Error(message);
    while (true) {}
  }
  let neverEnding: never; // 💩

  // objet
  let obj: object; // 💩
  function acceptSomeObject(obj: object) {}
  acceptSomeObject({ name: 'ellie' });
  acceptSomeObject({ animal: 'dog' });
}
