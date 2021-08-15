import React from "react";
import Provider, { Context, InjectedTabState } from './TabContext';

const Tab: React.FC<InjectedTabState> = (props) => {
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
              {value.tabState.hoge}
            </>
          )
        }}
      </Context.Consumer>
    </Provider>
  )
}

export default Tab;