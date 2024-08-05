/** @jsxImportSource @emotion/react */

import { cx } from "@emotion/css";
import { css } from "@emotion/react";
import { forwardRef, InputHTMLAttributes, useState } from "react";

import { colors } from "src/styles/colors";

import { PixelValue } from "src/types";

import { toPixelString } from "src/utils/cssConverter";
import { spacing } from "src/utils/spacing";

type Props = {
  width?: PixelValue;
  height?: PixelValue;
  size?: "small" | "medium" | "large";
  status?: "normal" | "error" | "warning";
  disabled?: boolean;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "size">;

const Input = forwardRef<HTMLInputElement, Props>(
  ({ size = "medium", ...props }, ref) => {
    const [isFocused, setIsFocused] = useState<boolean>(false);

    const { onFocus, onBlur, ...restProps } = props;

    return (
      <span
        css={styles.container({
          width: props.width,
          height: props.height,
          size,
        })}
        className={cx({
          disabled: props.disabled,
          error: props.status === "error",
          warning: props.status === "warning",
          focused: isFocused,
        })}
      >
        <input
          onFocus={(event) => {
            onFocus?.(event);

            setIsFocused(true);
          }}
          onBlur={(event) => {
            onBlur?.(event);

            setIsFocused(false);
          }}
          ref={ref}
          {...restProps}
        />
      </span>
    );
  }
);

const styles = {
  container: ({
    width,
    height,
    size,
  }: {
    width: PixelValue | undefined;
    height: PixelValue | undefined;
    size: "small" | "medium" | "large";
  }) => css`
    display: inline-block;

    ${height
      ? css`
          height: ${toPixelString(height)};

          > input {
            height: 100%;
          }
        `
      : css`
          height: fit-content;

          > input {
            ${{
              small: spacing.padding.y6,
              medium: spacing.padding.y10,
              large: spacing.padding.y10,
            }[size]};
          }
        `};

    ${width
      ? css`
          width: ${toPixelString(width)};

          > input {
            width: 100%;
          }
        `
      : css`
          width: fit-content;

          > input {
            ${{
              small: spacing.padding.x10,
              medium: spacing.padding.x20,
              large: spacing.padding.x20,
            }[size]};
          }
        `};

    font-size: ${{
      small: "12px",
      medium: "14px",
      large: "20px",
    }[size]};

    box-sizing: border-box;
    border: 1px solid ${colors.neutral500};
    border-radius: 5px;

    &.focused {
      border-color: ${colors.info500};
    }

    &.warning {
      border-color: ${colors.warning500};
    }

    &.error {
      border-color: ${colors.error500};
    }

    &.disabled {
      border-color: ${colors.disabled500};
    }

    > input {
      box-sizing: border-box;
      font-size: inherit;
      border: none;
      outline: none;
      background-color: transparent;
    }
  `,
};

export default Input;
