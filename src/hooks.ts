/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useRef } from "react";

export const useRender = () => {
  const [isRendered, setIsRendered] = useState(false);

  /**
   * @param duration ms
   */
  const reRender = (duration = 100) => {
    setIsRendered(false);

    setTimeout(() => {
      setIsRendered(true);
    }, duration);
  };

  useEffect(() => {
    setIsRendered(true);
  }, []);

  return { isRendered, reRender };
};

export const useRefPortal = <
  T extends
    | React.ForwardRefExoticComponent<any>
    | (new (props: any) => React.Component<any, object, any>)
    | ((
        props: any,
        context?: any
      ) => React.ReactElement<any, string | React.JSXElementConstructor<any>> | null)
    | keyof JSX.IntrinsicElements
>() => {
  return useRef<React.ElementRef<T>>(null);
};
