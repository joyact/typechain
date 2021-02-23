{
  /*
    Type Assertion 💩
    타입 강요 ?
  */

  // 타입 없는 javascript 함수를 사용하는 경우
  function jsStrFuc(): any {
    return 'hello';
  }

  const result = jsStrFuc();
  const asserted = result as string;
  console.log(result.length); // (x) 타입 'any' 😨😨
  console.log(asserted.length); // (o) 타입 'string'

  const wrong: any = 5;
  console.log((wrong as number[]).push(1)); // error!!! 😨😨

  // '!' : 100% type이 있다고 가정할 때
  function findNumbers(): number[] | undefined {
    return undefined;
  }

  const numbers = findNumbers()!;
  numbers!.push(2);
}
