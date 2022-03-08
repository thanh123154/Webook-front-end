import { Col } from "antd";
import { useRef } from "react";
import { ClickOutside } from "../../../hooks";
import { hoverType } from "../searchBarKeys";
import { CloseOutlined } from "@ant-design/icons";
import cn from "classnames";

export default function CellContainer({
  children,
  id,
  visiblePopup,
  onClickOutside,
  cellActive,
  handleHoverCell,
  handleActiveCell,
  span,
  popupContent,
  abortOnClick = false,
  isFinalCol = false,
  onClear = () => {},
  visibleClear = true,
}) {
  const ref = useRef();

  onClickOutside !== null &&
    ClickOutside({
      ref: ref,
      onClickOutside: onClickOutside,
    });

  return (
    <Col
      ref={ref}
      span={span}
      className={`cell-wrap${cellActive === id ? " active" : ""}`}
      onMouseEnter={() => handleHoverCell(hoverType.in, id)}
      onMouseLeave={() => handleHoverCell(hoverType.out)}
      onClick={() => !abortOnClick && handleActiveCell(id)}
    >
      <div className="cell">
        {children}
        {visiblePopup && popupContent}
      </div>

      {visibleClear && (
        <div
          className={cn("clear-icon", isFinalCol && "offset-right")}
          onClick={(e) => {
            e.stopPropagation();
            onClear();
          }}
        >
          <CloseOutlined />
        </div>
      )}
    </Col>
  );
}
