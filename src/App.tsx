// import React from 'react';
import logo from './logo.svg';
import './App.css';

import Accordion from 'components/Accordion';

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
  return (
    <div className="App">
      <Accordion content={pokemon_1} defaultExpandedPanels={[0]} />
      <header className="App-header">
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
      </header>
    </div>
  );
}

export default App;
