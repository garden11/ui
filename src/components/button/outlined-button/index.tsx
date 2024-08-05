/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { ButtonHTMLAttributes, forwardRef } from "react";

import { colors } from "src/styles/colors";

type Props = {
  color?: "primary" | "neutral";
  selected?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const styles = {
  container: ({
    color,
    selected,
    disabled,
  }: {
    color: "primary" | "neutral";
    selected: boolean;
    disabled: boolean | undefined;
  }) => css`
    box-sizing: border-box;
    color: ${{
      primary: colors.primary900,
      neutral: colors.neutral500,
    }[color]};
    background-color: ${colors.neutral0};
    border-width: 1px;
    border-style: solid;
    border-color: ${{
      primary: colors.primary900,
      neutral: colors.neutral500,
    }[color]};
    border-radius: 5px;

    ${disabled &&
    css`
      color: ${colors.disabled500};
      border-color: ${colors.disabled500};
      background-color: ${colors.disabled100};
    `}

    ${selected &&
    css`
      color: ${colors.neutral0};
      background-color: ${colors.primary900};
    `}
  `,
};

const OutlinedButton = forwardRef<HTMLButtonElement, Props>(
  ({ color = "primary", selected = false, ...props }, ref) => {
    return (
      <button
        css={styles.container({ color, selected, disabled: props.disabled })}
        {...props}
        ref={ref}
      />
    );
  }
);

export default OutlinedButton;
