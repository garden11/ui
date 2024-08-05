/** @jsxImportSource @emotion/react */

import { cx } from "@emotion/css";
import { css } from "@emotion/react";
import { useEffect, useState } from "react";

type Props = { copyable?: boolean; children?: string };

const Paragraph = ({ copyable = false, ...props }: Props) => {
  const [text, setText] = useState<string>(props.children ?? "");
  const [isCopyDone, setIsCopyDone] = useState<boolean>(false);

  useEffect(() => {
    props.children && setText(props.children);
  }, [props.children]);

  useEffect(() => {
    isCopyDone && setTimeout(() => setIsCopyDone(false), 2000);
  }, [isCopyDone]);

  const handleClickCopyable = () => {
    navigator.clipboard.writeText(text).then(() => {
      setIsCopyDone(true);
    });
  };

  return (
    <div css={styles.container()}>
      {text}{" "}
      {copyable && (
        <span
          role="button"
          className={cx("copyable")}
          onClick={handleClickCopyable}
        >
          <img
            alt="copyable"
            src={isCopyDone ? "/check.png" : "/copyable.png"}
          />
        </span>
      )}
    </div>
  );
};

const styles = {
  container: () => css`
    .text {
    }

    .copyable {
      position: relative;
      display: inline-block;
      width: 20px;
      aspect-ratio: 1;
      overflow: hidden;
      cursor: pointer;

      img {
        position: absolute;
        height: 100%;
        width: 100%;
        top: 0px;
        left: 0px;
        margin: auto;
        object-fit: cover;
      }
    }
  `,
};

export default Paragraph;
