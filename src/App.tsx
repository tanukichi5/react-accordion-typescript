// import React from 'react';
import React, { useState } from "react";
import './App.css';
import './styles/modal.css';
import './styles/tab.css';

import { css, keyframes } from '@emotion/react'

import Accordion from 'components/accordion/Accordion';
import Modal from 'components/modal/Modal';
import Tab from 'components/tab/Tab';
import TabList from 'components/tab/TabList';
import TabListItem from 'components/tab/TabListItem';
import TabContent from 'components/tab/TabContent';
import TabPanel from 'components/tab/TabPanel';

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

  const customStyles = {
    container: css`
      height: 100%;
      left: 0;
      overflow: hidden;
      position: fixed;
      top: 0;
      width: 100%;
      z-index: 100;
      opacity: 0;
      visibility: hidden;
      transition: all .6s;
      &[aria-hidden="true"] {
        opacity: 0;
        visibility: hidden;
      }
      &[aria-hidden="false"] {
        opacity: 1;
        visibility: visible;
      }
    `,
    overlay: css`
      position: fixed;
      top: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      background: #ffd3d3;
      opacity: 0.8;
      z-index: 1;
    `,
  }

  
  const [hogeState, sethogeState] = useState({
    // portalTarget: '#root',
    siteContent: '#root',
    expanded: false,
    // backFixed: false,
    // domHide: false,
    clickOutsideClose: true,
    // animationType: "transition",
    // customStyles: customStyles,
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

      <div className="l-content">
        <Tab hoge={"タブ"} expandedPanel={1}>

          <TabList>
            <TabListItem />
            <TabListItem />
            <TabListItem />
          </TabList>

          <TabContent>
            <TabPanel>
              パネル1の内容です。
            </TabPanel>
            <TabPanel>
              サンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキスト
            </TabPanel>
            <TabPanel>
              ああああああああああああああああ
            </TabPanel>
          </TabContent>
          
        </Tab>

        <br />

        <Tab hoge={"タブ"}>

          <TabList>
            <TabListItem />
            <TabListItem />
          </TabList>

          <TabContent>
            <TabPanel />
            <TabPanel />
          </TabContent>
          
        </Tab>
      </div>
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
