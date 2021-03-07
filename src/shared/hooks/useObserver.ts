import { useEffect, useState } from "react";

function useObserver(callback: Function, options: IntersectionObserverInit) {
  const [element, setElement] = useState<Element | null>(null);

  useEffect(() => {
    if (!element) {
      return;
    }
    const observer = new IntersectionObserver((entry) => {
      if (entry[0].isIntersecting) {
        callback();
      }
    }, options);
    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [callback, element, options]);

  return { ref: setElement };
}

export default useObserver;
