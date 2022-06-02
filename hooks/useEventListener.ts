import { useRef, useEffect, MutableRefObject } from "react";
import useIsomorphicLayoutEffect from "./useIsomorphicLayoutEffect";

// 限定T，在WindowEventMap || HTMLElementEventMap內
const useEventListener = <
  T extends keyof WindowEventMap & keyof HTMLElementEventMap
>(
  event: T,
  handler: (e: WindowEventMap[T] | HTMLElementEventMap[T] | Event) => void,
  element?: MutableRefObject<HTMLElement>
) => {
  const cbRef = useRef(handler);
  // 不管在ssr||csr都先儲存
  useIsomorphicLayoutEffect(() => {
    cbRef.current = handler;
  }, [handler]);

  // 等dom綁定完成，才執行
  useEffect(() => {
    const ele = element?.current || window;
    //  可能ele是沒有addEventListener的
    if (!(ele && ele?.addEventListener)) return;

    const eventListener: typeof handler = (event) => cbRef.current(event);
    ele.addEventListener(event, eventListener);
    return () => ele.removeEventListener(event, eventListener);
  }, [event, element]);
};

export default useEventListener;
