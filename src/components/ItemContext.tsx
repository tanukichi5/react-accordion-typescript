
// import React from "react";

// const hoge: React.FC = () => {
//   // const childrenWithProps = React.Children.map(props.children, (child, i) => {
//   //   // 各子要素をクローンしつつ index を渡す
//   //   // console.log(i)
//   //   return React.cloneElement(child, { panelIndex: i });
//   // });

//   return (
//     <>
//     </>
//   );
// };

// export default hoge;

import React, {
  useState,
  createContext,
  useEffect,
  useRef,
  useContext,
} from "react";
import { Context as accordionContext } from "./AccordionContext";

export interface Props {
  panelIndex: number
}

//itemStateのインターフェース
export interface InjectedItemState {
  isExpanded: boolean,
  index: number | null,
  panelDOM: any,
}

//triggerAttributesのインターフェース
interface InjectedTriggerAttributes {
  "aria-expanded": boolean,
  "aria-controls": string | undefined,
}

//panelAttributesのインターフェース
interface InjectedPanelAttributes {
  id: string | undefined,
  "aria-hidden": boolean,
}

//panelAttributesのインターフェース
interface InjectedPanelStyles {
  height: number,
  // visibility: string,
  // boxSizing: string,
  // overflow: string,
  // transition: string,
}

//itemStateの初期値



// export interface InjectedContext {
//   itemState: InjectedItemState;
//   setItemState: (itemState: InjectedItemState) => void,
//   triggerAttributes: InjectedTriggerAttributes;
//   setTriggerAttributes: (triggerAttributes: InjectedTriggerAttributes) => void;
//   panelAttributes: InjectedPanelAttributes;
//   setPanelAttributes: (panelAttributes: InjectedPanelAttributes) => void;
// }

// type Contents = InjectedContext: Object

export const Context = createContext(
  {} as {
  itemState: InjectedItemState,
  setItemState: React.Dispatch<React.SetStateAction<InjectedItemState>>,
  triggerAttributes: InjectedTriggerAttributes,
  setTriggerAttributes: React.Dispatch<React.SetStateAction<InjectedTriggerAttributes>>,
  panelAttributes: InjectedPanelAttributes,
  setPanelAttributes: React.Dispatch<React.SetStateAction<InjectedPanelAttributes>>
  panelStyles: InjectedPanelStyles,
  setPanelStyles: React.Dispatch<React.SetStateAction<InjectedPanelStyles>>
  }
  // setPanelStyles: () => {},
);

let isInitialExpanded: boolean;

export const Provider: React.FC<Props> = (props) => {
  const renderFlgRef = useRef(false);
  const renderFlgRefResize = useRef(false);
  const renderFlgRefRoot = useRef(false);

  const rootContext = useContext(accordionContext);

  //初期化時にパネルを開くかフラグ
  isInitialExpanded = (rootContext.accordionState["defaultExpandedPanels"] === undefined)
    ? false
    : rootContext.accordionState["defaultExpandedPanels"].includes(props.panelIndex);


  //ランダムなIDを生成
  const randomID = Math.random().toString(36).slice(2);


  //アイテムの状態
  const [itemState, setItemState] = useState<InjectedItemState>({
    isExpanded: isInitialExpanded,
    index: props.panelIndex,
    panelDOM: null,
  });

  // console.log(itemState['index'])

  //開閉時のコールバック関数をセット
  const onOpen = rootContext.accordionState["onOpen"];
  const onClose = rootContext.accordionState["onClose"];
  

  //トリガーの状態管理
  const [triggerAttributes, setTriggerAttributes] = useState<InjectedTriggerAttributes>({
    "aria-expanded": itemState["isExpanded"] ? true : false,
    "aria-controls": `accordion-${itemState['index']}-${randomID}`,
  });

  //パネルの状態管理
  const [panelAttributes, setPanelAttributes] = useState<InjectedPanelAttributes>({
    id: `accordion-${itemState['index']}-${randomID}`,
    "aria-hidden": itemState["isExpanded"],
  });

  //パネルのスタイル
  const [panelStyles, setPanelStyles] = useState<InjectedPanelStyles>({
    height: itemState["isExpanded"] ? 100 : 0,
    // visibility: itemState["isExpanded"] ? "visible" : "hidden",
    // boxSizing: "border-box",
    // overflow: "hidden",
    // transition: rootContext.accordionState.notTransition
    //   ? ""
    //   : `height ${rootContext.accordionState.duration} ${rootContext.accordionState.easing}, visibility ${rootContext.accordionState.duration}`,
  });

  //アコーディオンの開閉状態が変更されたら発火
  useEffect(() => {
    // if(!itemState['panelEl']) return
    
    if (renderFlgRef.current) {
      //トリガー
      setTriggerAttributes((triggerAttributes) => ({
        ...triggerAttributes,
        "aria-expanded": itemState["isExpanded"] ? true : false,
      }));

      //パネル
      setPanelAttributes((panelAttributes) => ({
        ...panelAttributes,
        "aria-hidden": itemState["isExpanded"] ? false : true,
      }));
      // setPanelStyles((panelStyles) => ({
      //   ...panelStyles,
      //   height: itemState["isExpanded"]
      //     ? getPanelHeight(itemState.panelDOM)
      //     : 0,
      //   visibility: itemState["isExpanded"] ? "visible" : "hidden",
      // }));

      //開閉時のコールバック関数実行
      // if (itemState["isExpanded"]) {
      //   onOpen(itemState.panelDOM);
      // } else {
      //   onClose(itemState.panelDOM);
      // }

    } else {
      renderFlgRef.current = true;
    }
  }, [itemState["isExpanded"]]);

  return (
    <Context.Provider
      value={{
        itemState,
        setItemState,
        triggerAttributes,
        setTriggerAttributes,
        panelAttributes,
        setPanelAttributes,
        panelStyles,
        setPanelStyles,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

// function getPanelHeight(panel) {
//   if (!panel) return;
//   const panelHeight = panel.children[0].clientHeight;

//   return panelHeight;
// }

