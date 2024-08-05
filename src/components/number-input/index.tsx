import {
  ChangeEvent,
  forwardRef,
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";

import Input from "../input";

import { PixelValue } from "src/types";

type PropsWithValue = { value: string; defaultValue?: never };

type PropsWithoutValue = { value?: never; defaultValue?: string };

type PropsDefault = {
  size?: "small" | "medium" | "large";
  status?: "normal" | "warning" | "error";
  onChange?: (value: string) => void;
  width?: PixelValue;
  height?: PixelValue;
  disabled?: boolean;
} & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "value" | "defaultValue" | "onChange"
>;

type Props = PropsDefault & (PropsWithValue | PropsWithoutValue);

const NumberInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const isControlled = Object.hasOwn(props, "value");

  const inputRef = useRef<HTMLInputElement | null>(null);

  const initialDisplayValue: string = (() => {
    if (isControlled) {
      if (!props.value) return "";

      return isNaN(Number(props.value)) ? "" : toDisplayValue(props.value);
    } else {
      if (!props.defaultValue) return "";

      return isNaN(Number(props.defaultValue))
        ? ""
        : toDisplayValue(props.defaultValue as string);
    }
  })();

  const [displayValue, setDisplayValue] = useState<string>(initialDisplayValue);

  useEffect(() => {
    if (isControlled) return;

    const input = inputRef.current;

    if (displayValue !== undefined && input) {
      input.value = toValue(displayValue);
      input.dispatchEvent(new Event("change", { bubbles: true }));
    }
  }, [displayValue]);

  useEffect(() => {
    if (!isControlled) return;

    props.onChange?.(toValue(displayValue));
  }, [displayValue]);

  useEffect(() => {
    isControlled &&
      setDisplayValue(props.value ? toDisplayValue(props.value) : "");
  }, [props.value]);

  useEffect(() => {
    const input = inputRef.current;

    if (isControlled || !input) return;

    input.addEventListener("change", (event) =>
      props?.onChange?.(
        (event as unknown as ChangeEvent<HTMLInputElement>).target.value
      )
    );
  }, []);

  const {
    width,
    height,
    size,
    status,
    value,
    placeholder,
    onChange,
    readOnly,
    hidden,
    disabled,
    ...restProps
  } = props;

  return (
    <span>
      <Input
        style={{ textAlign: "right" }}
        placeholder={placeholder}
        value={displayValue}
        size={size}
        status={status}
        width={width}
        height={height}
        readOnly={readOnly}
        hidden={hidden}
        disabled={disabled}
        onChange={(event) => {
          let newValue: string = toValue(event.target.value);

          const isNagative = !((newValue.split("-").length - 1) % 2 === 0);

          if (newValue === "" || newValue === "-") {
            return setDisplayValue("");
          }

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

          newValue =
            (isNagative ? "-" : "") +
            (decimalPart === undefined
              ? absoluteIntegerPart
              : absoluteIntegerPart + "." + decimalPart);

          if (isNaN(Number(toValue(newValue)))) {
            return;
          }

          setDisplayValue(toDisplayValue(newValue));
        }}
      />

      {!isControlled && (
        <input
          ref={(node) => {
            inputRef.current = node;

            if (typeof ref === "function") {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
          }}
          {...restProps}
          readOnly
          hidden
        />
      )}
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
