export let todos = [
  {
    id: 1,
    sectionName: '해야할 일',
    todos: [
      {
        id: 1,
        title: 'Github 공부하기1',
        content: 'add, commit, push',
        type: 'card',
      },
      {
        id: 2,
        title: 'Github 공부하기2',
        content: 'add, commit, push',
        type: 'card',
      },
      {
        id: 3,
        title: 'Github 공부하기3',
        content: 'add, commit, push',
        type: 'card',
      },
    ],
  },
  {
    id: 2,
    sectionName: '하고 있는 일',
    todos: [],
  },
  {
    id: 3,
    sectionName: '완료한 일',
    todos: [
      {
        id: 12,
        title: 'Github 공부하기1',
        content: 'add, commit, push',
        type: 'card',
      },
    ],
  },
];

export const addSection = (sectionName) => {
  const newTodos = [
    ...todos,
    {
      id: Date.now(),
      sectionName,
      todos: [],
    },
  ];
  todos = newTodos;
};

export const deleteSection = (id) => {
  const newTodos = todos.filter((section) => section.id !== id);
  console.log(newTodos);
  todos = newTodos;
};

export const addTodo = (sectionId, { title, content, type }) => {
  const newTodos = todos.map((section) => {
    if (section.id === sectionId) {
      return {
        ...section,
        todos: [
          ...section.todos,
          {
            id: Date.now(),
            title,
            content,
            type,
          },
        ],
      };
    } else return section;
  });
  todos = newTodos;
};

export const deleteTodo = (todoId) => {
  const newTodos = todos.map((section) => {
    const newTasks = section.todos.filter((todo) => todo.id !== todoId);
    return { ...section, todos: newTasks };
  });
  todos = newTodos;
  return todos;
};

export const alterTodo = (todoId, { title, content }) => {
  const newTodos = todos.map((section) =>
    section.todos.map((todo) => {
      if (todo.id === todoId) {
        return {
          id: todoId,
          title,
          content,
        };
      } else {
        return todo;
      }
    })
  );
  todos = newTodos;
};
