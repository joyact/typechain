{
  type CoffeeCup = {
    shots: number;
    hasMilk?: boolean;
    hasSugar?: boolean;
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

  // 우유 제조기
  class CheapMilkSteamer {
    private steamMilk(): void {
      console.log('>> Steaming some milk');
    }
    makeMilk(cup: CoffeeCup): CoffeeCup {
      this.steamMilk();
      return {
        ...cup,
        hasMilk: true,
      };
    }
  }

  // 설탕 제조기
  class CandySugarMixer {
    private getSugar(): void {
      console.log('>> Getting some sugar');
    }
    addSugar(cup: CoffeeCup): CoffeeCup {
      this.getSugar();
      return {
        ...cup,
        hasSugar: true,
      };
    }
  }

  // 우유 추가
  class CaffeLatteMachine extends CoffeeMachine {
    constructor(
      beans: number,
      public serialNumber: string,
      private milk: CheapMilkSteamer
    ) {
      super(beans); // 자식 클래스에서 constructor 만들땐 반드시 부모 클래스의 데이터도 함께 적용
    }
    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots); // 부모 클래스에서 함수 호출
      return this.milk.makeMilk(coffee);
    }
  }

  // 설탕 추가
  class SweetCoffeeMachine extends CoffeeMachine {
    constructor(beans: number, private sugar: CandySugarMixer) {
      super(beans);
    }
    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      return this.sugar.addSugar(coffee);
    }
  }

  // 우유 + 설탕 추가
  class SweetCaffeLatteMachine extends CoffeeMachine {
    constructor(
      beans: number,
      private milk: CheapMilkSteamer,
      private sugar: CandySugarMixer
    ) {
      super(beans);
    }

    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      const sugarAdded = this.sugar.addSugar(coffee);
      return this.milk.makeMilk(sugarAdded);
    }
  }

  // 기능 별로 클래스를 만들어두고 필요한 곳에서 composition한다
  const cheapMilkMaker = new CheapMilkSteamer();
  const candySugar = new CandySugarMixer();

  const machines = [
    {
      name: 'coffee',
      work: new CoffeeMachine(16),
    },
    {
      name: 'latte',
      work: new CaffeLatteMachine(50, 'ABC', cheapMilkMaker),
    },
    {
      name: 'sweetCoffee',
      work: new SweetCoffeeMachine(50, candySugar),
    },
    {
      name: 'sweetLatte',
      work: new SweetCaffeLatteMachine(50, cheapMilkMaker, candySugar),
    },
  ];

  machines.forEach((machine) => {
    console.log('--------------------');
    console.log(machine.name);
    machine.work.makeCoffee(1);
  });
}
