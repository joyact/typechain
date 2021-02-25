{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };

  // 2. interface를 이용해 추상화
  // <클래스명> implements <interface> : interface 형식을 반드시 가지는 class
  interface BasicOption {
    makeCoffee(shots: number): CoffeeCup;
  }

  interface SpecialOption {
    makeCoffee(shots: number): CoffeeCup;
    fillCoffeeBeans(beans: number): void;
    clean(): void;
  }

  // public (default) | private : 외부접근 x | protected : 외부접근 x 상속받는 자식 class는 접근 가능
  class CoffeeMachine implements BasicOption, SpecialOption {
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

    // 1. encapsulation을 사용해 추상화. 사용자가 접근 가능한 함수를 정의
    private grindBeans(shots) {
      let requiredBeans = shots * CoffeeMachine.BEANS_GRAM_PER_SHOT;
      if (this.coffeeBeans < requiredBeans) {
        throw new Error('Not enough coffee beans!');
      }

      console.log(`BEAN STOCK : ${this.coffeeBeans}`);
      console.log(`ORDER : ${shots}`);
      console.log(`>> Grinding ${requiredBeans} beans`);
      this.coffeeBeans -= requiredBeans;
    }

    private preheat() {
      console.log('>> Heating ...');
    }

    private extract(shots) {
      console.log(`>> Pulling ${shots} shots`);
      return {
        shots,
        hasMilk: false,
      };
    }

    // 외부에서 멤버변수에 바로 접근하지않고 method를 통해 접근
    fillCoffeeBeans(beans: number) {
      if (beans < 0) {
        throw new Error('value for beans should  be greater than 0');
      } else {
        console.log(`>> Filling ${beans} beans ...`);
        this.coffeeBeans += beans;
      }
    }

    makeCoffee(shots: number): CoffeeCup {
      this.grindBeans(shots);
      this.preheat();
      return this.extract(shots);
    }

    clean() {
      console.log('>> Cleaning...');
    }
  }

  /*
  * instance level
    const maker = new CoffeeMachine(32);
  * class level
    각 interface 별로 약속된 method만 사용한다
    const maker1: BasicOption = CoffeeMachine.makeMachine(100);
    maker1.makeCoffee(5);

    const maker2: SpecialOption = CoffeeMachine.makeMachine(100);
    maker2.makeCoffee(1);
    maker2.fillCoffeeBeans(10);
    maker2.clean();
  */

  class AmateurUser {
    constructor(public machine: BasicOption) {}
    makeCoffee() {
      console.log('☕ An amateur is making coffee ☕');
      console.log(this.machine.makeCoffee(5));
    }
  }

  class ProBarista {
    constructor(public machine: SpecialOption) {}
    makeCoffee() {
      console.log('☕ A barista is making coffee ☕');
      console.log(this.machine.makeCoffee(3));
      this.machine.fillCoffeeBeans(50);
      this.machine.clean();
    }
  }

  const maker: CoffeeMachine = CoffeeMachine.makeMachine(100);

  // 동일한 CoffeeMachine 클래스를 사용하지만 각자 다른 interface를 가져오기때문에
  // interface에 따라 클래스내부 함수를 다르게 사용할 수 있다.
  const amateur = new AmateurUser(maker);
  const pro = new ProBarista(maker);

  amateur.makeCoffee();
  pro.makeCoffee();
}
