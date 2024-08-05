/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { CSSProperties } from "react";

import { PixelValue } from "src/types";

import { spacing } from "src/utils/spacing";

type Props = {
  level?: 1 | 2 | 3 | 4 | 5;
  children?: string;
  margin?: {
    top?: PixelValue;
    bottom?: PixelValue;
  };
  whiteSpace?: CSSProperties["whiteSpace"];
  wordWrap?: CSSProperties["wordWrap"];
  writingMode?: CSSProperties["writingMode"];
  textOrientation?: CSSProperties["textOrientation"];
};

const Title = ({
  level = 1,
  whiteSpace = "normal",
  wordWrap = "normal",
  writingMode = "horizontal-tb",
  textOrientation = "mixed",
  ...props
}: Props) => {
  const { margin, ...restProps } = props;

  const Tag = {
    1: "h1" as const,
    2: "h2" as const,
    3: "h3" as const,
    4: "h4" as const,
    5: "h5" as const,
  }[level];

  return (
    <Tag
      css={styles.container({
        margin,
        whiteSpace,
        wordWrap,
        writingMode,
        textOrientation,
      })}
      {...restProps}
    />
  );
};

const styles = {
  container: ({
    margin,
    whiteSpace,
    wordWrap,
    writingMode,
    textOrientation,
  }: {
    margin: { top?: PixelValue; bottom?: PixelValue } | undefined;
    whiteSpace: CSSProperties["whiteSpace"];
    wordWrap: CSSProperties["wordWrap"];
    writingMode: CSSProperties["writingMode"];
    textOrientation: CSSProperties["textOrientation"];
  }) => css`
    margin: unset;
    ${spacing.margin.top(margin?.top ?? "1.2em")};
    ${spacing.margin.bottom(margin?.top ?? "0.5em")};
    white-space: ${whiteSpace};
    word-wrap: ${wordWrap};
    writing-mode: ${writingMode};
    text-orientation: ${textOrientation};
  `,
};

export default Title;
