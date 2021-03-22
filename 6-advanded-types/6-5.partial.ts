{
  /**
   * Partial<Type>
   * 기존의 모든 타입을 optional로 변경해서 새로운 타입 생성
   * 기존의 타입에서 부분적인 것만 사용하고자 할 때
   */

  type ToDo = {
    title: string;
    description: string;
    label: string;
    priority: 'high' | 'low';
  };

  function updateTodo(todo: ToDo, fieldsToUpdate: Partial<ToDo>): ToDo {
    return { ...todo, ...fieldsToUpdate };
  }

  const todo: ToDo = {
    title: 'Learn Typescript',
    description: "with Ellie's dream coding",
    label: 'study',
    priority: 'high',
  };

  const updated = updateTodo(todo, { priority: 'low' });

  console.log(updated);
}
