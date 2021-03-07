import { useEffect, useState } from "react";

const defaultOptions = { rootMargin: "200px" };

function useObserver(
  callback: Function,
  options: IntersectionObserverInit = defaultOptions
) {
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
