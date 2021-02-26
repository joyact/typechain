/* ---------------- generic 'extends' -------------- */
interface Employee {
  pay(): void;
}

class FullTimeEmployee implements Employee {
  pay() {
    console.log('full time!');
  }
  time() {}
}

// 세부적인 타입을 인자로 받아서 정말정말 추상적인 타입으로 다시 리턴하는 함수는 xx
function payBad(employee: Employee): Employee {
  employee.pay();
  return employee;
}

// 제네릭으로 Employee 포함해서 모두 출력
function payGood<E extends Employee>(employee: E): E {
  employee.pay();
  return employee;
}

const ellie = new FullTimeEmployee();
payBad(ellie); // interface에 포함 되지 않은 세부적인 time() 클래스 정보를 잃어버림
payGood(ellie); // 인스턴스에 포함된 모든 정보에 접근 가능

/* ---------------- generic 'extends keyof' -------------- */
const obj = {
  name: 'joy',
  age: 28,
};

const obj2 = {
  food: '🍕🍕',
};

// T : obj 타입
// K : obj 중 key의 타입
// 리턴타입: obj에서 key가 갖는 value의 타입
function getValue<T, K extends keyof T>(obj: T, key: K): T[K] {
  const value = obj[key];
  return value;
}

console.log(getValue(obj, 'name'));
console.log(getValue(obj, 'age'));
console.log(getValue(obj2, 'food'));
