// import React from 'react';
import React, { useState } from "react";
import './App.css';
import './styles/modal.css';

import Accordion from 'components/accordion/Accordion';
import Modal from 'components/modal/Modal';

const pokemon_1 = [
  {
    title: 'フシギダネ',
    detail: 'うまれたときから せなかに しょくぶつの タネが あって すこしずつ おおきく そだつ。'
  },
  {
    title: 'ヒトカゲ',
    detail: 'うまれたときから しっぽに ほのおが ともっている。ほのおが きえたとき その いのちは おわって しまう。'
  },
  {
    title: 'ゼニガメ',
    detail: `<b>ながい</b> くびを こうらのなかに ひっこめるとき いきおいよく みずでっぽうを はっしゃする。<a href="">リンク</a>`
  }
]

function App() {

  function open() {
    console.log('開いた')
  }
  function close() {
    console.log('閉じた')
  }
  
  const [hogeState, sethogeState] = useState({
    expanded: false,
    // domHide: false,
    animationType: "animation",
  });
  function modalToggle() {
    sethogeState({
      ...hogeState,
      expanded: !hogeState.expanded
    })
  }

  
  // const [modalIsOpen, setIsOpen] = React.useState(false);

  // function openModal() {
  //   setIsOpen(true);
  // }

  // function closeModal() {
  //   setIsOpen(false);
  // }


  return (
    <div className="App">
      <Modal id={"modal-1"} {...hogeState} sethogeState={sethogeState}>
        <div className="aaaa">
          <p>モーダル</p>
          <button onClick={modalToggle}>閉じる</button>
          <button onClick={modalToggle}>閉じる</button>
          <button onClick={modalToggle}>閉じる</button>
        </div>
      </Modal>
      {/* <Modal id={"modal-2"} expanded={hogeState.expanded} sethogeState={sethogeState}>
        <p>ああああああああああああああああ</p>
        <button onClick={modalToggle}>閉じる</button>
      </Modal> */}
      <Accordion content={pokemon_1} defaultExpandedPanels={[0]} onOpen={open} onClose={close} />
      <Accordion content={pokemon_1} defaultExpandedPanels={[0,2]} multipleExpanded={false} />
      <button onClick={modalToggle}>モーダル</button>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
