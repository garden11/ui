/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";

import { PixelValue } from "src/types";

import { toPixelString } from "src/utils/cssConverter";

type Props = {
  direction: "vertical" | "horizontal";
  size: PixelValue;
};

const Spacing = (props: Props) => {
  return (
    <div
      css={styles.container({ direction: props.direction, size: props.size })}
    />
  );
};

const styles = {
  container: ({
    direction,
    size,
  }: {
    direction: "vertical" | "horizontal";
    size: PixelValue;
  }) => css`
    ${direction === "horizontal" &&
    css`
      width: ${toPixelString(size)};
    `};

    ${direction === "vertical" &&
    css`
      height: ${toPixelString(size)};
    `};
  `,
};

export default Spacing;
