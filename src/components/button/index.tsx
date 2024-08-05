/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { ButtonHTMLAttributes, forwardRef } from "react";

import StandardButton from "./standard-button";
import OutlinedButton from "./outlined-button";

import { PixelValue } from "src/types";

import { spacing } from "src/utils/spacing";
import { toPixelString } from "src/utils/cssConverter";

type PropsDefault = {
  variant?: "standard" | "outlined";
  color?: "primary" | "neutral";
  size?: "small" | "medium" | "large";
  width?: PixelValue;
  height?: PixelValue;
} & ButtonHTMLAttributes<HTMLButtonElement>;

type PropsStandard = {
  variant?: "standard";
  rounded?: boolean;
  selected?: never;
};

type PropsOutlined = {
  variant: "outlined";
  rounded?: never;
  selected?: boolean;
};

type Props = PropsDefault & (PropsStandard | PropsOutlined);

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
    font-family: inherit;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;

    font-size: ${{
      small: "12px",
      medium: "14px",
      large: "20px",
    }[size]};

    ${width
      ? css`
          width: ${toPixelString(width)};
        `
      : css`
          width: fit-content;
          ${{
            small: spacing.padding.x10,
            medium: spacing.padding.x20,
            large: spacing.padding.x20,
          }[size]};
        `};

    ${height
      ? css`
          height: ${toPixelString(height)};
        `
      : css`
          height: fit-content;
          ${{
            small: spacing.padding.y6,
            medium: spacing.padding.y10,
            large: spacing.padding.y10,
          }[size]};
        `}

    :active {
      transform: scale(0.95);
    }
  `,
};

const Button = forwardRef<HTMLButtonElement, Props>(
  (
    { variant = "standard", size = "medium", color = "primary", ...props },
    ref
  ) => {
    if (variant === "outlined") {
      return (
        <OutlinedButton
          css={styles.container({
            width: props.width,
            height: props.height,
            size,
          })}
          color={color}
          {...props}
          ref={ref}
        />
      );
    }

    return (
      <StandardButton
        css={styles.container({
          width: props.width,
          height: props.height,
          size,
        })}
        color={color}
        {...props}
        ref={ref}
      />
    );
  }
);

export default Button;
