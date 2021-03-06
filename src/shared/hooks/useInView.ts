import { useEffect, useState } from "react";

function useInView(
  callback: Function,
  options: IntersectionObserverInit = { rootMargin: "200px" }
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

    return () => observer.unobserve(element);
  }, [element, callback, options]);

  return { ref: setElement };
}

export default useInView;
