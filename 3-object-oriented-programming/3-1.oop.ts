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

  // de-coupling with interface
  interface iMilkFrother {
    makeMilk(cup: CoffeeCup): CoffeeCup;
  }

  interface iSugarProvider {
    addSugar(cup: CoffeeCup): CoffeeCup;
  }

  // 우유 제조기
  class CheapMilkSteamer implements iMilkFrother {
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

  // 고급 우유 제조기
  class FancyMilkSteamer implements iMilkFrother {
    private steamMilk(): void {
      console.log('>> Fancy Steaming some milk');
    }
    makeMilk(cup: CoffeeCup): CoffeeCup {
      this.steamMilk();
      return {
        ...cup,
        hasMilk: true,
      };
    }
  }

  // 찬 우유 제조기
  class ColdMilkSteamer implements iMilkFrother {
    private steamMilk(): void {
      console.log('>> Steaming some cold milk');
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
  class CandySugarMixer implements iSugarProvider {
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

  // 설탕 제조기
  class BlackSugarMixer implements iSugarProvider {
    private getSugar(): void {
      console.log('>> Getting some black sugar');
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
      private milk: iMilkFrother
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
    constructor(beans: number, private sugar: iSugarProvider) {
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
      private milk: iMilkFrother,
      private sugar: iSugarProvider
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
  // de-coupling : 클래스로 엮인 것들을 interface를 사용해 풀어준다
  // 클래스 간에 소통이 발생하는 경우, 직접 하는게 아닌 계약서(interface)를 통해 소통한다

  // milk 종류
  const cheapMilkMaker = new CheapMilkSteamer();
  const fancyMilkMaker = new FancyMilkSteamer();
  const coldMilkMaker = new ColdMilkSteamer();

  // sugar 종류
  const candySugar = new CandySugarMixer();
  const blackSugar = new BlackSugarMixer();

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
      name: 'cold latte',
      work: new CaffeLatteMachine(50, 'ABC', coldMilkMaker),
    },
    {
      name: 'sweet black Coffee',
      work: new SweetCoffeeMachine(50, blackSugar),
    },
    {
      name: 'sweetCoffee',
      work: new SweetCoffeeMachine(50, candySugar),
    },
    {
      name: 'sweetLatte',
      work: new SweetCaffeLatteMachine(50, fancyMilkMaker, candySugar),
    },
  ];

  machines.forEach((machine) => {
    console.log('--------------------');
    console.log(machine.name);
    machine.work.makeCoffee(1);
  });
}
