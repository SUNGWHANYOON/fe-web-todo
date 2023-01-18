import Modal from './components/Modal.js';
import AddButton from './components/AddButton.js';
import Header from './components/Header.js';
import SectionList from './components/SectionList.js';
import { todos } from './store/todos.js';
import { fetchSections } from './util/api.js';

export default function App({ $target }) {
  new Header({ $target, title: 'TO-DO LIST' });

  const modal = new Modal($target, 'prompt');

  new SectionList({
    $target,
    initialState: todos,
    onHandleModal: (callback) => {
      modal.setOnClick(callback);
    },
  });

  new AddButton({
    $target,
    onHandleModal: (callback) => {
      modal.setOnClick(callback);
    },
  });

  const fetchData = async () => {
    console.log(await fetchSections());
  };
  fetchData();
}
