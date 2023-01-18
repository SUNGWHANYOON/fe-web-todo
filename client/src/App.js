import Modal from './components/Modal.js';
import AddButton from './components/AddButton.js';
import Header from './components/Header.js';
import SectionList from './components/SectionList.js';
import { todos } from './store/todos.js';
import { fetchSections } from './util/api.js';

export default function App({ $target }) {
  new Header({ $target, title: 'TO-DO LIST' });

  const sectionList = new SectionList({
    $target,
    initialState: todos,
    onHandleModal: (type) => {
      modal.onHandleDisplay(type);
    },
  });

  const modal = new Modal({
    $target,
    callback: (title) => {
      sectionList.onAddSection(title);
    },
  });

  const fetchData = async () => {
    console.log(await fetchSections());
  };
  fetchData();
}
