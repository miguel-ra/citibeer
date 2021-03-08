import { ChangeEvent, InputHTMLAttributes, useEffect, useState } from "react";
import clsx from "clsx";
import classes from "./CheckboxField.module.scss";

type CheckboxFieldProps = {
  label: string;
  name: string;
  onChange?: (value: boolean) => void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "name" | "onChange" | "type">;

function CheckboxField({
  label,
  name,
  checked: checkedProp,
  className,
  onChange,
  ...props
}: CheckboxFieldProps) {
  const [internalValue, setInternalValue] = useState(checkedProp || false);

  useEffect(() => {
    if (checkedProp !== internalValue) {
      setInternalValue(checkedProp || false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkedProp]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { checked } = event.target;
    setInternalValue(checked);
    window.requestAnimationFrame(() => {
      onChange?.(checked);
    });
  }

  return (
    <div className={classes.wrapper}>
      <input
        id={name}
        name={name}
        type="checkbox"
        checked={onChange ? internalValue : undefined}
        onChange={onChange ? handleChange : undefined}
        className={clsx(classes.input, className)}
        {...props}
      />
      <label htmlFor={name} className={classes.label}>
        {label}
      </label>
    </div>
  );
}

export default CheckboxField;
