export let todos = [
  {
    id: 1,
    sectionName: '해야할 일',
    todos: [
      {
        id: 1,
        title: 'Github 공부하기1',
        content: 'add, commit, push',
      },
      {
        id: 2,
        title: 'Github 공부하기2',
        content: 'add, commit, push',
      },
      {
        id: 3,
        title: 'Github 공부하기3',
        content: 'add, commit, push',
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
  todos = newTodos;
};

export const addTodo = (sectionId, { title, content }) => {
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
            type: 'new',
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
  const newTodos = todos.map((section) => {
    return {
      ...section,
      todos: section.todos.map((todo) => {
        if (todo.id === todoId) {
          return {
            id: todoId,
            title,
            content,
          };
        } else {
          return todo;
        }
      }),
    };
  });
  todos = newTodos;
};

//xport const moveTodo = (sectionId, )

// 추가 : todo, section1, section2
// 이동 : todo, section1, section2
// 삭제 : todo, section
export const noticeData = [];

const addNoticeData = (command, data) => {
  let str = '';
  const { todo, before, after } = data;
  switch (command) {
    case 'add':
      str = `${tooo}를 ${before}로 추가하였습니다`;
      break;
    case 'alter':
      str = `${tooo}를 ${before}에서 ${after}로 이동하였습니다`;
      break;
    case 'delete':
      str = `${tooo}를 ${before}에서 삭제하였습니다`;
      break;
  }

  noticeData.push(str);
};
