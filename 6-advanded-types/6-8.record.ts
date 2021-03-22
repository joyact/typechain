{
  /**
   * Record<Keys,Type>
   * keys : key의 집합을 가진 타입 생성
   * 생성한 keys 타입을 다른 타입에 매핑해서 사용
   */

  type PageInfo = {
    title: string;
  };
  type Page = 'home' | 'about' | 'contact';

  const nav: Record<Page, PageInfo> = {
    home: { title: 'Home' },
    about: { title: 'About' },
    contact: { title: 'Contact' },
  };
}
