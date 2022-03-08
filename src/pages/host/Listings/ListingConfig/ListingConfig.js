import { Button, Col, Drawer, Form, Input, Row, Select } from "antd";
import {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
  useRef,
} from "react";
import listingConfig from "./listingConfig.module.scss";
import { useForm } from "antd/lib/form/Form";
import UploadGallery from "../components/UploadGallery/UploadGallery";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { doGetListing } from "../../../../ducks/slices/listingSlice";
import { memo } from "react";
import { requestGet } from "../../../../helpers/requestHandler";
import { apis } from "../../../../constants";
import AddressSelect from "../../../../components/AddressSelect/AddressSelect";

const fields = {
  NAME: "name",
  PRICE: "price",
  ADDRESS: "address",
  DETAIL: "detail",
  GUESTS: "guests",
  BEDROOMS: "bedrooms",
  BATHROOMS: "bathrooms",
  BEDS: "beds",
  PLACE: "place",
  AMENITY: "amenity",
  GALLERY: "gallery",
  PROVINCE: "province",
  DISTRICT: "district",
  WARD: "ward",
};

const ListingConfig = forwardRef(({ onCreate, onUpdate }, ref) => {
  const [visible, setVisible] = useState(false);
  const [form] = useForm();
  const [gallery, setGallery] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const addressRef = useRef();

  const listingReducer = useSelector((state) => state.listing);
  const dispatch = useDispatch();

  const [placeList, setPlaceList] = useState([]);
  const [amenityList, setAmenityList] = useState([]);
  const [isEditListing, setIsEditListing] = useState(false);
  const [currentId, setCurrentId] = useState(0);
  const [addressCodes, setAddressCodes] = useState({});

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

  useEffect(() => {
    if (currentId !== 0) {
      getListingData(currentId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentId]);

  useEffect(() => {
    if (Object.keys(addressCodes).length > 0) {
      addressRef.current.initDataList(addressCodes);
    }
  }, [addressCodes]);

  useImperativeHandle(ref, () => ({
    open(listing) {
      if (!!listing) {
        console.log(listing);

        setCurrentId(listing.id);

        if (
          !!listing[fields.PROVINCE] &&
          !!listing[fields.DISTRICT] &&
          !!listing[fields.WARD]
        ) {
          setAddressCodes({
            [fields.PROVINCE]: JSON.parse(listing[fields.PROVINCE]).code,
            [fields.DISTRICT]: JSON.parse(listing[fields.DISTRICT]).code,
            [fields.WARD]: JSON.parse(listing[fields.WARD]).code,
          });
        }

        form.setFields(
          Object.values(fields).map((key) => {
            if (key === fields.GALLERY) {
              if (!!listing.gallery) setGallery(JSON.parse(listing.gallery));
              return {};
            }

            if (key === fields.PLACE) {
              return {
                name: [key],
                value: JSON.stringify(listing[key]),
              };
            }

            if (key === fields.AMENITY) {
              return {};
            }

            return {
              name: [key],
              value: listing[key],
            };
          })
        );

        setIsEditListing(true);
      }

      setVisible(true);
    },
  }));

  const getListingData = async (id = 0) => {
    requestGet(apis.LISTING_GUEST + "/" + id)
      .then((res) => {
        const dataRes = res.data;

        if (dataRes.status) {
          form.setFields([
            {
              name: fields.AMENITY,
              value: dataRes.result.amenity.map((item) => JSON.stringify(item)),
            },
          ]);
        }
      })
      .catch((err) => console.log("get listing detail error", err));
  };

  const onClose = () => {
    form.resetFields();
    addressRef.current.reset();
    setAddressCodes({});
    setGallery([]);
    setIsEditListing(false);
    setIsLoading(false);
    setCurrentId(0);
    setVisible(false);
  };

  const onFinish = (values) => {
    if (gallery.length < 3) {
      form.setFields([
        { name: fields.GALLERY, errors: ["Hãy tải lên ít nhất 3 bức ảnh"] },
      ]);
    } else {
      values.gallery = JSON.stringify(gallery);
      values.place = JSON.parse(values.place);

      if (!!values.amenity) {
        values.amenity = values.amenity.map((item) => JSON.parse(item));
      } else values.amenity = [];

      console.log(values);

      setIsLoading(true);

      if (!isEditListing) onCreate(values).then(() => onClose());
      else onUpdate(currentId, values).then(() => onClose());
    }
  };

  return (
    <Drawer
      className={listingConfig["container"]}
      visible={visible}
      title={!isEditListing ? "Tạo mới nơi ở" : "Chỉnh sửa nơi ở"}
      onClose={onClose}
      width={800}
      footer={
        <Row gutter={10}>
          <Col>
            <Button onClick={onClose} danger>
              {!isEditListing ? "Huỷ bỏ" : "Quay lại"}
            </Button>
          </Col>

          <Col>
            <Button
              onClick={() => form.submit()}
              type="primary"
              loading={isLoading}
            >
              {!isEditListing ? "Tạo mới" : "Lưu thay đổi"}
            </Button>
          </Col>
        </Row>
      }
    >
      <Form onFinish={onFinish} layout="vertical" form={form}>
        <Row align="middle" gutter={10}>
          <Col span={16}>
            <Form.Item
              name={fields.NAME}
              label="Tên nơi ở"
              rules={[{ required: true, message: "Hãy điền tên nơi ở" }]}
            >
              <Input placeholder="Điền tên nơi ở" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              name={fields.PRICE}
              label="Giá/đêm"
              rules={[
                { required: true, message: "Hãy điền giá/đêm" },
                {
                  pattern: /^[+]?\d+([.]\d+)?$/,
                  message: "Hãy điền số hợp lệ",
                },
              ]}
            >
              <Input placeholder="Điền giá nơi ở" addonAfter="đ" />
            </Form.Item>
          </Col>
        </Row>

        <AddressSelect
          form={form}
          provinceName={fields.PROVINCE}
          districtName={fields.DISTRICT}
          wardName={fields.WARD}
          required
          ref={addressRef}
        />

        <Form.Item
          name={fields.ADDRESS}
          label="Địa chỉ chi tiết"
          rules={[{ required: true, message: "Hãy điền địa chỉ chi tiết" }]}
        >
          <Input placeholder="Số nhà, ngõ/hẻm/ngách..." />
        </Form.Item>

        <Form.Item
          name={fields.DETAIL}
          label="Mô tả"
          rules={[
            {
              required: true,
              message: "Hãy điền mô tả nơi ở",
            },
          ]}
        >
          <Input.TextArea placeholder="Điền mô tả nơi ở" rows={4} />
        </Form.Item>

        <Row align="middle" gutter={10}>
          <Col span={6}>
            <Form.Item
              name={fields.GUESTS}
              label="Số lượng khách"
              initialValue="1"
              rules={[
                {
                  required: true,
                  message: "Hãy điền số lượng khách",
                },
                {
                  pattern: /^[+]?\d+([.]\d+)?$/,
                  message: "Hãy điền số hợp lệ",
                },
              ]}
            >
              <Input type="number" min="1" placeholder="Điền số lượng khách" />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              name={fields.BEDROOMS}
              label="Số phòng ngủ"
              initialValue="1"
              rules={[
                {
                  required: true,
                  message: "Hãy điền số phòng ngủ",
                },
                {
                  pattern: /^[+]?\d+([.]\d+)?$/,
                  message: "Hãy điền số hợp lệ",
                },
              ]}
            >
              <Input type="number" min="1" placeholder="Điền số phòng ngủ" />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              name={fields.BATHROOMS}
              label="Số phòng tắm"
              initialValue="1"
              rules={[
                {
                  required: true,
                  message: "Hãy điền số phòng tắm",
                },
                {
                  pattern: /^[+]?\d+([.]\d+)?$/,
                  message: "Hãy điền số hợp lệ",
                },
              ]}
            >
              <Input type="number" min="1" placeholder="Điền số phòng tắm" />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              name={fields.BEDS}
              label="Số giường ngủ"
              initialValue="1"
              rules={[
                {
                  required: true,
                  message: "Hãy điền số giường ngủ",
                },
                {
                  pattern: /^[+]?\d+([.]\d+)?$/,
                  message: "Hãy điền số hợp lệ",
                },
              ]}
            >
              <Input type="number" min="1" placeholder="Điền số giường ngủ" />
            </Form.Item>
          </Col>
        </Row>

        <Row align="middle" gutter={10}>
          <Col span={8}>
            <Form.Item
              name={fields.PLACE}
              label="Loại hình nơi ở"
              rules={[
                {
                  required: true,
                  message: "Điền chọn loại hình nơi ở",
                },
              ]}
            >
              <Select placeholder="Chọn loại hình nơi ở" showSearch>
                {placeList.map((item) => (
                  <Select.Option key={item.id} value={JSON.stringify(item)}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={16}>
            <Form.Item name={fields.AMENITY} label="Tiện ích">
              <Select
                placeholder="Chọn các tiện ích"
                showSearch
                mode="multiple"
                maxTagCount={3}
              >
                {amenityList.map((item) => (
                  <Select.Option key={item.id} value={JSON.stringify(item)}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item name={fields.GALLERY} label="Bộ sưu tập ảnh">
          <UploadGallery
            gallery={gallery}
            setGallery={(path) => {
              form.setFields([{ name: fields.GALLERY, errors: [] }]);
              setGallery(path);
            }}
          />
        </Form.Item>
      </Form>
    </Drawer>
  );
});

export default memo(ListingConfig);
