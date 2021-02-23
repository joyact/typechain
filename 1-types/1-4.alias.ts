{
  /*
   * Type Aliases : 새로운 타입을 정의!
   * 원시타입에 이름을 주고 싶은 경우
   */

  type Text = string;
  const name: Text = 'ellie';

  // 객체 형태의 타입
  type Student = {
    name: string;
    age: number;
  };

  const student: Student = {
    name: 'Joy',
    age: 28,
  };

  // String Literal Types : 문자열 타입
  type Name = 'joy';
  let joyName: Name;
}
