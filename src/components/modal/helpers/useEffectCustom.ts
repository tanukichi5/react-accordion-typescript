// 絶対に初回走るな
import { useEffect, useRef } from "react";

const useEffectCustom = (func:any, dependencyList:any) => {
  const fisrtFlgRef = useRef(true);

  useEffect(() => {
    if (!fisrtFlgRef.current) {
      func();
    } else {
      fisrtFlgRef.current = false;
    }
  }, dependencyList);
};

export default useEffectCustom;