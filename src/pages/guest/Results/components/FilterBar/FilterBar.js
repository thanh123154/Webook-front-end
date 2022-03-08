import { memo, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import filterBar from "./filterBar.module.scss";
import { doGetListing } from "../../../../../ducks/slices/listingSlice";
import cn from "classnames";
import { Button, Checkbox, Col, Form, Input, Row } from "antd";
import { ClickOutside } from "../../../../../hooks";
import { useForm } from "antd/lib/form/Form";

const FilterBar = ({ filterData, setFilterData }) => {
  const [form] = useForm();

  const placeRef = useRef();
  const priceRef = useRef();
  const amenityRef = useRef();

  const listingReducer = useSelector((state) => state.listing);
  const dispatch = useDispatch();

  const [placeList, setPlaceList] = useState([]);
  const [amenityList, setAmenityList] = useState([]);
  const [visiblePlacePopup, setVisiblePlacePopup] = useState(false);
  const [visiblePricePopup, setVisiblePricePopup] = useState(false);
  const [visibleAmenityPopup, setVisibleAmenityPopup] = useState(false);

  const [selectedPrice, setSelectedPrice] = useState({
    min: "",
    max: "",
  });
  const [selectedPlace, setSelectedPlace] = useState([]);
  const [selectedAmenity, setSelectedAmenity] = useState([]);

  useEffect(() => {
    if (listingReducer.isOk === undefined) {
      dispatch(doGetListing());
    } else if (!!listingReducer.isOk) {
      setPlaceList(listingReducer.place);
      setAmenityList(listingReducer.amenity);
    } else {
      console.log("ERROR: GET LISTING AND AMENITY");
    }
  }, [dispatch, listingReducer]);

  ClickOutside({
    ref: placeRef,
    onClickOutside: () => setVisiblePlacePopup(false),
  });

  ClickOutside({
    ref: priceRef,
    onClickOutside: () => setVisiblePricePopup(false),
  });

  ClickOutside({
    ref: amenityRef,
    onClickOutside: () => setVisibleAmenityPopup(false),
  });

  const onFilter = (values) => {
    // console.log("Filter", values);

    const { price, places, amenities } = values;

    if (visiblePricePopup) {
      if (parseInt(price.min) > parseInt(price.max)) {
        form.setFields([
          { name: ["price", "min"], errors: ["Không hợp lệ"] },
          { name: ["price", "max"], errors: ["Không hợp lệ"] },
        ]);
      } else {
        setSelectedPrice(price);
        setVisiblePricePopup(false);

        setFilterData({ ...filterData, price: price });
      }
    }

    if (visiblePlacePopup) {
      setSelectedPlace(places);
      setVisiblePlacePopup(false);

      setFilterData({ ...filterData, places: places });
    }

    if (visibleAmenityPopup) {
      setSelectedAmenity(amenities);
      setVisibleAmenityPopup(false);

      setFilterData({ ...filterData, amenities: amenities });
    }
  };

  return (
    <Form
      form={form}
      className={filterBar["container"]}
      onFinish={onFilter}
      layout="vertical"
    >
      {/* ===========Lọc theo giá=========== */}
      <div className={filterBar["wrapper"]} ref={priceRef}>
        <div
          className={cn(
            filterBar["btn"],
            (visiblePricePopup ||
              selectedPrice.min !== "" ||
              selectedPrice.max !== "") &&
              filterBar["active"]
          )}
          onClick={() => setVisiblePricePopup((val) => !val)}
        >
          <span>
            Giá{" "}
            {selectedPrice.min !== "" && selectedPrice.max === ""
              ? `(≥ ${selectedPrice.min}đ)`
              : selectedPrice.min === "" && selectedPrice.max !== ""
              ? `(≤${selectedPrice.max}đ)`
              : selectedPrice.min !== "" && selectedPrice.max !== ""
              ? `(${selectedPrice.min}đ - ${selectedPrice.max}đ)`
              : ""}
          </span>
        </div>

        <div
          className={cn(
            filterBar["popup"],
            visiblePricePopup && filterBar["visible"]
          )}
        >
          <Row gutter={10}>
            <Col span={12}>
              <Form.Item
                name={["price", "min"]}
                label="Min"
                rules={[
                  {
                    pattern: /^[+]?\d+([.]\d+)?$/,
                    message: "Sai định dạng",
                  },
                ]}
                initialValue=""
              >
                <Input addonAfter="đ" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name={["price", "max"]}
                label="Max"
                rules={[
                  {
                    pattern: /^[+]?\d+([.]\d+)?$/,
                    message: "Sai định dạng",
                  },
                ]}
                initialValue=""
              >
                <Input addonAfter="đ" />
              </Form.Item>
            </Col>
          </Row>

          <Button
            block
            className={filterBar["filter-btn"]}
            onClick={() => form.submit()}
          >
            Lọc
          </Button>
        </div>
      </div>

      {/* ===========Lọc theo loại nơi ở=========== */}
      <div className={filterBar["wrapper"]} ref={placeRef}>
        <div
          className={cn(
            filterBar["btn"],
            (visiblePlacePopup || selectedPlace.length > 0) &&
              filterBar["active"]
          )}
          onClick={() => {
            if (!visiblePlacePopup) {
              form.setFields([{ name: "places", value: selectedPlace }]);
            }

            setVisiblePlacePopup((val) => !val);
          }}
        >
          <span>
            Loại nơi ở{" "}
            {selectedPlace.length > 0 && `(+${selectedPlace.length})`}
          </span>
        </div>

        <div
          className={cn(
            filterBar["popup"],
            visiblePlacePopup && filterBar["visible"]
          )}
          name="places"
        >
          <Form.Item name="places" initialValue={[]}>
            <Checkbox.Group>
              {placeList.map((item) => (
                <Checkbox
                  value={item}
                  key={item.id}
                  className={filterBar["checkbox"]}
                >
                  <p className={filterBar["name"]}>{item.name}</p>
                  <p className={filterBar["desc"]}>{item.desc}</p>
                </Checkbox>
              ))}
            </Checkbox.Group>
          </Form.Item>

          <Button
            block
            className={filterBar["filter-btn"]}
            onClick={() => form.submit()}
          >
            Lọc
          </Button>
        </div>
      </div>

      {/* ===========Lọc theo tiện nghi sẵn có=========== */}
      <div className={filterBar["wrapper"]} ref={amenityRef}>
        <div
          className={cn(
            filterBar["btn"],
            (visibleAmenityPopup || selectedAmenity.length > 0) &&
              filterBar["active"]
          )}
          onClick={() => {
            if (!visibleAmenityPopup) {
              form.setFields([{ name: "amenities", value: selectedAmenity }]);
            }

            setVisibleAmenityPopup((val) => !val);
          }}
        >
          <span>
            Tiện nghi{" "}
            {selectedAmenity.length > 0 && `(+${selectedAmenity.length})`}
          </span>
        </div>

        <div
          className={cn(
            filterBar["popup"],
            filterBar["amenity"],
            visibleAmenityPopup && filterBar["visible"]
          )}
        >
          <Form.Item name="amenities" initialValue={[]}>
            <Checkbox.Group className={filterBar["checkbox-group"]}>
              {amenityList.map((item) => (
                <Checkbox
                  value={item}
                  key={item.id}
                  className={filterBar["checkbox"]}
                >
                  {item.name}
                </Checkbox>
              ))}
            </Checkbox.Group>
          </Form.Item>

          <Button
            block
            className={filterBar["filter-btn"]}
            onClick={() => form.submit()}
          >
            Lọc
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default memo(FilterBar);
