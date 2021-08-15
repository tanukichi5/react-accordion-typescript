import React from "react";
import Provider, { Context, InjectedTabState } from './TabContext';

const Tab: React.FC<InjectedTabState> = (props) => {
  const childrenWithProps = React.Children.map(props.children, (child:any, i) => {
    // 各子要素をクローンしつつ index を渡す
    // console.log(i)
    return React.cloneElement(child, { panelIndex: i });
  });
  return (
    <Provider>
      <Context.Consumer>
        {(value) => {

          //propsをvalueをマージ
          const overrideOptions = {
            hoge: !(props.hoge === undefined)
              ? props.hoge
              : value.tabState.hoge,
          };
          Object.assign(value.tabState, overrideOptions || {});

          return (
            <>
              <div className="Tab">{childrenWithProps}</div>
              {/* {value.tabState.hoge}
              {props.children} */}
            </>
          )
        }}
      </Context.Consumer>
    </Provider>
  )
}

export default Tab;