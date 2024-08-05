/** @jsxImportSource @emotion/react */

import { CSSProperties, forwardRef, HTMLAttributes } from "react";
import { css } from "@emotion/react";

import Flex from "../flex";
import Item from "./item";

import { PixelValue } from "src/types";

import { gutter } from "src/utils/gutter";

type Props = {
  direction: "vertical" | "horizontal";
  alignItems?: CSSProperties["alignItems"];
  justifyContent?: CSSProperties["justifyContent"];
  selector?: string;
  spacing?: PixelValue;
} & HTMLAttributes<HTMLDivElement>;

const StackComponent = forwardRef<HTMLDivElement, Props>(
  (
    { alignItems = "stretch", justifyContent = "flex-start", ...props }: Props,
    ref
  ) => {
    const {
      direction: propsDirection,
      spacing: propsSpacing,
      selector: propsSelector,
      ...restProps
    } = props;

    return (
      <Flex
        css={styles.container({
          direction: propsDirection,
          spacing: propsSpacing,
          selector: propsSelector,
        })}
        ref={ref}
        direction={propsDirection === "vertical" ? "column" : "row"}
        alignItems={alignItems}
        justifyContent={justifyContent}
        {...restProps}
      />
    );
  }
);

const styles = {
  container: ({
    direction,
    spacing,
    selector,
  }: {
    direction: "vertical" | "horizontal";
    spacing: PixelValue | undefined;
    selector: string | undefined;
  }) => css`
    ${spacing &&
    direction === "vertical" &&
    gutter.vertical(spacing, selector)};

    ${spacing &&
    direction === "horizontal" &&
    gutter.horizontal(spacing, selector)};
  `,
};

type Stack = typeof StackComponent & { Item: typeof Item };

const Stack: Stack = StackComponent as Stack;
Stack.Item = Item;

export default Stack;
