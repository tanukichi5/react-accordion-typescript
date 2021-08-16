import React, {useState, useEffect, useContext} from 'react'
import { Context } from "./TabContext";

interface Props {
  tabPanelIndex?: number,
}

const styles: {[key: string]: React.CSSProperties} = {
  block: {
    display: 'block',
  },
  none: {
    display: 'none',
  }
};

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
    <div 
      id={`tab-${tabContext.tabState.uuid}-${tabPanelState.index}`}
      className="tab-panel" aria-hidden={!tabPanelState.expanded}
      style={tabPanelState.expanded ? styles.block : styles.none}
    >
      {/* {tabContext.tabState.hoge} */}
      {props.children}
      <p>
          現在開いているパネル : {tabContext.tabState.expandedPanel}
      </p>
    </div>
  );
}

export default TabPanel;