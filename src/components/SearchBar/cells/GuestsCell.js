import { SearchOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import { forwardRef, useImperativeHandle, useState } from "react";
import { GuestsPopup } from "../popups";
import { cellId } from "../searchBarKeys";
import CellContainer from "../components/CellContainer";

const GuestsCell = forwardRef(
  ({ guests, updateGuests, cellContainerProps, handleSearch }, ref) => {
    const [visible, setVisible] = useState(false);

    useImperativeHandle(ref, () => ({
      displayPopup() {
        setVisible(true);
      },
    }));

    const handleClickOutside = () => {
      if (cellContainerProps.cellActive === cellId.guests) {
        setVisible(false);
        cellContainerProps.handleActiveCell();
      }
    };

    const popupContent = (
      <GuestsPopup guests={guests} updateGuests={updateGuests} />
    );

    return (
      <CellContainer
        {...cellContainerProps}
        span={6}
        id={cellId.guests}
        visiblePopup={visible}
        onClickOutside={handleClickOutside}
        popupContent={popupContent}
        isFinalCol
        onClear={() => updateGuests(0)}
        visibleClear={guests !== 0}
      >
        <Row className="cell">
          <Col flex="auto">
            <label>Khách</label>
            {guests > 0 ? (
              <p className="data">{guests} khách</p>
            ) : (
              <p className="placeholder">Thêm người</p>
            )}
          </Col>

          <Col
            className="btn"
            onClick={(e) => {
              e.stopPropagation();
              visible && setVisible(false);
              handleSearch();
            }}
            flex="45px"
          >
            <SearchOutlined className="icon" />
          </Col>
        </Row>
      </CellContainer>
    );
  }
);

export default GuestsCell;
