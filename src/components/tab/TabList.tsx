import React, {useRef} from 'react'
import { Context } from "./TabContext";


const TabList: React.FC = (props) => {

  const tabListElement = useRef(null)

  const childrenWithProps = React.Children.map(props.children, (child:any, i) => {
    // 各子要素をクローンしつつ index を渡す
    // console.log(i)
    return React.cloneElement(child, { tabItemIndex: i, tabListDOM: tabListElement});
  });

  return (
    <>
      <div className="tab-list" ref={tabListElement}>
        {childrenWithProps}
      </div>
    </>
  );
}

export default TabList;