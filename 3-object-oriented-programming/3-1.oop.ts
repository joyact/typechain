{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };

  interface BasicOption {
    makeCoffee(shots: number): CoffeeCup;
  }

  class CoffeeMachine implements BasicOption {
    private static BEANS_GRAM_PER_SHOT: number = 7;
    private coffeeBeans: number = 0;

    constructor(coffeeBeans) {
      this.coffeeBeans = coffeeBeans;
    }

    static makeMachine(coffeeBeans: number): CoffeeMachine {
      return new CoffeeMachine(coffeeBeans);
    }

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

  // 클래스 '상속' 받아 새 클래스 만들기!
  // <자식클래스명> extends <부모클래스명>
  class CaffeLatteMachine extends CoffeeMachine {
    constructor(beans: number, serialNumber: string) {
      super(beans); // 자식 클래스에서 constructor 만들땐 반드시 부모 클래스의 데이터도 함께 적용
    }

    private steamMilk() {
      console.log('>> Steaming some milk');
    }

    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots); // 부모 클래스에서 함수 호출
      this.steamMilk();
      return {
        ...coffee,
        hasMilk: true,
      };
    }
  }

  const coffee = new CoffeeMachine(50);
  const latte = new CaffeLatteMachine(50, 'ABC');

  coffee.makeCoffee(1);
  latte.makeCoffee(2);
}
