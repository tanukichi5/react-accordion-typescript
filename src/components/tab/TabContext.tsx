import React, { useState, createContext } from "react";

//tabStateのインターフェース
export interface InjectedTabState {
  hoge?: string;
  expandedPanel?: number;
}

//createContextでcontextを作成
export const Context = createContext(
  {} as {
    tabState: InjectedTabState,
    setTabState: React.Dispatch<React.SetStateAction<InjectedTabState>>,
  }
);


const Provider: React.FC = (props) => {

  //useStateでstateを作成
  const [tabState, setTabState] = useState<InjectedTabState>({
    hoge: "ほげ",
    expandedPanel: 0,
  });


  return (
    //contextのProviderコンポーネントを使う
    <Context.Provider
      //valueはContext.Consumerコンポーネント内で使用可能になる
      value={{
        tabState,
        setTabState,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default Provider;