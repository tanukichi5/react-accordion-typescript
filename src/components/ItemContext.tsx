import React, {
  useState,
  createContext,
  useEffect,
  useRef,
  useContext,
} from "react";
import * as CSS from 'csstype';
import { Context as accordionContext } from "./AccordionContext";

export interface Props {
  panelIndex: number
}

//itemStateのインターフェース
export interface InjectedItemState {
  isExpanded: boolean,
  index: number | null,
  panelDOM: React.RefObject<HTMLInputElement> | null,
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

//panelStylesのインターフェース
interface InjectedPanelStyles {
  height: CSS.Property.Height,
  visibility: CSS.Property.Visibility,
  boxSizing: CSS.Property.BoxSizing,
  overflow: CSS.Property.Overflow,
  transition: CSS.Property.Transition,
}

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
    height: itemState["isExpanded"] ? getPanelHeight(itemState.panelDOM) : 0,
    visibility: itemState["isExpanded"] ? "visible" : "hidden",
    boxSizing: "border-box",
    overflow: "hidden",
    transition: rootContext.accordionState.notTransition
      ? ""
      : `height ${rootContext.accordionState.duration} ${rootContext.accordionState.easing}, visibility ${rootContext.accordionState.duration}`,
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
      setPanelStyles((panelStyles) => ({
        ...panelStyles,
        height: itemState["isExpanded"]
          ? getPanelHeight(itemState.panelDOM)
          : 0,
        visibility: itemState["isExpanded"] ? "visible" : "hidden",
      }));

      //開閉時のコールバック関数実行
      if (itemState["isExpanded"]) {
        if(onOpen != undefined)
        onOpen(itemState.panelDOM);
      } else {
        if(onClose != undefined)
        onClose(itemState.panelDOM);
      }

    } else {
      renderFlgRef.current = true;
    }
  }, [itemState["isExpanded"]]);

  //パネルDOM取得時に高さ調整
  useEffect(() => {
    // console.log('パネルDOM取得')
    setPanelStyles((panelStyles) => ({
      ...panelStyles,
      height: itemState["isExpanded"] ? getPanelHeight(itemState.panelDOM) : 0,
      visibility: itemState["isExpanded"] ? "visible" : "hidden",
    }));
    // console.log(rootContext.accordionState['expandedPanels'].has(itemState.index));
  }, [itemState["panelDOM"]]);

  //multipleExpandedの処理
  //falseは自分以外閉じる
  useEffect(() => {
    if (renderFlgRefRoot.current) {
      if (rootContext.accordionState["expandedPanels"] != undefined)
      if (rootContext.accordionState["expandedPanels"].has(itemState.index)) {
        setItemState((itemState) => ({
          ...itemState,
          isExpanded: true,
        }));
      } else {
        setItemState((itemState) => ({
          ...itemState,
          isExpanded: false,
        }));
      }
    } else {
      renderFlgRefRoot.current = true;
    }

    // console.log(rootContext.accordionState['expandedPanels'].has(itemState.index));
  }, [rootContext.accordionState["expandedPanels"]]);

  //開いているパネルの高さをwindowresize時に調整
  useEffect(() => {
    if (renderFlgRefResize.current) {
      if(itemState["isExpanded"]) {
        setPanelStyles((panelStyles) => ({
          ...panelStyles,
          height: getPanelHeight(itemState.panelDOM)
        }));
      }
    } else {
      renderFlgRefResize.current = true;
    }
  }, [rootContext.accordionState["checkWindowResize"]]);

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

function getPanelHeight(panel:React.RefObject<HTMLInputElement> | null): string {
  if (panel === null) return ""
  // console.log(panel.current.children[0])
  const panelHeight = !(panel.current === null) 
    ? panel.current.children[0].clientHeight
    : ""
  return `${panelHeight}px`;
}

