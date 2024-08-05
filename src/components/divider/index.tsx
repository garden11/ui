/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";

import { colors } from "src/styles/colors";

import { PixelValue } from "src/types";

import { toPixelString } from "src/utils/cssConverter";

type Props = { size?: PixelValue; variant?: "vertical" | "horizontal" };

const Divider = ({
  size = "100%",
  variant = "horizontal",
  ...props
}: Props) => {
  return <div css={styles.container({ variant, size })} />;
};

const styles = {
  container: ({
    variant,
    size,
  }: {
    variant: "vertical" | "horizontal";
    size: PixelValue;
  }) => css`
    border: 1px solid ${colors.neutral900};

    ${variant === "horizontal" &&
    css`
      width: ${toPixelString(size)};
    `};

    ${variant === "vertical" &&
    css`
      width: fit-content;
      height: ${toPixelString(size)};
    `};
  `,
};

export default Divider;
