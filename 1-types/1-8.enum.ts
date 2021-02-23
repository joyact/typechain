{
  /*
   * Enum 💩 - 여러 상수값을 한 곳에 모아 정의할 수 있음
   * 타입스크립트에서 Enum은 가능한 사용 x
   * 대부분 Union으로 대체해서 사용.
   * 정확한 타입이 보장되지 않는다.
   * 모바일 native 언어는 union 타입이 없어서 enum 사용
   */

  // Javascript
  const MAX_NUM = 6;
  const MAX_STUDENT_PER_CLASS = 10;

  const MONDAY = 0;
  const TUESDAY = 1;
  const WEDNESDAY = 2;
  const DAYS_ENUM = Object.freeze({ MONDAY: 0, TUESDAY: 1, WEDNESDAY: 2 });
  const dayOfToday = DAYS_ENUM.MONDAY; // 0

  // Typescript
  enum Days {
    Monday = 1,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday,
  }

  console.log(Days.Monday); // 1
  console.log(Days.Saturday); // 6

  // 문제점
  let day: Days = Days.Saturday;
  day = 10000; // enum 범위 밖의 숫자 입력했으나 에러 x

  // 해결방법
  type DayUnion = 'Mon' | 'Tue' | 'Wed';
  let day2: DayUnion = 'Mon';
  day2 = 'Wed'; // 지정한 string 중 하나만 사용 가능
}
