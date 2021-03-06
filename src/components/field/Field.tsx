import clsx from "clsx";
import { InputHTMLAttributes, useCallback, useEffect, useState } from "react";
import classes from "./Field.module.scss";

type FieldProps = {
  label: string;
  name: string;
  pattern?: RegExp;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "pattern" | "name">;

function Field({
  label,
  name,
  value: valueProp = "",
  pattern,
  className,
  onChange,
  ...props
}: FieldProps) {
  const [internalValue, setInternalValue] = useState(valueProp);

  useEffect(() => {
    if (valueProp !== internalValue) {
      setInternalValue(valueProp);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueProp]);

  const handleChange = useCallback(
    (event) => {
      const { value } = event.target;
      if (pattern) {
        const regex = new RegExp(pattern);
        if (!regex.test(value)) {
          return;
        }
      }
      setInternalValue(value);
    },
    [pattern]
  );

  return (
    <div className={classes.wrapper}>
      <label htmlFor={name} className={classes.label}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        value={internalValue}
        onChange={handleChange}
        className={clsx(classes.input, className)}
        {...props}
      />
    </div>
  );
}

export default Field;
