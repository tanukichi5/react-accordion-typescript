import React, {useState, useEffect, useContext, useCallback, useRef} from 'react'
import { Context } from "./TabContext";

import { attachEvent } from './helpers/attachEvent'
import { moveTab } from './helpers/moveTab'
import useEffectCustom from './helpers/useEffectCustom'

interface Props {
  tabItemIndex?: number
  tabListDOM?: any
}

const TabListItem: React.FC<Props> = (props) => {

  const tabButtonElement = useRef(null)

  const tabContext = useContext(Context)

  //アイテムの状態
  const [tabListItemState, setTabListItemState] = useState({
    index: props.tabItemIndex,
    expanded: tabContext.tabState.expandedPanel === props.tabItemIndex,
  });

  //rootのcontext（expandedPanel）に変更があった場合stateを更新
  useEffect(() => {
   setTabListItemState((tabListItemState) => ({
     ...tabListItemState,
     expanded: tabContext.tabState.expandedPanel === props.tabItemIndex,
   }));
 }, [tabContext.tabState.expandedPanel]);


  //タブをクリックすると自身のindexをrootのcontext（expandedPanel）にセット
  const tabSwitch = () => {
    tabContext.setTabState(tabState => ({
      ...tabState,
      expandedPanel: tabListItemState.index,
      hoge: "aaaaa",
    }));
  }


  //タブボタン上での方向キーイベント
  const onKeydown = useCallback((event) => {
    const tabButtons = [...props.tabListDOM.current.querySelectorAll("button")]
    moveTab(event, tabButtons)
  }, [props.tabListDOM.current]);

  useEffectCustom(() => {
    const handleOnKeydown = attachEvent(
      tabButtonElement.current,
      "keydown",
      onKeydown
    );
  
    handleOnKeydown?.addEvent()

  }, [props.tabListDOM.current]);
  //------------------------------

  return (
    <div className="tab-list__item">
      <button
        type="button" onClick={tabSwitch} ref={tabButtonElement}
        className="tab-button"
        aria-selected={tabListItemState.expanded}
        aria-controls={`tab-${tabContext.tabState.uuid}-${tabListItemState.index}`}
        tabIndex={tabListItemState.expanded ? 0 : -1}
      >
        タブ : {tabListItemState.index}
        
      </button>
      {/* {tabListItemState.index} */}
      {/* {tabContext.tabState.hoge} */}
    </div>
  );
}

export default TabListItem;