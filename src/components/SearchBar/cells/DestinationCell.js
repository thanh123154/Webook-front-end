import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { DestinationPopup } from "../popups";
import { cellId } from "../searchBarKeys";
import CellContainer from "../components/CellContainer";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import { localGet, localSet } from "../../../helpers/localHandler";
import { localKeys } from "../../../constants/keys";

const DestinationCell = forwardRef(
  (
    { destination, updateDestination, cellContainerProps, handleSearch },
    ref
  ) => {
    const { placePredictions, isPlacePredictionsLoading, getPlacePredictions } =
      usePlacesService({
        apiKey: process.env.GOOGLE_API_KEY,
      });

    const [input, setInput] = useState();
    const [visible, setVisible] = useState(false);
    const [recentSearch, setRecentSearch] = useState(
      localGet(localKeys.RECENT_SEARCH, [])
    );

    useEffect(() => {
      localSet(localKeys.RECENT_SEARCH, recentSearch);
    }, [recentSearch]);

    useImperativeHandle(ref, () => ({
      displayPopup() {
        input.focus();
        setVisible(true);
      },
    }));

    const handleClickOutside = () => {
      if (cellContainerProps.cellActive === cellId.destination) {
        setVisible(false);
        cellContainerProps.handleActiveCell();
      }
    };

    const hanldeSearch = (e) => {
      const { value } = e.target;
      getPlacePredictions({ input: value });

      updateDestination(value);
    };

    const handleSelectDesination = (val) => {
      let arr = [...recentSearch];

      updateDestination(val);

      if (recentSearch.includes(val)) {
        arr.splice(arr.indexOf(val), 1);
      } else if (recentSearch.length === 5) {
        arr.shift();
      }

      arr.push(val);
      setRecentSearch(arr);

      setVisible(false);
      cellContainerProps.handleActiveCell();
      cellContainerProps.handleHoverCell();
    };

    const popUpContent = (
      <DestinationPopup
        placePredictions={placePredictions}
        isPlacePredictionsLoading={isPlacePredictionsLoading}
        onSelectResult={handleSelectDesination}
        recentSearch={recentSearch}
      />
    );

    return (
      <CellContainer
        {...cellContainerProps}
        span={8}
        id={cellId.destination}
        visiblePopup={visible}
        onClickOutside={handleClickOutside}
        abortOnClick
        popupContent={popUpContent}
        onClear={() => updateDestination("")}
        visibleClear={destination !== ""}
      >
        <div className="cell">
          <label>Địa điểm</label>
          <input
            type="text"
            placeholder="Chọn điểm đến"
            value={destination}
            onFocus={() =>
              cellContainerProps.handleActiveCell(cellId.destination)
            }
            onChange={hanldeSearch}
            ref={(input) => {
              setInput(input);
            }}
            onKeyUp={(e) => e.keyCode === 13 && handleSearch()}
          />
        </div>
      </CellContainer>
    );
  }
);

export default DestinationCell;
