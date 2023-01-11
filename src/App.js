import Modal from './components/Modal.js';
import AddButton from './components/AddButton.js';
import Header from './components/Header.js';
import SectionList from './components/SectionList.js';
import { todos } from './store/todos.js';

export default function App({ $target }) {
  new Header({ $target, title: 'TO-DO LIST' });

  new SectionList({
    $target,
    initialState: todos,
  });

  new Modal($target, 'form');

  new AddButton($target);
}
