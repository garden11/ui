/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";

import { toPixelString } from "src/utils/cssConverter";

type Options = {
  direction: "vertical" | "horizontal";
};

type Props = {
  size: number;
};

type SpacingComponent = (props: Props) => JSX.Element;

const styles = {
  container: ({
    direction,
    size,
  }: {
    direction: "vertical" | "horizontal";
    size: number;
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

const createSpacingComponent = (options: Options): SpacingComponent => {
  return function SpacingComponent(props: Props) {
    const { direction = "horizontal" } = options;

    return <div css={styles.container({ direction, size: props.size })} />;
  };
};

type Spacing = { Vertical: SpacingComponent; Horizontal: SpacingComponent };

const Spacing: Spacing = {
  Vertical: createSpacingComponent({ direction: "vertical" }),
  Horizontal: createSpacingComponent({ direction: "horizontal" }),
};

export default Spacing;
