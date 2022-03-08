import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import paginationBar from "./paginationBar.module.scss";
import cn from "classnames";
import { useMemo } from "react";
import { memo } from "react";

const PaginationBar = ({
  onNext,
  onPrev,
  onNum,
  currentPage = 1,
  totalPage = 1,
}) => {
  const pageArr = useMemo(
    () => [...Array.apply(null, Array(totalPage)).map((_, i) => i + 1)],
    [totalPage]
  );

  return (
    <div className={paginationBar["container"]}>
      {pageArr.length > 0 && (
        <button className="btn" onClick={onPrev} disabled={currentPage === 1}>
          <LeftOutlined />
        </button>
      )}

      {pageArr.map((item) => (
        <button
          className={cn("btn", item === currentPage && "active")}
          key={item}
          onClick={() => item !== currentPage && onNum(item)}
        >
          <span>{item}</span>
        </button>
      ))}

      {pageArr.length > 0 && (
        <button
          className="btn"
          disabled={currentPage === totalPage}
          onClick={onNext}
        >
          <RightOutlined />
        </button>
      )}
    </div>
  );
};

export default memo(PaginationBar);
