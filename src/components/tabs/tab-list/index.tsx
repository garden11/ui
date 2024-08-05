/** @jsxImportSource @emotion/react */

import { cx } from "@emotion/css";
import { css } from "@emotion/react";
import { useEffect, useRef, useState, WheelEvent } from "react";

import { colors } from "src/styles/colors";

import { flex } from "src/utils/flex";
import { spacing } from "src/utils/spacing";

type Props = {
  activeKey: string;
  items: { key: string; label: string }[];
  onChange: (key: string) => void;
};

const TabList = (props: Props) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const [isScrollAtStart, setIsScrollAtStart] = useState<boolean>(true);
  const [isScrollAtEnd, setIsScrollAtEnd] = useState<boolean>(true);

  useEffect(() => {
    const scroll = scrollRef.current;

    const handleWheel = (event: Event) => {
      if (!scroll) return;

      scroll.scrollLeft += (
        event as unknown as WheelEvent<HTMLDivElement>
      ).deltaY;

      event.preventDefault();
    };

    if (scroll) {
      scroll.addEventListener("wheel", handleWheel, {
        passive: false,
      });
    }
    return () => {
      scroll?.removeEventListener("wheel", handleWheel);
    };
  }, []);

  useEffect(() => {
    const scroll = scrollRef.current;

    const initScroll = () => {
      if (!scroll) return;

      if (scroll.scrollLeft !== 0) {
        setIsScrollAtStart(false);
      }

      if (
        Math.ceil(scroll.scrollLeft + scroll.clientWidth) < scroll.scrollWidth
      ) {
        setIsScrollAtEnd(false);
      }
    };

    const handleScroll = (event: Event) => {
      if (!scroll) return;

      if (scroll.scrollLeft === 0) {
        setIsScrollAtStart(true);
      } else {
        setIsScrollAtStart(false);
      }

      if (
        Math.ceil(scroll.scrollLeft + scroll.clientWidth) === scroll.scrollWidth
      ) {
        setIsScrollAtEnd(true);
      } else {
        setIsScrollAtEnd(false);
      }
    };

    if (scroll) {
      scroll.addEventListener("scroll", handleScroll);
    }

    initScroll();

    return () => {
      scroll?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    scrollToTab(props.activeKey);
  }, [props.activeKey]);

  const scrollToTab = (key: string) => {
    const scroll = scrollRef.current;

    const index = props.items.findIndex((item) => item.key === key);

    if (index !== -1 && scroll) {
      const targetElement = scroll.children[index] as HTMLElement;
      const { left } = targetElement.getBoundingClientRect();
      const previousSpacing = 50;

      const targetPosition =
        left -
        scroll.getBoundingClientRect().left +
        scroll.scrollLeft -
        previousSpacing;

      scroll.scrollTo({
        left: targetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div role="tablist" css={styles.container()}>
      <div
        className={cx("scroll", {
          "at-start": isScrollAtStart,
          "at-end": isScrollAtEnd,
        })}
        ref={scrollRef}
      >
        {props.items.map((item) => {
          const isActive = props.activeKey === item.key;

          return (
            <div
              key={item.key}
              id={`tab-${item.key}`}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${item.key}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => {
                props.onChange(item.key);
              }}
              className={cx("item", {
                active: isActive,
              })}
            >
              {item.label}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const styles = {
  container: () => css`
    position: relative;
    flex: none;
    overflow: hidden;

    > .scroll {
      width: 100%;
      ${flex.display};
      ${flex.direction("row")};
      overflow-x: auto;

      ::before,
      ::after {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 20px;
        content: "";
        pointer-events: none;
        transition: opacity 0.3s ease;
      }

      &.at-start::before {
        opacity: 0;
      }

      &.at-end::after {
        opacity: 0;
      }

      ::before {
        left: 0;
        opacity: 1;
        box-shadow: inset 10px 0 8px -8px rgba(0, 0, 0, 0.5);
      }

      ::after {
        right: 0;
        opacity: 1;
        box-shadow: inset -10px 0 8px -8px rgba(0, 0, 0, 0.5);
      }

      > .item {
        ${flex.display};
        ${flex.alignItems("center")};
        ${flex.justifyContent("center")};
        flex-shrink: 0;
        max-width: 360px;
        min-width: 90px;
        ${spacing.padding10};
        font-weight: 600;
        text-align: center;
        box-sizing: border-box;
        border-top-width: 0px;
        border-bottom-width: 4px;
        border-left-width: 0px;
        border-right-width: 0px;
        border-style: solid;
        border-color: transparent;
        overflow-wrap: break-word;
        cursor: pointer;
      }

      & .active {
        border-color: ${colors.primary900};
      }

      /* IE and Edge */
      -ms-overflow-style: none;
      /* Firefox */
      scrollbar-width: none;
      /* Chrome, Safari, and Opera */
      ::-webkit-scrollbar {
        display: none;
      }
    }
  `,
};

export default TabList;
