import { useEffect, useState } from "react";

function useEventListener(
  targetProp: EventTarget,
  eventName: string,
  handler: Function
) {
  const [target, setTarget] = useState(targetProp);

  useEffect(() => {
    if (targetProp && targetProp !== target) {
      setTarget(targetProp);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetProp]);

  useEffect(() => {
    if (!(target && target.addEventListener)) {
      return;
    }
    const eventListener = (event: Event) => {
      handler(event);
    };

    target.addEventListener(eventName, eventListener);

    return () => {
      target.removeEventListener(eventName, eventListener);
    };
  }, [target, handler, eventName]);
}

export default useEventListener;
