import useEventListener from "./useEventListener";
import { useRef, useEffect, MutableRefObject } from "react";

const useClickOutside = <T extends "mousedown" | "mouseup" = "mousedown">(
  handler: (e: WindowEventMap[T] | HTMLElementEventMap[T] | Event) => void,
  mouseEvent: T,
  element: MutableRefObject<HTMLElement>
) => {
  useEventListener(mouseEvent, (e) => {
    const el = element.current;
    console.log(el, e.target);
    if (!el || el.contains(e.target as Node)) return;
    handler(e);
  });
};

export default useClickOutside;
