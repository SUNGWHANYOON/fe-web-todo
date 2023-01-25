import Modal from "./components/Modal.js";
import Header from "./components/Header.js";
import SectionList from "./components/SectionList.js";
import { store } from "./store/index.js";

export default function App({ $target }) {
  store.subscribe(() => {
    this.setState(store.getState());
  });
  store.dispatch({ type: "GET_DATA" });

  this.state = {
    user: "",
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
    title: "TO-DO LIST",
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
