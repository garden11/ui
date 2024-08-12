import {
  ChangeEvent,
  forwardRef,
  InputHTMLAttributes,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import Input from "../input";

import { PixelValue } from "src/types";
import { NumberInputHandle as Handle } from "./types";

type PropsWithValue = { value: string | undefined; defaultValue?: never };

type PropsWithoutValue = { value?: never; defaultValue?: string | undefined };

type PropsDefault = {
  size?: "small" | "medium" | "large";
  status?: "normal" | "warning" | "error";
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  width?: PixelValue;
  height?: PixelValue;
  disabled?: boolean;
} & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "value" | "defaultValue" | "onChange"
>;

type Props = PropsDefault & (PropsWithValue | PropsWithoutValue);

const NumberInput = forwardRef<Handle, Props>((props, ref) => {
  const isControlled = Object.hasOwn(props, "value");

  const displayInputRef = useRef<HTMLInputElement>(null);
  const valueInputRef = useRef<HTMLInputElement | null>(null);

  const [displayValue, setDisplayValue] = useState<string>("");

  useEffect(() => {
    if (isControlled) return;

    const valueInput = valueInputRef.current;

    if (valueInput?.defaultValue) {
      setDisplayValue(toDisplayValue(valueInput.defaultValue));
    } else {
      setDisplayValue("");
    }
  }, []);

  useEffect(() => {
    const valueInput = valueInputRef.current;

    if (!valueInput || !isControlled) return;

    valueInput.value = props.value ?? "";
    valueInput.dispatchEvent(new Event("change", { bubbles: true }));
  }, [props.value]);

  useEffect(() => {
    const valueInput = valueInputRef.current;

    if (!valueInput) return;

    valueInput.addEventListener("change", (event) => {
      props?.onChange?.(event as unknown as ChangeEvent<HTMLInputElement>);

      setDisplayValue(
        toDisplayValue(
          (event as unknown as ChangeEvent<HTMLInputElement>).target.value
        )
      );
    });
  }, []);

  useImperativeHandle(ref, () => {
    return {
      focus() {
        displayInputRef.current?.focus();
      },
      scrollIntoView() {
        displayInputRef.current?.scrollIntoView();
      },
      select() {
        displayInputRef.current?.select();
      },
      get value() {
        return valueInputRef.current?.value;
      },
    };
  }, []);

  const { value, onChange, name, ...restProps } = props;

  return (
    <span>
      <Input
        ref={displayInputRef}
        style={{ textAlign: "right" }}
        value={displayValue}
        {...restProps}
        onChange={(event) => {
          const valueInput = valueInputRef.current;

          if (!valueInput) return;

          let newValue: string = toValue(event.target.value);

          if (event.target.value === "-") {
            newValue = String(0);
          }

          const isNagative = !((newValue.split("-").length - 1) % 2 === 0);

          if (!isNagative) {
            newValue = newValue.replaceAll("-", "");
          } else {
            newValue = "-" + newValue.replaceAll("-", "");
          }

          let absoluteIntegerPart = String(
            Math.abs(Number(newValue.split(".")[0]))
          );

          const decimalPart = newValue.split(".")[1];

          if (
            absoluteIntegerPart.length > 15 ||
            (decimalPart && decimalPart.length > 15)
          ) {
            return;
          }

          if (newValue !== "") {
            newValue =
              (isNagative ? "-" : "") +
              (decimalPart === undefined
                ? absoluteIntegerPart
                : absoluteIntegerPart + "." + decimalPart);
          }

          if (newValue !== "" && isNaN(Number(toValue(newValue)))) {
            return;
          }

          valueInput.value = newValue;
          valueInput.dispatchEvent(new Event("change", { bubbles: true }));
        }}
      />

      <input
        ref={valueInputRef}
        name={name}
        {...(!isControlled && {
          defaultValue:
            props.defaultValue && !isNaN(Number(props.defaultValue))
              ? props.defaultValue
              : undefined,
        })}
        readOnly
        hidden
      />
    </span>
  );
});

const toDisplayValue = (value: string | number): string => {
  return addThousandSeparators(String(value));
};

const toValue = (displayValue: string): string => {
  return removeThousandSeparators(displayValue);
};

const addThousandSeparators = (value: string): string => {
  const isNegative = value[0] === "-";

  const [integerPart, decimalPart] = removeThousandSeparators(value)
    .replace("-", "")
    .split(".");

  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const formattedNumber =
    decimalPart !== undefined
      ? `${formattedInteger}.${decimalPart}`
      : formattedInteger;

  return isNegative ? `-${formattedNumber}` : formattedNumber;
};

const removeThousandSeparators = (value: string): string => {
  return value.replace(/,/g, "");
};

export default NumberInput;
