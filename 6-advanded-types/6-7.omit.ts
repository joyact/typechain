{
  /**
   * Omit<Type, Keys>
   * 특정 속성만 제거한 타입을 정의. pick의 반대
   */

  interface Product {
    id: number;
    name: string;
    price: number;
    brand: string;
    stock: number;
  }

  type ShoppingItem = Omit<Product, 'name' | 'price'>;

  // 상품의 상세정보 ('name'과 'price' 를 제외한 나머지 속성만 가져온다)
  function getProduct(id: number): ShoppingItem {
    return {
      id,
      brand: 'samsung',
      stock: 10,
    };
  }
}
