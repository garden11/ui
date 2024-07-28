/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import {
  CSSProperties,
  ComponentPropsWithRef,
  ComponentPropsWithoutRef,
  ReactNode,
  forwardRef,
} from "react";

type Props = {
  children?: ReactNode;
  flex?: CSSProperties["flex"];
  overflow?: CSSProperties["overflow"];
} & ComponentPropsWithoutRef<"div">;

const Item = forwardRef(
  (
    { flex = "auto", overflow = "visible", ...props }: Props,
    ref: ComponentPropsWithRef<"div">["ref"]
  ) => {
    return (
      <div css={styles.container({ flex, overflow })} {...props} ref={ref} />
    );
  }
);

const styles = {
  container: ({
    flex,
    overflow,
  }: {
    flex: CSSProperties["flex"];
    overflow: CSSProperties["overflow"];
  }) => css`
    flex: ${flex};
    overflow: ${overflow};
  `,
};

export default Item;
