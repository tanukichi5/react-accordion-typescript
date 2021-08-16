import React, {useContext} from 'react'
import { Context } from "./TabContext";

interface Props {
  defo?: number
}

const TabContent: React.FC<Props> = (props) => {

  console.log(props.defo )

  const childrenWithProps = React.Children.map(props.children, (child:any, i) => {
    // 各子要素をクローンしつつ index を渡す
    // console.log(i)
    return React.cloneElement(child, { tabPanelIndex: i });
  });

  return (
    <>
      <div className="tab-content">
        {childrenWithProps}
      </div>
    </>
  );
}

export default TabContent;