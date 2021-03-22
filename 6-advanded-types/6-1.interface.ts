{
  /**
   * Type vs Interface
   * interface : 어떤 것의 규격사항. 이 규격을 통해 구현되는 것이 있다면 interface를 사용!
   * type : 데이터를 담을 때. ex) position을 나타낼 때
   * interface만 쓰는 것은 좋지 않다
   */

  type PositionType = {
    x: number;
    y: number;
  };

  interface PositionInterface {
    x: number;
    y: number;
  }

  // 오브젝트에 타입을 할 수 있다
  const obj1: PositionType = {
    x: 1,
    y: 2,
  };

  const obj2: PositionInterface = {
    x: 1,
    y: 2,
  };

  // 클래스에서 구현이 가능하다
  class Pos1 implements PositionType {
    x: number;
    y: number;
  }
  class Pos2 implements PositionInterface {
    x: number;
    y: number;
  }

  // Extends 확장이 가능하다
  // type : 인터섹션을 사용해 묶어서 확장
  // interface : extends 상속을 통해서 확장
  type ZPositionType = PositionType & { z: number };
  interface ZPositionInterface extends PositionInterface {
    z: number;
  }

  // only interfaces can be merged
  interface PositionInterface {
    z?: number;
  }

  // Type aliases can use computed properties
  type Person = {
    name: string;
    age: number;
  };

  type Name = Person['name']; // type=string
  type NumberType = number; // new named type
  type Direction = 'left' | 'right'; // union type
}
