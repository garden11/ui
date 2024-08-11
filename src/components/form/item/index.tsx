/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import React, { ReactNode, useContext } from "react";
import { cx } from "@emotion/css";

import Stack from "../../stack";

import { Context } from "../contexts";

import { colors } from "src/styles/colors";

import { PixelValue } from "src/types";

import { toPixelString } from "src/utils/cssConverter";
import { spacing } from "src/utils/spacing";

type PropsWithName = {
  name?: string;
  labelFor?: never;
};

type PropsWithoutName = {
  name?: never;
  labelFor?: string;
};

type PropsDefault = {
  variant?: "vertical" | "horizontal";
  width?: PixelValue;
  labelWidth?: PixelValue;
  size?: "small" | "medium" | "large";
  label?: string;
  hint?: string;
  status?: "normal" | "warning" | "error";
  children: ReactNode;
};

type Props = PropsDefault & (PropsWithName | PropsWithoutName);

const Item = ({ status = "normal", ...props }: Props) => {
  const form = useContext(Context);

  const { variant, width, labelWidth, size } = {
    variant: props.variant ?? form.variant,
    width: props.width ?? form.itemWidth,
    labelWidth: props.labelWidth ?? form.labelWidth,
    size: props.size ?? form.itemSize,
  };

  const createChildren = (children: ReactNode) => {
    return React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        const childProps = { ...child.props };

        if (!("size" in childProps)) {
          childProps["size"] = size;
        }

        if (!("status" in childProps)) {
          childProps["status"] = status;
        }

        if (!("name" in childProps)) {
          childProps["name"] = props.name;

          if (!("id" in childProps)) {
            childProps["id"] = props.name;
          }
        }

        return React.cloneElement(child, childProps);
      }
      return child;
    });
  };

  if (variant === "vertical") {
    return (
      <Stack
        direction="vertical"
        css={styles.container({
          width,
          labelWidth,
          size,
        })}
        className={cx({
          error: status === "error",
          warning: status === "warning",
        })}
        spacing={spacing.unit2}
      >
        {props.label && (
          <label htmlFor={props.name ?? props.labelFor}>{props.label}</label>
        )}
        <Stack
          direction="vertical"
          className={cx("input-hint")}
          spacing={spacing.unit4}
        >
          <div className={cx("input")}>{createChildren(props.children)}</div>
          {props.hint && <div className={cx("hint")}>{props.hint}</div>}
        </Stack>
      </Stack>
    );
  }

  return (
    <Stack
      direction="horizontal"
      css={styles.container({ width, labelWidth, size })}
      className={cx({
        error: status === "error",
        warning: status === "warning",
      })}
      alignItems="baseline"
    >
      {props.label && (
        <label htmlFor={props.name ?? props.labelFor}>{props.label}</label>
      )}
      <Stack
        direction="vertical"
        className={cx("input-hint")}
        spacing={spacing.unit4}
      >
        <div className={cx("input")}>{createChildren(props.children)}</div>
        {props.hint && <div className={cx("hint")}>{props.hint}</div>}
      </Stack>
    </Stack>
  );
};

const styles = {
  container: ({
    width,
    labelWidth,
    size,
  }: {
    width: PixelValue;
    labelWidth: PixelValue;
    size: "small" | "medium" | "large";
  }) => css`
    width: ${toPixelString(width)};

    label {
      flex: none;
      width: ${toPixelString(labelWidth)};
      box-sizing: border-box;
      ${spacing.padding.right10};
      font-weight: 500;
      letter-spacing: 0.3px;
      color: ${colors.bold900};
      margin: 0px;
      ${{
        small: css`
          font-size: 12px;
        `,
        medium: css`
          font-size: 14px;
        `,
        large: css`
          font-size: 16px;
        `,
      }[size]};
    }

    .input-hint {
      flex: auto;
      overflow: hidden;

      > .input {
      }

      .hint {
        ${spacing.margin.left10};

        ${{
          small: css`
            font-size: 10px;
          `,
          medium: css`
            font-size: 12px;
          `,
          large: css`
            font-size: 14px;
          `,
        }[size]};
      }
    }

    &.warning label,
    &.warning .hint {
      color: ${colors.warning500};
    }

    &.error label,
    &.error .hint {
      color: ${colors.error500};
    }
  `,
};

export default Item;
