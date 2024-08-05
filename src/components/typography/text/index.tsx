/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { colors } from "src/styles/colors";

type Variant =
  | "standard"
  | "warning"
  | "danger"
  | "disabled"
  | "code"
  | "mark"
  | "keyboard"
  | "deleted"
  | "strong"
  | "italic";

type Props = {
  variant?: Variant;
  children?: string;
};

const Text = ({ variant = "standard", ...props }: Props) => {
  const { children, ...restProps } = props;

  const withTagVariants = [
    "code",
    "mark",
    "keyboard",
    "strong",
    "italic",
    "deleted",
  ] as const;

  return (
    <span css={styles.container({ variant })} {...restProps}>
      {
        {
          code: <code>{children}</code>,
          mark: <mark>{props.children}</mark>,
          keyboard: <kbd>{props.children}</kbd>,
          strong: <strong>{props.children}</strong>,
          italic: <i>{props.children}</i>,
          deleted: <s>{props.children}</s>,
          [":default"]: children,
        }[
          (withTagVariants as unknown as string[]).includes(variant)
            ? (variant as (typeof withTagVariants)[number])
            : ":default"
        ]
      }
    </span>
  );
};

const styles = {
  container: ({ variant }: { variant: Variant }) => css`
    ${variant === "warning" &&
    css`
      color: ${colors.warning500};
    `}

    ${variant === "danger" &&
    css`
      color: ${colors.error500};
    `}

    ${variant === "disabled" &&
    css`
      color: ${colors.disabled500};
      cursor: not-allowed;
    `}
  `,
};

export default Text;
