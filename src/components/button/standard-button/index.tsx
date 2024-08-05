/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { ButtonHTMLAttributes, forwardRef } from "react";

import { colors } from "src/styles/colors";

type Props = {
  color?: "primary" | "neutral";
  rounded?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const styles = {
  container: ({
    color,
    rounded,
    disabled,
  }: {
    color: "primary" | "neutral";
    rounded: boolean;
    disabled: boolean | undefined;
  }) => css`
    color: ${colors.neutral0};
    border: none;
    border-radius: 5px;
    background-color: ${{
      primary: colors.primary900,
      neutral: colors.neutral500,
    }[color]};

    ${rounded &&
    css`
      border-radius: 25px;
    `};

    ${disabled &&
    css`
      background-color: ${colors.disabled100};
      color: ${colors.disabled500};
    `};
  `,
};

const StandardButton = forwardRef<HTMLButtonElement, Props>(
  ({ color = "primary", rounded = false, ...props }, ref) => {
    return (
      <button
        css={styles.container({ color, rounded, disabled: props.disabled })}
        {...props}
        ref={ref}
      />
    );
  }
);

export default StandardButton;
