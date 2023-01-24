import {
  fetchAllData,
  deleteSection,
  addSection,
  addTodo,
  deleteTodo,
  alterTodo,
  moveTodo,
} from '../util/api.js';

let InitState = null;

async function fetchInitData() {
  const res = await fetchAllData();
  InitState = res;
}

fetchInitData();

export const action = {
  GET_DATA: 'GET_DATA',
  ADD_SECTION: 'ADD_SECTION',
  DEL_SECTION: 'DEL_SECTION',
  ALT_SECTION: 'ALT_SECTION',
  ADD_TODO: 'ADD_TODO',
  DEL_TODO: 'DEL_TODO',
  ALT_TODO: 'ALT_TODO',
  MOV_TODO: 'MOV_TODO',
};

function createStore(reducer) {
  let state;
  let handler = [];
  return {
    dispach: async (action) => {
      state = await reducer(state, action);
      handler.forEach((callback) => {
        callback();
      });
    },
    subscribe: (listener) => {
      handler.push(listener);
    },
    getState: () => state,
  };
}

async function reducer(state = InitState, action) {
  switch (action.type) {
    case 'GET_DATA':
      return fetchAllData();
    case 'DEL_SECTION':
      return deleteSection(action.sectionId);
    case 'ADD_SECTION':
      return addSection(action.title);
    case 'DEL_TODO':
      return deleteTodo(action.cardId);
    case 'ADD_TODO':
      return addTodo(action.sectionId);
    case 'ALT_TODO':
      return alterTodo(action.cardId, {
        title: action.title,
        content: action.content,
      });
    case 'MOV_TODO':
      const { fromId, toId, sectionId } = action;
      return moveTodo(fromId, toId, sectionId);
    default:
      return { ...state };
  }
}

export const store = createStore(reducer);
