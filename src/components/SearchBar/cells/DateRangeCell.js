import { Col, Row } from "antd";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { cellId } from "../searchBarKeys";
import CellContainer from "../components/CellContainer";
import CellDivider from "../components/CellDivider";
import { DateRangePopup } from "../popups";
import { ClickOutside } from "../../../hooks";
import { momentToDate } from "../../../helpers/formatter";

const DateRangeCell = forwardRef(
  (
    { checkin, checkout, updateCheckin, updateCheckout, cellContainerProps },
    ref
  ) => {
    const popupRef = useRef();
    const [visible, setVisible] = useState(false);

    useImperativeHandle(ref, () => ({
      displayPopup() {
        setVisible(true);
      },
    }));

    const handleClickOutside = () => {
      if (
        cellContainerProps.cellActive === cellId.checkinDate ||
        cellContainerProps.cellActive === cellId.checkoutDate
      ) {
        setVisible(false);
        cellContainerProps.handleActiveCell();
      }
    };

    ClickOutside({
      ref: popupRef,
      onClickOutside: handleClickOutside,
    });

    return (
      <Col span={10} ref={popupRef}>
        <Row align="middle">
          <CellContainer
            {...cellContainerProps}
            span={12}
            id={cellId.checkinDate}
            visiblePopup={visible}
            onClickOutside={null}
            onClear={() => updateCheckin("")}
            visibleClear={checkin !== ""}
          >
            <label>Nhận phòng</label>

            {checkin !== "" ? (
              <p className="data">{momentToDate(checkin)}</p>
            ) : (
              <p className="placeholder">Chọn ngày</p>
            )}
          </CellContainer>

          <CellDivider
            cellActive={cellContainerProps.cellActive}
            cellHover={cellContainerProps.cellHover}
            id1={cellId.checkinDate}
            id2={cellId.checkoutDate}
          />

          <CellContainer
            {...cellContainerProps}
            span={12}
            id={cellId.checkoutDate}
            visiblePopup={visible}
            onClickOutside={null}
            onClear={() => updateCheckout("")}
            visibleClear={checkout !== ""}
          >
            <label>Trả phòng</label>

            {checkout !== "" ? (
              <p className="data">{momentToDate(checkout)}</p>
            ) : (
              <p className="placeholder">Chọn ngày</p>
            )}
          </CellContainer>
        </Row>

        {visible && (
          <DateRangePopup
            checkin={checkin}
            checkout={checkout}
            updateCheckin={updateCheckin}
            updateCheckout={updateCheckout}
            isCheckinActive={
              cellContainerProps.cellActive === cellId.checkinDate
            }
            isCheckoutActive={
              cellContainerProps.cellActive === cellId.checkoutDate
            }
          />
        )}
      </Col>
    );
  }
);

export default DateRangeCell;
