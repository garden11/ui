/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { useEffect } from "react";

import { colors } from "src/styles/colors";

import { spacing } from "src/utils/spacing";

type Props = {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  children: string;
};

const Tag = ({ checked = false, ...props }: Props) => {
  useEffect(() => {
    props.onChange?.(!checked);
  }, [checked]);

  const { onChange, children, ...restProps } = props;

  return (
    <span css={styles.container({ checked })} {...restProps}>
      # {children}
    </span>
  );
};

const styles = {
  container: ({ checked }: { checked: boolean }) => css`
    display: inline-block;
    box-sizing: border-box;
    ${spacing.padding.x10};
    ${spacing.padding.y6};
    color: ${colors.primary900};
    border: 1px solid ${colors.primary900};
    border-radius: 5px;
    background-color: ${colors.neutral0};
    cursor: pointer;

    ${checked &&
    css`
      color: ${colors.neutral0};
      background-color: ${colors.primary900};
    `};
  `,
};

export default Tag;
