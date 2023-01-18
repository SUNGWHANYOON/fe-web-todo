// import { createStore } from 'redux';
// import { deleteSection } from '../util/api';

// const ADD_TODO = 'ADD_TODO';
// const DELETE_SECTION = 'DELETE_SECTION';

// const addTodo = (data) => {
//   // sectionId, { title, content }
//   return { type: ADD_TODO, data };
// };
// const deleteeSection = (id) => {
//   return { type: DELETE_SECTION, id };
// };

// const fetchData = async () => {
//   console.log(await fetchSections());
// };
// const initialState = fetchData;

// function reducer(state = initialState, action) {
//   switch (action.type) {
//     case 'DELETE_SECTION':
//       return {
//         ...state,
//         ...deleteSection(action.id),
//       };
//   }
// }

// export const store = createStore(reducer);
