{
  /**
   * Functional Parameter
   */

  // Optional parameter : ?
  function printName(firstName: string, lastName?: string) {
    console.log(firstName);
    console.log(lastName); // undefined
  }
  printName('Steve', 'Jobs');
  printName('Ellie');
  printName('Joy', undefined);

  // Default parameter
  function printMessage(message: string = 'This is default') {
    console.log(message);
  }
  printMessage(); // This is default

  // Rest parameter
  function addNumber(...numbers: number[]): number {
    return numbers.reduce((a, b) => a + b);
  }
  addNumber(1, 2);
  addNumber(1, 2, 3, 4, 5);
  addNumber(1, 2, 3, 4, 5, 10, 30, 100);
}
