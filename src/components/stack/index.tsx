/** @jsxImportSource @emotion/react */

import {
  CSSProperties,
  forwardRef,
  ForwardRefExoticComponent,
  HTMLAttributes,
  PropsWithoutRef,
  RefAttributes,
} from "react";
import { css } from "@emotion/react";

import Flex from "../flex";
import Item from "./item";

import { gutter } from "src/utils/gutter";

type Options = {
  direction: "vertical" | "horizontal";
};

type Props = {
  alignItems?: CSSProperties["alignItems"];
  justifyContent?: CSSProperties["justifyContent"];
  selector?: string;
  spacing?: number;
} & HTMLAttributes<HTMLDivElement>;

type StackComponent = ForwardRefExoticComponent<
  PropsWithoutRef<Props> & RefAttributes<HTMLDivElement>
>;

const createStackComponent = (options: Options): StackComponent =>
  forwardRef(
    (
      { alignItems = "stretch", justifyContent = "flex-start", ...props },
      ref
    ) => {
      const { direction = "horizontal" } = options;

      const {
        spacing: propsSpacing,
        selector: propsSelector,
        ...restProps
      } = props;

      return (
        <Flex
          css={styles.container({
            direction,
            spacing: propsSpacing,
            selector: propsSelector,
          })}
          ref={ref}
          direction={direction === "vertical" ? "column" : "row"}
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
    spacing: number | undefined;
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

type Stack = {
  Vertical: StackComponent & { Item: typeof Item };
  Horizontal: StackComponent & { Item: typeof Item };
};

const Stack: Stack = {} as Stack;
Stack.Vertical = createStackComponent({
  direction: "vertical",
}) as Stack["Vertical"];
Stack.Vertical.Item = Item;

Stack.Horizontal = createStackComponent({
  direction: "horizontal",
}) as Stack["Horizontal"];
Stack.Horizontal.Item = Item;

export default Stack;
