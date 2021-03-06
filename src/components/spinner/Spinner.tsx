import React, { useEffect, useState } from "react";
import { ReactComponent as IconSpinner } from "assets/icons/spinner.svg";
import classes from "./Spinner.module.scss";

function Spinner({ delay = 250 }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setVisible(true);
    }, delay);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [delay]);

  if (!visible) {
    return null;
  }

  return (
    <IconSpinner role="img" aria-label="spinner" className={classes.icon} />
  );
}

export default Spinner;
