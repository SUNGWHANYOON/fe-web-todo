import Modal from './components/Modal.js';
import Header from './components/Header.js';
import SectionList from './components/SectionList.js';
import { fetchSections } from './util/api.js';

export default function App({ $target }) {
  const fetchData = async () => {
    const todoData = await fetchSections();
    this.setState(todoData);
  };

  this.state = [];

  this.setState = (nextState) => {
    this.state = nextState;
    // header.setState(todos);
    sectionList.setState(this.state);
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

  fetchData();
}
