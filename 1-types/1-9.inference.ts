{
  /*
   * Type Inference 💩 - 타입 추론 (자동으로 타입이 설정)
   * 원시타입을 제외한 함수의 타입을 지정하는 경우
   * 가독성을 위해 타입을 꼭 명시해야 한다
   */

  // type: string
  let text = 'hello';

  // type: any
  function print(message) {
    console.log(message);
  }

  // return type: number
  function add(x: number, y: number) {
    return x + y;
  }
}
