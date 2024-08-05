/** @jsxImportSource @emotion/react */

import { ReactNode, useState } from "react";
import { css } from "@emotion/react";
import { cx } from "@emotion/css";

import TabList from "./tab-list";

import { PixelValue } from "src/types";

import { toPixelString } from "src/utils/cssConverter";
import { spacing } from "src/utils/spacing";
import { flex } from "src/utils/flex";

type PropsDefualt = {
  onChange?: (key: string) => void;
  width?: PixelValue;
  height?: PixelValue;
  items: { key: string; label: string; children: ReactNode }[];
};

type PropsWithActiveKey = { activeKey: string; defaultActiveKey?: never };

type PropsWithoutActiveKey = { activeKey?: never; defaultActiveKey: string };

type Props = PropsDefualt & (PropsWithActiveKey | PropsWithoutActiveKey);

const Tabs = ({ width = "auto", height = "500px", ...props }: Props) => {
  const isControlled = !!props.activeKey;

  const [activeKey, setActiveKey] = useState<string | undefined>(
    props.defaultActiveKey
  );

  return (
    <div css={styles.container({ width, height })}>
      <TabList
        items={props.items}
        onChange={(key) => {
          props.onChange?.(key);

          !isControlled && setActiveKey(key);
        }}
        activeKey={isControlled ? props.activeKey : (activeKey as string)}
      />

      {props.items.map((item) => (
        <div
          key={item.key}
          id={`panel-${item.key}`}
          role="tabpanel"
          aria-labelledby={`tab-${item.key}`}
          className={cx("tab-panel")}
          hidden={!(item.key === (isControlled ? props.activeKey : activeKey))}
        >
          {item.children}
        </div>
      ))}
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
    ${flex.display};
    ${flex.direction("column")};
    width: ${toPixelString(width)};
    height: ${toPixelString(height)};

    .tab-panel {
      flex: auto;
      box-sizing: border-box;
      overflow-y: auto;
      ${spacing.padding20}
    }
  `,
};

export default Tabs;
