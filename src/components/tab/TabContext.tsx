import React, { useState, createContext } from "react";
import uuid from "./helpers/uuid";

//デフォルトprops
interface Props {
  defaultExpandedPanel?: number,
}

//tabStateのインターフェース
export interface InjectedTabState {
  hoge?: string;
  uuid?: string;
  expandedPanel?: number;
}

//createContextでcontextを作成
export const Context = createContext(
  {} as {
    tabState: InjectedTabState,
    setTabState: React.Dispatch<React.SetStateAction<InjectedTabState>>,
  }
);


const Provider: React.FC<Props> = (props) => {
  // const abc = uuid()

  //useStateでstateを作成
  const [tabState, setTabState] = useState<InjectedTabState>({
    hoge: "ほげ",
    uuid: uuid(),
    expandedPanel: props.defaultExpandedPanel ? props.defaultExpandedPanel : 0,
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