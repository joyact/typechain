{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };

  // 관련 속성과 함수를 묶어 어떤 형태의 데이터를 만들지 정의하는 것
  class CoffeeMachine {
    // member variables
    static BEANS_GRAM_PER_SHOT: number = 7; // class level : <클래스명.변수명>
    coffeeBeans: number = 0; // instance(object) level : <this.변수명>

    // 인스턴스 생성 시 항상 호출되는 함수
    constructor(coffeeBeans) {
      this.coffeeBeans = coffeeBeans;
    }

    static makeMachine(coffeeBeans: number): CoffeeMachine {
      return new CoffeeMachine(coffeeBeans);
    }

    makeCoffee(shots: number): CoffeeCup {
      let requiredBeans = shots * CoffeeMachine.BEANS_GRAM_PER_SHOT;
      if (this.coffeeBeans < requiredBeans) {
        throw new Error('Not enough coffee beans!');
      }
      this.coffeeBeans -= requiredBeans;
      return {
        shots,
        hasMilk: false,
      };
    }
  }

  const maker = new CoffeeMachine(32); // instance level
  const maker2 = CoffeeMachine.makeMachine(1); // class level
  console.log(maker);
  console.log(maker.makeCoffee(2));
  console.log(maker2);
}
