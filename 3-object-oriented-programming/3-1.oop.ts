{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };

  // public (default) | private : 외부접근 x | protected : 외부접근 x 상속받는 자식 class는 접근 가능
  class CoffeeMachine {
    // member variables ( private : 외부에서 접근 못하게 )
    private static BEANS_GRAM_PER_SHOT: number = 7; // class level : <클래스명.변수명>
    private coffeeBeans: number = 0; // instance(object) level : <this.변수명>

    // 인스턴스 생성 시 항상 호출되는 함수
    constructor(coffeeBeans) {
      this.coffeeBeans = coffeeBeans;
    }

    static makeMachine(coffeeBeans: number): CoffeeMachine {
      return new CoffeeMachine(coffeeBeans);
    }

    // 외부에서 멤버변수에 바로 접근하지않고 method를 통해 접근
    fillCoffeeBeans(beans: number) {
      if (beans < 0) {
        throw new Error('value for beans should  be greater than 0');
      }
      this.coffeeBeans += beans;
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
  const maker2 = CoffeeMachine.makeMachine(100); // class level
  console.log(maker);
  console.log(maker.makeCoffee(2));
  console.log(maker2);
  // maker.coffeeBeans = 5; // invaild
}
