/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import {
  CSSProperties,
  forwardRef,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
  HTMLAttributes,
} from "react";

import { flex } from "src/utils/flex";

type OptionsDefault = {
  alignItems?: CSSProperties["alignItems"];
  justifyContent?: CSSProperties["justifyContent"];
};

type OptionsWithDirection = OptionsDefault & {
  direction?: "row" | "column";
};

type OptionsWithoutDirection = OptionsDefault & {
  direction?: never;
};

type Options = OptionsWithDirection | OptionsWithoutDirection;

type PropsDefault = {
  wrap?: CSSProperties["flexWrap"];
  rowGap?: CSSProperties["rowGap"];
  columnGap?: CSSProperties["columnGap"];
} & HTMLAttributes<HTMLDivElement>;

type PropsWithOptions<T extends Options> = {
  alignItems?: never;
  justifyContent?: never;
} & (T extends OptionsWithDirection
  ? { direction?: never }
  : { direction?: CSSProperties["flexDirection"] });

type PropsWithoutOptions = {
  alignItems?: CSSProperties["alignItems"];
  justifyContent?: CSSProperties["justifyContent"];
  direction?: CSSProperties["flexDirection"];
};

type Props<T extends Options | undefined> = PropsDefault &
  (T extends Options ? PropsWithOptions<T> : PropsWithoutOptions);

type FlexComponent<T extends Options | undefined = undefined> =
  ForwardRefExoticComponent<
    PropsWithoutRef<Props<T>> & RefAttributes<HTMLDivElement>
  >;

const createFlexComponent = <T extends Options | undefined = undefined>(
  options: T
): FlexComponent<T> =>
  forwardRef<HTMLDivElement, Props<T>>(
    (
      { wrap = "nowrap", rowGap = "normal", columnGap = "normal", ...props },
      ref
    ) => {
      const {
        direction: propsDirection,
        alignItems: propsAlignItems,
        justifyContent: propsJustifyContent,
        ...restProps
      } = props;

      const { direction, alignItems, justifyContent } = {
        direction: propsDirection ?? options?.direction ?? "row",
        alignItems: propsAlignItems ?? options?.alignItems ?? "stretch",
        justifyContent:
          propsJustifyContent ?? options?.justifyContent ?? "flex-start",
      };

      return (
        <div
          css={styles.container({
            direction,
            alignItems,
            justifyContent,
            wrap,
            rowGap,
            columnGap,
          })}
          ref={ref}
          {...restProps}
        />
      );
    }
  );

const styles = {
  container: ({
    direction,
    alignItems,
    justifyContent,
    wrap,
    columnGap,
    rowGap,
  }: {
    direction: CSSProperties["flexDirection"];
    alignItems: CSSProperties["alignItems"];
    justifyContent: CSSProperties["justifyContent"];
    wrap: CSSProperties["flexWrap"];
    rowGap: CSSProperties["rowGap"];
    columnGap: CSSProperties["columnGap"];
  }) => css`
    ${flex.display};
    ${flex.direction(direction)};
    ${flex.alignItems(alignItems)};
    ${flex.justifyContent(justifyContent)};
    ${flex.wrap(wrap)};
    ${flex.columnGap(columnGap)};
    ${flex.rowGap(rowGap)};
  `,
};

type Flex = FlexComponent & {
  Center: FlexComponent<Options>;
  CenterVertical: FlexComponent<Options>;
  CenterHorizontal: FlexComponent<Options>;
};

const Flex: Flex = createFlexComponent(undefined) as Flex;
Flex.Center = createFlexComponent({
  alignItems: "center",
  justifyContent: "center",
});
Flex.CenterVertical = createFlexComponent({
  direction: "row",
  alignItems: "center",
});
Flex.CenterHorizontal = createFlexComponent({
  direction: "column",
  alignItems: "center",
});

export default Flex;
