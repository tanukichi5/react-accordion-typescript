import React, {useState, useEffect, useContext} from 'react'
import { Context } from "./TabContext";

interface Props {
  tabPanelIndex?: number
}

const TabPanel: React.FC<Props> = (props) => {

  const tabContext = useContext(Context)

  //パネルの状態
  const [tabPanelState, setTabPanelState] = useState({
    index: props.tabPanelIndex,
    expanded: tabContext.tabState.expandedPanel === props.tabPanelIndex,
  });

  //rootのcontext（expandedPanel）に変更があった場合stateを更新
  useEffect(() => {
    setTabPanelState((tabPanelState) => ({
      ...tabPanelState,
      expanded: tabContext.tabState.expandedPanel === props.tabPanelIndex,
    }));
  }, [tabContext.tabState.expandedPanel]);

  return (
    <div className="tab-panel" aria-hidden={!tabPanelState.expanded} tabIndex={tabPanelState.expanded ? 0 : -1}>
      {/* {tabContext.tabState.hoge} */}
      <p>
          現在開いているパネル : {tabContext.tabState.expandedPanel}
      </p>
    </div>
  );
}

export default TabPanel;