import Modal from './components/Modal.js';
import Header from './components/Header.js';
import SectionList from './components/SectionList.js';
import { fetchAllData, fetchSections } from './util/api.js';
import { store } from './store/index.js';

export default function App({ $target }) {
  store.subscribe(() => {
    console.log('상태 업데이트시 실행됩ㄴ다');
    this.setState(store.getState());
  });
  store.dispach({ type: 'GET_DATA' });

  this.state = {
    user: '',
    data: [],
    log: [],
  };

  this.setState = (nextState) => {
    this.state = nextState;

    header.setState(this.state.log);
    sectionList.setState(this.state.data);
  };

  const header = new Header({
    $target,
    initialState: this.state.log,
    title: 'TO-DO LIST',
  });

  const sectionList = new SectionList({
    $target,
    initialState: this.state.data,
    onHandleModal: (type, cardId) => {
      modal.onHandleDisplay(type, cardId);
    },
  });

  const modal = new Modal({
    $target,
  });
}
