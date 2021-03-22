{
  // mapped type : 기존의 타입을 이용해 다른 형태의 타입으로 변환

  type Video = {
    title: string;
    author: string;
  };

  // type VideoOptional = {
  //   title?: string;
  //   author?: string;
  // };

  // example 1 : optional타입 변환
  type Optional<T> = { [P in keyof T]?: T[P] }; // for...in
  type VideoOptional = Optional<Video>;
  const video1: VideoOptional = {
    title: 'hello world',
  };

  // type VideoReadOnly = {
  //   readonly title: string;
  //   readonly author: string;
  // };

  // example 2 : readonly 타입 변환
  type ReadOnly<T> = { readonly [P in keyof T]: T[P] };
  type VideoReadOnly = ReadOnly<Video>;
  const video2: VideoReadOnly = {
    title: 'happy ending',
    author: 'me',
  };

  video1.title = 'new title'; // 변경 O
  // video2.title = 'new title'; // 변경 X

  // example 3 : null type 추가 변환
  type Nullable<T> = { [P in keyof T]: T[P] | null };
  const video3: Nullable<Video> = {
    title: 'good bye',
    author: null,
  };

  // example 4 : 타입 상속 변환
  type Proxy<T> = {
    get(): T;
    set(value: T): void;
  };

  type Proxify<T> = {
    [P in keyof T]: Proxy<T[P]>;
  };
}
