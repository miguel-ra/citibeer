import {
  ChangeEvent,
  InputHTMLAttributes,
  ReactNode,
  useEffect,
  useState,
} from "react";
import clsx from "clsx";
import classes from "./Field.module.scss";

type SelectFieldProps = {
  label: string;
  name: string;
  onChange?: (value: string) => void;
  children: ReactNode;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "name" | "onChange" | "type">;

function SelectField({
  label,
  name,
  value: valueProp,
  className,
  onChange,
  children,
}: SelectFieldProps) {
  const [internalValue, setInternalValue] = useState(valueProp || "");

  useEffect(() => {
    if (valueProp !== internalValue) {
      setInternalValue(valueProp || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueProp]);

  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    const { value } = event.target;
    setInternalValue(value);
    window.requestAnimationFrame(() => {
      onChange?.(value);
    });
  }

  return (
    <div className={classes.wrapper}>
      <label htmlFor={name} className={classes.label}>
        {label}
      </label>
      <select
        id={name}
        name={name}
        className={clsx(classes.input, className)}
        value={onChange ? internalValue : undefined}
        onChange={onChange ? handleChange : undefined}
      >
        {children}
      </select>
    </div>
  );
}

export default SelectField;
