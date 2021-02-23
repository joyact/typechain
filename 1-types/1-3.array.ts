{
  /*
   * Array
   */

  const fruits: string[] = ['🍎', '🍌'];
  const scores: Array<number> = [90, 75];

  // 오브젝트 불변성을 지켜줌: readonly
  function printArray(fruits: readonly string[]) {}

  // Tuple
  // 데이터 접근 시 인덱스를 사용. 가독성이 떨어진다.
  // interface, type alias, class 등으로 대체해서 사용
  let student: [string, number];
  student = ['Joy', 20];
  student[0]; // "Joy"
  student[1]; // 20
  const [name, age] = student; // destructuring해서 가독성을 높임. ex) useState()
}
