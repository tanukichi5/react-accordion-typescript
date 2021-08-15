import React, {useContext} from 'react'
import { Context } from "./TabContext";

// interface Props {
//   panelIndex?: number
// }

const TabList: React.FC = (props) => {

  const childrenWithProps = React.Children.map(props.children, (child:any, i) => {
    // 各子要素をクローンしつつ index を渡す
    // console.log(i)
    return React.cloneElement(child, { tabItemIndex: i });
  });

  return (
    <>
      <div className="tab-list">
        {childrenWithProps}
      </div>
    </>
  );
}

export default TabList;