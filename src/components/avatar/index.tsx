/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";

// types
import { PixelValue } from "src/types";

// utils
import { toPixelString } from "src/utils/cssConverter";

type Props = {
  shape?: "circle" | "square";
  size?: "small" | "medium" | "large" | PixelValue;
  src?: string;
  alt?: string;
};

const Avatar = ({ shape = "circle", size = "medium", ...props }: Props) => {
  return (
    <span css={styles.container({ size, shape })}>
      <img src={props.src ?? "/avatar.png"} alt={props.alt ?? "avatar"} />
    </span>
  );
};

const styles = {
  container: ({
    size,
    shape,
  }: {
    size: PixelValue | ("small" | "medium" | "large");
    shape: "circle" | "square";
  }) => css`
    position: relative;
    display: inline-block;

    ${(() => {
      let width: PixelValue;

      if (size === "small") {
        width = "20px";
      } else if (size === "medium") {
        width = "40px";
      } else if (size === "large") {
        width = "64px";
      } else {
        width = size;
      }

      return css`
        width: ${toPixelString(width)};
        aspect-ratio: 1;
      `;
    })()};

    overflow: hidden;
    border-radius: ${shape === "circle" ? "50%" : "5px"};

    > img {
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0px;
      left: 0px;
      margin: auto;
      object-fit: cover;
    }
  `,
};

export default Avatar;
