{
  type CoffeeCup = {
    shots: number;
    hasMilk?: boolean;
    hasSugar?: boolean;
  };

  interface BasicOption {
    makeCoffee(shots: number): CoffeeCup;
  }

  abstract class CoffeeMachine implements BasicOption {
    private static BEANS_GRAM_PER_SHOT: number = 7;
    private coffeeBeans: number = 0;

    constructor(coffeeBeans) {
      this.coffeeBeans = coffeeBeans;
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

    /* ----------------------------------------
     * 구현하는 클래스마다 달라지는 부분 - abstract 선언 */
    protected abstract extract(shots: number): CoffeeCup;

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

  class CaffeLatteMachine extends CoffeeMachine {
    private steamMilk() {
      console.log('>> Steaming some milk');
    }
    /* --------------- abstracted ------------------ */
    protected extract(shots: number): CoffeeCup {
      this.steamMilk();
      return {
        shots,
        hasMilk: true,
      };
    }
  }

  class SweetCoffeeMachine extends CoffeeMachine {
    private addSugar() {
      console.log('>> Adding sugar');
    }
    /* --------------- abstracted ------------------ */
    protected extract(shots: number): CoffeeCup {
      this.addSugar();
      return {
        shots,
        hasSugar: true,
      };
    }
  }

  const machines: BasicOption[] = [
    // new CoffeeMachine(16), // abstract 클래스는 object를 만들 수 없다
    new CaffeLatteMachine(16),
    new SweetCoffeeMachine(16),
  ];

  machines.forEach((machine) => {
    console.log('--------------------');
    machine.makeCoffee(1);
  });
}
