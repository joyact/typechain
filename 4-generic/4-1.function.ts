{
  function checkNullNumber(arg: number | null): number {
    if (arg == null) throw new Error('not vaild number!');
    return arg;
  }

  function checkNullString(arg: string | null): string {
    if (arg == null) throw new Error('not vaild number!');
    return arg;
  }

  function checkNullAny(arg: any | null): any {
    if (arg == null) throw new Error('not vaild number!');
    return arg;
  }

  // 타입이 제한적이거나 불확실함
  const result1 = checkNullNumber(123); // type : number
  const result2 = checkNullString('Hi'); // type : string
  const result3 = checkNullAny('Hello'); // result type : any

  // Generic을 사용하면 type을 유연하게 표현 가능. 전달 값에 따라 type 변경
  function checkNull<T>(arg: T | null): T {
    if (arg == null) throw new Error('not vaild number!');
    return arg;
  }
}
