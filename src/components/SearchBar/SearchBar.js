import searchBar from "./searchBar.module.scss";
import { Row } from "antd";
import { useRef, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { paths, searchKeys } from "../../constants";
import { cellId, hoverType } from "./searchBarKeys";
import { DateRangeCell, DestinationCell, GuestsCell } from "./cells";
import CellDivider from "./components/CellDivider";
import { milliToMoment, momentToMilli } from "../../helpers/formatter";

export default function SearchBar({
  destination = "",
  checkin = "",
  checkout = "",
  guests = 0,
}) {
  const history = useHistory();
  const { pathname } = useLocation();

  const isAtHome = pathname === paths.HOME;

  const destinationKey = searchKeys.DESTINATION;
  const checkinKey = searchKeys.CHECKIN;
  const checkoutKey = searchKeys.CHECKOUT;
  const guestsKey = searchKeys.GUESTS;

  const destinationRef = useRef();
  const guestsRef = useRef();
  const dateRangeRef = useRef();

  const [cellHover, setCellHover] = useState();
  const [cellActive, setCellActive] = useState();

  const [destinationData, setDestinationData] = useState(destination || "");
  const [checkinData, setCheckinData] = useState(
    checkin !== "" && checkin !== undefined && checkin !== null
      ? milliToMoment(checkin)
      : ""
  );
  const [checkoutData, setCheckoutData] = useState(
    checkout !== "" && checkout !== undefined && checkout !== null
      ? milliToMoment(checkout)
      : ""
  );
  const [guestsData, setGuestsData] = useState(parseInt(guests));

  const handleSearch = () => {
    if (!!destinationData) {
      const destinationSearch = `${destinationKey}=${destinationData}`;
      const checkinSearch = `${checkinKey}=${
        checkinData !== "" ? momentToMilli(checkinData) : ""
      }`;
      const checkoutSearch = `${checkoutKey}=${
        checkoutData !== "" ? momentToMilli(checkoutData) : ""
      }`;
      const guestsSearch = `${guestsKey}=${guestsData}`;

      history.push({
        pathname: paths.RESULTS,
        search: `?${destinationSearch}&${checkinSearch}&${checkoutSearch}&${guestsSearch}`,
      });
    } else destinationRef.current.displayPopup();
  };

  const handleHoverCell = (type, id) => {
    if (type === hoverType.in) setCellHover(id);
    else setCellHover();
  };

  const handleActiveCell = (id) => {
    if (!!id) {
      if (id === cellId.destination) destinationRef.current.displayPopup();
      else if (id === cellId.checkinDate) dateRangeRef.current.displayPopup();
      else if (id === cellId.checkoutDate) dateRangeRef.current.displayPopup();
      else if (id === cellId.guests) guestsRef.current.displayPopup();

      setCellActive(id);
    } else setCellActive();
  };

  const cellContainerProps = {
    cellHover,
    cellActive,
    handleHoverCell,
    handleActiveCell,
  };

  return (
    <>
      <Row
        className={searchBar[`container${isAtHome ? "-home" : ""}`]}
        align="middle"
        wrap={false}
      >
        <DestinationCell
          ref={destinationRef}
          destination={destinationData}
          updateDestination={(val) => setDestinationData(val)}
          cellContainerProps={cellContainerProps}
          handleSearch={handleSearch}
        />

        <CellDivider
          cellActive={cellActive}
          cellHover={cellHover}
          id1={cellId.destination}
          id2={cellId.checkinDate}
        />

        <DateRangeCell
          ref={dateRangeRef}
          checkin={checkinData}
          checkout={checkoutData}
          cellContainerProps={cellContainerProps}
          updateCheckin={(val) => {
            setCheckinData(val);
            if (val !== "" && checkoutData === "")
              setCellActive(cellId.checkoutDate);
          }}
          updateCheckout={(val) => {
            setCheckoutData(val);
            if (val !== "" && checkinData === "")
              setCellActive(cellId.checkinDate);
          }}
        />

        <CellDivider
          cellActive={cellActive}
          cellHover={cellHover}
          id1={cellId.checkoutDate}
          id2={cellId.guests}
        />

        <GuestsCell
          ref={guestsRef}
          guests={guestsData}
          updateGuests={(val) => setGuestsData(val)}
          cellContainerProps={cellContainerProps}
          handleSearch={handleSearch}
        />
      </Row>
    </>
  );
}
