/** @jsxImportSource @emotion/react */

import { InputHTMLAttributes, forwardRef, useState } from "react";
import { css } from "@emotion/react";
import { cx } from "@emotion/css";

import { colors } from "src/styles/colors";

import { PixelValue } from "src/types";

import { toPixelString } from "src/utils/cssConverter";
import { spacing } from "src/utils/spacing";

type Props = {
  width?: PixelValue;
  height?: PixelValue;
  size?: "small" | "medium" | "large";
  label?: string;
  status?: "normal" | "error" | "warning";
} & Omit<InputHTMLAttributes<HTMLInputElement>, "placeholder" | "size">;

const TextField = forwardRef<HTMLInputElement, Props>(
  ({ size = "medium", ...props }, ref) => {
    const [isFocused, setIsFocused] = useState<boolean>(false);

    const { label, width, height, ...restProps } = props;

    return (
      <span
        css={styles.container({ width, height, size })}
        className={cx({
          error: props.status === "error",
          warning: props.status === "warning",
          disabled: props.disabled,
          focused: isFocused,
        })}
      >
        <input
          ref={ref}
          placeholder=""
          onFocus={(event) => {
            props.onFocus?.(event);

            setIsFocused(true);
          }}
          onBlur={(event) => {
            props.onBlur?.(event);

            setIsFocused(false);
          }}
          {...restProps}
        />
        {props.label && <label>{props.label}</label>}
      </span>
    );
  }
);

export default TextField;

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
    position: relative;

    ${height
      ? css`
          height: ${toPixelString(height)};

          > input {
            height: 100%;
          }
        `
      : css`
          height: fit-content;
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
        `};

    box-sizing: border-box;
    border: 1px solid ${colors.neutral500};
    border-radius: 25px;

    ${{
      small: css`
        font-size: 12px;

        > input {
          ${spacing.padding.y6};
        }
      `,
      medium: css`
        font-size: 14px;

        > input {
          ${spacing.padding.y10};
        }
      `,
      large: css`
        font-size: 20px;

        > input {
          font-size: 20px;
          ${spacing.padding.y10};
        }
      `,
    }[size]}

    > label {
      position: absolute;
      top: 50%;
      left: 20px;
      color: ${colors.neutral500};
      font-size: inherit;
      font-weight: 400;
      pointer-events: none;
      transform: translateY(-50%);
      transition: all 0.3s ease;
    }

    > input {
      box-sizing: border-box;
      ${spacing.padding.x20};
      font-size: inherit;
      outline: none;
      border: none;
      transition: all 0.3s ease;
      background-color: transparent;
    }

    &.focused {
      border-color: ${colors.info500};

      > label {
        color: ${colors.info500};
      }
    }

    &.warning {
      border-color: ${colors.warning500};

      > label {
        color: ${colors.warning500};
      }
    }

    &.error {
      border-color: ${colors.error500};

      > label {
        color: ${colors.error500};
      }
    }

    &.disabled {
      border-color: ${colors.disabled500};

      > label {
        color: ${colors.disabled500};
      }
    }

    &.focused > label,
    > input:not(:placeholder-shown) ~ label {
      top: 0%;
      font-size: ${{ small: "10px", medium: "12px", large: "18px" }[size]};
      background: ${colors.neutral0};
      transform: translateY(-50%);
    }
  `,
};
