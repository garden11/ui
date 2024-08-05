/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { useEffect, useState } from "react";

import Prev from "./prev";
import Next from "./next";
import Page from "./page";

import { colors } from "src/styles/colors";

import { flex } from "src/utils/flex";
import { spacing } from "src/utils/spacing";

type Props = {
  initialPage?: number;
  pageSize?: number;
  total: number;
  onClickButton?: (page: number) => void;
};

const Pagination = ({ initialPage = 1, pageSize = 10, ...props }: Props) => {
  const [currentPage, setCurrentPage] = useState<number>(initialPage);

  const numberButtonLength = 5;

  const pageNumbers: number[] = [];

  const lastPage = Math.ceil(props.total / pageSize);
  const startPage =
    Math.floor((currentPage - 1) / numberButtonLength) * numberButtonLength + 1;
  const endPage = Math.min(startPage + numberButtonLength - 1, lastPage);

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    props.onClickButton?.(currentPage);
  }, [currentPage]);

  return (
    <ul css={styles.contianer()}>
      <Prev
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      />

      {pageNumbers.map((pageNumber) => (
        <Page
          key={pageNumber}
          value={pageNumber}
          isActive={pageNumber === currentPage}
          onClick={() => setCurrentPage(pageNumber)}
        />
      ))}

      <Next
        disabled={currentPage === lastPage}
        onClick={() => setCurrentPage(currentPage + 1)}
      />
    </ul>
  );
};

const styles = {
  contianer: () => css`
    ${flex.display};
    ${flex.justifyContent("center")};

    > li.button {
      ${spacing.margin.x20};
      color: ${colors.bold900};
      font-size: 15px;
      font-weight: 500;
      list-style: none;
      transition: all 0.3s;
      cursor: pointer;
      user-select: none;

      &.active {
        font-weight: 900;
      }

      &.disabled {
        color: ${colors.disabled500};
      }
    }
  `,
};

export default Pagination;
