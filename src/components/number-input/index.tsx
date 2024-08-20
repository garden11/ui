import {
  ChangeEvent,
  forwardRef,
  InputHTMLAttributes,
  useCallback,
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
  onChange?: (value: string) => void;
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

  const initialValue = (() => {
    if (isControlled) {
      return props.value && isValidValue(props.value) ? props.value : "";
    } else {
      return props.defaultValue && isValidValue(props.defaultValue)
        ? props.defaultValue
        : "";
    }
  })();

  const inputRef = useRef<HTMLInputElement>(null);
  const valueRef = useRef<string>(initialValue);

  const [displayValue, setDisplayValue] = useState<string>(
    toDisplayValue(initialValue)
  );

  useEffect(() => {
    if (!isControlled) return;

    const newValue = props.value ?? "";

    if (!isValidValue(newValue)) return;

    valueRef.current = newValue;
    setDisplayValue(toDisplayValue(newValue));
  }, [props.value]);

  useImperativeHandle(ref, () => {
    return {
      get value() {
        return valueRef.current;
      },
      set value(value: string | undefined) {
        const newValue = value ?? "";

        if (!isValidValue(newValue)) return;

        valueRef.current = newValue;

        if (isControlled) {
          setDisplayValue(toDisplayValue(newValue));
        } else {
          if (!inputRef.current) return;

          inputRef.current.value = toDisplayValue(newValue);
        }
      },
      focus() {
        inputRef.current?.focus();
      },
      scrollIntoView() {
        inputRef.current?.scrollIntoView();
      },
      select() {
        inputRef.current?.select();
      },
    };
  }, []);

  const handleChangeDisplayInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      let newValue: string = toValue(event.target.value);

      if (event.target.value === "-") {
        newValue = String(0);
      }

      if (newValue !== "") {
        const isNagative = !((newValue.split("-").length - 1) % 2 === 0);

        if (!isNagative) {
          newValue = newValue.replaceAll("-", "");
        } else {
          newValue = "-" + newValue.replaceAll("-", "");
        }

        const [integerPart, decimalPart] = newValue.split(".");
        const absoluteIntegerPart = Math.abs(Number(integerPart));

        newValue =
          (isNagative ? "-" : "") +
          (decimalPart === undefined
            ? `${absoluteIntegerPart}`
            : `${absoluteIntegerPart}` + "." + decimalPart);
      }

      if (!isValidValue(newValue)) {
        return;
      }

      if (isControlled) {
        setDisplayValue(toDisplayValue(newValue));
      } else {
        if (!inputRef.current) return;

        inputRef.current.value = toDisplayValue(newValue);
      }

      valueRef.current = newValue;

      props.onChange?.(newValue);
    },
    []
  );

  const { value, onChange, defaultValue, ...restProps } = props;

  return (
    <Input
      ref={inputRef}
      textAlign="right"
      {...(isControlled
        ? { value: displayValue }
        : {
            defaultValue: toDisplayValue(initialValue),
          })}
      onChange={handleChangeDisplayInput}
      {...restProps}
    />
  );
});

const toDisplayValue = (value: string | number): string => {
  return addThousandSeparators(String(value));
};

const toValue = (displayValue: string): string => {
  return removeThousandSeparators(displayValue);
};

const isValidValue = (value: string): boolean => {
  if (value === "") {
    return true;
  }

  const [integerPart, decimalPart] = value.split(".");

  if (
    integerPart.replace("-", "").length > 15 ||
    (decimalPart && decimalPart.length > 15)
  ) {
    return false;
  }

  if (isNaN(Number(value))) {
    return false;
  }

  return true;
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

export * from "./types";
