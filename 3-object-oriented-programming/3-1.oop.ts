{
  type CoffeeCup = {
    shots: number;
    hasMilk?: boolean;
    hasSugar?: boolean;
  };

  interface BasicOption {
    makeCoffee(shots: number): CoffeeCup;
  }

  // de-coupling with interface
  interface iMilkFrother {
    makeMilk(cup: CoffeeCup): CoffeeCup;
  }

  interface iSugarProvider {
    addSugar(cup: CoffeeCup): CoffeeCup;
  }

  class CoffeeMachine implements BasicOption {
    private static BEANS_GRAM_PER_SHOT: number = 7;
    private coffeeBeans: number = 0;

    constructor(
      coffeeBeans,
      private milk: iMilkFrother,
      private sugar: iSugarProvider
    ) {
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
      const coffee = this.extract(shots);
      const addedSugar = this.sugar.addSugar(coffee);
      return this.milk.makeMilk(addedSugar);
    }

    clean() {
      console.log('>> Cleaning...');
    }
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

  // 우유 x
  class NoMilk implements iMilkFrother {
    makeMilk(cup: CoffeeCup): CoffeeCup {
      return cup;
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

  // 흑설탕 제조기
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

  // 설탕 x
  class NoSugar implements iSugarProvider {
    addSugar(cup: CoffeeCup): CoffeeCup {
      return cup;
    }
  }

  // 기능 별로 클래스를 만들어두고 필요한 곳에서 composition한다
  // de-coupling : 클래스로 엮인 것들을 interface를 사용해 풀어준다
  // 클래스 간에 소통이 발생하는 경우, 직접 하는게 아닌 계약서(interface)를 통해 소통한다

  // milk 종류
  const cheapMilkMaker = new CheapMilkSteamer();
  const fancyMilkMaker = new FancyMilkSteamer();
  const coldMilkMaker = new ColdMilkSteamer();
  const noMilk = new NoMilk();

  // sugar 종류
  const candySugar = new CandySugarMixer();
  const blackSugar = new BlackSugarMixer();
  const noSugar = new NoSugar();

  const machines = [
    {
      name: 'coffee',
      work: new CoffeeMachine(16, noMilk, noSugar),
    },
    {
      name: 'latte',
      work: new CoffeeMachine(50, cheapMilkMaker, noSugar),
    },
    {
      name: 'cold latte',
      work: new CoffeeMachine(50, coldMilkMaker, noSugar),
    },
    {
      name: 'sweet black Coffee',
      work: new CoffeeMachine(50, noMilk, blackSugar),
    },
    {
      name: 'sweetCoffee',
      work: new CoffeeMachine(50, noMilk, candySugar),
    },
    {
      name: 'sweetLatte',
      work: new CoffeeMachine(50, fancyMilkMaker, candySugar),
    },
  ];

  machines.forEach((machine) => {
    console.log('--------------------');
    console.log(machine.name);
    machine.work.makeCoffee(1);
  });
}
