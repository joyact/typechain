{
  /**
   * Pick<Type, Keys>
   * 특정 타입에서 몇 개의 속성을 선택하여 타입을 정의
   */

  interface Product {
    id: number;
    name: string;
    price: number;
    brand: string;
    stock: number;
  }

  type ShoppingItem = Pick<Product, 'name' | 'price'>;

  function getProductAll(id: number): Product {
    return {
      id,
      name: 'laptop',
      price: 300,
      brand: 'samsung',
      stock: 10,
    };
  }

  // 상품의 상세정보 (Product의 일부 속성만 가져온다)
  function getProductPrice(id: number): ShoppingItem {
    return {
      name: 'book',
      price: 10,
    };
  }
}
