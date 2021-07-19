import React, { useState, createContext } from "react";
// import { useDebounceFn } from "../utils/useDebounceFn";


// const hoge = new Set();

type Content = {
  title: string
  detail: string
}
type Contents = Content[]

//accordionStateのインターフェース
export interface InjectedAccordionState {
  expandedPanels?: Set<unknown>;
  defaultExpandedPanels?: number[]
  easing?: string;
  duration?: string;
  notTransition?: boolean;
  multipleExpanded?: boolean;
  checkWindowResize?: number;
  onOpen?: () => void;
  onClose?: () => void;
  content: Contents;
}

// export interface InjectedContext {
//   accordionState: InjectedAccordionState;
//   setAccordionState: (accordionState:InjectedAccordionState) => void;
// }

export const Context = createContext(
  {} as {
    accordionState: InjectedAccordionState,
    setAccordionState: React.Dispatch<React.SetStateAction<InjectedAccordionState>>,
  }
);

// export type GlobalContent = {
//   copy: string
//   setCopy:(c: string) => void
// }
// export const MyGlobalContext = createContext<GlobalContent>({
// copy: 'Hello World', // set a default value
// setCopy: () => {},
// })

const Provider: React.FC = (props) => {

  const [accordionState, setAccordionState] = useState<InjectedAccordionState>({
    expandedPanels: new Set(),
    defaultExpandedPanels: [],
    easing: "ease-out",
    duration: ".3s",
    notTransition: false,
    multipleExpanded: true,
    checkWindowResize: window.innerWidth,
    onOpen: () => {},
    onClose: () => {},
    content: []
  });

  // //パネルの高さを揃えるリサイズイベント
  // const windowResizePanelHeightRecalculation = () => {
  //   setAccordionState((accordionState) => ({
  //     ...accordionState,
  //     checkWindowResize: window.innerWidth,
  //   }));
  // };
  // //リサイズイベントを間引く処理
  // const [onResizeHandler] = useDebounceFn(
  //   windowResizePanelHeightRecalculation,
  //   500
  // );
  // //リサイズイベントを登録
  // const panelHeightRemoveEvent = attachEvent(
  //   window,
  //   "resize",
  //   onResizeHandler.bind(this)
  // );
  // panelHeightRemoveEvent.addEvent()

  return (
    <Context.Provider
      value={{
        accordionState,
        setAccordionState,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default Provider;


// function attachEvent(element, type, listener, options) {
//   return {
//     addEvent() {
//       element.addEventListener(type, listener, options);
//     },
//     removeEvent() {
//       element.removeEventListener(type, listener);
//     },
//   };
// }
