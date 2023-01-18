import Modal from './components/Modal.js';
import AddButton from './components/AddButton.js';
import Header from './components/Header.js';
import SectionList from './components/SectionList.js';
import { todos } from './store/todos.js';
import { fetchSections } from './util/api.js';

export default function App({ $target }) {
  this.state = todos;

  this.setState = (nextState) => {
    this.state = nextState;

    // header.setState(todos);
    sectionList.setState(todos);
  };

  const header = new Header({ $target, title: 'TO-DO LIST' });

  const sectionList = new SectionList({
    $target,
    initialState: this.state,
    onHandleModal: (type, cardId) => {
      modal.onHandleDisplay(type, cardId);
    },
  });

  const modal = new Modal({
    $target,
    setAppState: (todos) => {
      this.setState(todos);
    },
  });

  // const fetchData = async () => {
  //   console.log(await fetchSections());
  // };
  // fetchData();
}
