import React, {useState, useEffect, useContext} from 'react'
import { Context } from "./TabContext";

interface Props {
  tabItemIndex?: number
}

const TabListItem: React.FC<Props> = (props) => {

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

  return (
    <div className="tab-list__item">
      <button
        type="button" onClick={tabSwitch}
        className="tab-button"
        aria-selected={tabListItemState.expanded}
        aria-controls={`tab-${tabContext.tabState.uuid}-${tabListItemState.index}`}>
        タブ : {tabListItemState.index}
      </button>
      {/* {tabListItemState.index} */}
      {/* {tabContext.tabState.hoge} */}
    </div>
  );
}

export default TabListItem;