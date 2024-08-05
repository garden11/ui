/** @jsxImportSource @emotion/react */

import { ReactNode } from "react";
import { cx } from "@emotion/css";
import { css } from "@emotion/react";

import { colors } from "src/styles/colors";

import { PixelValue } from "src/types";

import { toPixelString } from "src/utils/cssConverter";
import { spacing } from "src/utils/spacing";

type Props = {
  width?: PixelValue;
  height?: PixelValue;
  children: ReactNode;
};

const Card = ({ width = "auto", height = "auto", ...props }: Props) => {
  return (
    <div css={styles.container({ width, height })} className={cx({})}>
      {props.children}
    </div>
  );
};

const styles = {
  container: ({
    width,
    height,
  }: {
    width: PixelValue;
    height: PixelValue;
  }) => css`
    width: ${toPixelString(width)};
    height: ${toPixelString(height)};
    box-sizing: border-box;
    background-color: ${colors.neutral0};
    border-radius: 15px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
    ${spacing.padding20};
  `,
};

export default Card;
