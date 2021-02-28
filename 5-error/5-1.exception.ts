{
  /**
   * Exception : 예상하지 못한 이슈
   * <-> Error State : 예상 가능한 이슈
   * relability(안정성), maintainability(유지보수성)
   */

  // Error(Exception) Handling: try -> catch -> finally

  function readFile(fileName: string) {
    if (fileName === 'none') {
      throw new Error(`error ${fileName}`);
    }
    return 'file contents <<<';
  }

  function closeFile(fileName: string) {
    //
  }

  function run() {
    const fileName = 'none';
    try {
      console.log(readFile(fileName));
    } catch (error) {
      console.log('catched!!');
      return;
    } finally {
      // try catch 성공여부에 상관없이 마지막에 항상 실행
      console.log(closeFile(fileName));
      console.log('closed');
    }
  }

  run();

  type Move = 'up' | 'down' | 'left';
  let x = 0;
  function Example(direction: Move): void {
    switch (direction) {
      case 'up':
        x++;
        break;
      case 'down':
        x--;
        break;
      default:
        const invaild: never = direction;
        /* 
          모든 case가 다 등록된 상태(never). 
          처리되지않은 case가 있으면 타입 적용되서 error 발생! 
        */
        throw new Error(`unknown direction: ${direction}`);
    }
  }
}
