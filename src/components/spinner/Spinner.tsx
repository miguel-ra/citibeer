import { ForwardedRef, forwardRef, useEffect, useState } from "react";
import { ReactComponent as IconSpinner } from "assets/icons/spinner.svg";
import classes from "./Spinner.module.scss";

type SpinnerProps = {
  visible?: boolean;
  delay?: number;
};

const defaultDelay = 250;

function Spinner(
  { visible: visibleProp, delay }: SpinnerProps = { delay: defaultDelay },
  ref: ForwardedRef<SVGSVGElement>
) {
  const [visible, setVisible] = useState(visibleProp);

  useEffect(() => {
    if (visible) {
      return;
    }
    const timeoutId = setTimeout(() => {
      setVisible(true);
    }, 250);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [delay, visible]);

  if (!visible) {
    return null;
  }

  return (
    <IconSpinner
      ref={ref}
      role="alert"
      aria-busy="true"
      aria-label="spinner"
      aria-hidden="false"
      className={classes.spinner}
    />
  );
}

export default forwardRef(Spinner);
