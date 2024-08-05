/** @jsxImportSource @emotion/react */

import { cx } from "@emotion/css";
import { css } from "@emotion/react";

import { colors } from "src/styles/colors";

import { PixelValue } from "src/types";

import { toPixelString } from "src/utils/cssConverter";

type Props = {
  proportion: number;
  width?: PixelValue;
  height?: PixelValue;
};

const GraphBar = ({ width = "100%", height = "15px", ...props }: Props) => {
  return (
    <div
      css={styles.container({
        width,
        height,
        proportion:
          props.proportion < 0
            ? 0
            : props.proportion > 1
              ? 1
              : props.proportion,
      })}
    >
      <div className={cx("total-bar")}>
        <div className={cx("proportion-bar")} />
      </div>
    </div>
  );
};

const styles = {
  container: ({
    width,
    height,
    proportion,
  }: {
    width: PixelValue;
    height: PixelValue;
    proportion: number;
  }) => css`
    width: ${toPixelString(width)};
    height: ${toPixelString(height)};
    overflow-x: hidden;

    > .total-bar {
      width: 100%;
      height: 100%;
      background-color: ${colors.gray400};

      > .proportion-bar {
        width: ${proportion * 100}%;
        height: 100%;
        background-color: ${colors.primary900};
        transition: all 0.2s;
      }
    }
  `,
};

export default GraphBar;
