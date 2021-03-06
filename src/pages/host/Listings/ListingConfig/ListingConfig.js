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
        { name: fields.GALLERY, errors: ["H??y t???i l??n ??t nh???t 3 b???c ???nh"] },
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
      title={!isEditListing ? "T???o m???i n??i ???" : "Ch???nh s???a n??i ???"}
      onClose={onClose}
      width={800}
      footer={
        <Row gutter={10}>
          <Col>
            <Button onClick={onClose} danger>
              {!isEditListing ? "Hu??? b???" : "Quay l???i"}
            </Button>
          </Col>

          <Col>
            <Button
              onClick={() => form.submit()}
              type="primary"
              loading={isLoading}
            >
              {!isEditListing ? "T???o m???i" : "L??u thay ?????i"}
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
              label="T??n n??i ???"
              rules={[{ required: true, message: "H??y ??i???n t??n n??i ???" }]}
            >
              <Input placeholder="??i???n t??n n??i ???" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              name={fields.PRICE}
              label="Gi??/????m"
              rules={[
                { required: true, message: "H??y ??i???n gi??/????m" },
                {
                  pattern: /^[+]?\d+([.]\d+)?$/,
                  message: "H??y ??i???n s??? h???p l???",
                },
              ]}
            >
              <Input placeholder="??i???n gi?? n??i ???" addonAfter="??" />
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
          label="?????a ch??? chi ti???t"
          rules={[{ required: true, message: "H??y ??i???n ?????a ch??? chi ti???t" }]}
        >
          <Input placeholder="S??? nh??, ng??/h???m/ng??ch..." />
        </Form.Item>

        <Form.Item
          name={fields.DETAIL}
          label="M?? t???"
          rules={[
            {
              required: true,
              message: "H??y ??i???n m?? t??? n??i ???",
            },
          ]}
        >
          <Input.TextArea placeholder="??i???n m?? t??? n??i ???" rows={4} />
        </Form.Item>

        <Row align="middle" gutter={10}>
          <Col span={6}>
            <Form.Item
              name={fields.GUESTS}
              label="S??? l?????ng kh??ch"
              initialValue="1"
              rules={[
                {
                  required: true,
                  message: "H??y ??i???n s??? l?????ng kh??ch",
                },
                {
                  pattern: /^[+]?\d+([.]\d+)?$/,
                  message: "H??y ??i???n s??? h???p l???",
                },
              ]}
            >
              <Input type="number" min="1" placeholder="??i???n s??? l?????ng kh??ch" />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              name={fields.BEDROOMS}
              label="S??? ph??ng ng???"
              initialValue="1"
              rules={[
                {
                  required: true,
                  message: "H??y ??i???n s??? ph??ng ng???",
                },
                {
                  pattern: /^[+]?\d+([.]\d+)?$/,
                  message: "H??y ??i???n s??? h???p l???",
                },
              ]}
            >
              <Input type="number" min="1" placeholder="??i???n s??? ph??ng ng???" />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              name={fields.BATHROOMS}
              label="S??? ph??ng t???m"
              initialValue="1"
              rules={[
                {
                  required: true,
                  message: "H??y ??i???n s??? ph??ng t???m",
                },
                {
                  pattern: /^[+]?\d+([.]\d+)?$/,
                  message: "H??y ??i???n s??? h???p l???",
                },
              ]}
            >
              <Input type="number" min="1" placeholder="??i???n s??? ph??ng t???m" />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              name={fields.BEDS}
              label="S??? gi?????ng ng???"
              initialValue="1"
              rules={[
                {
                  required: true,
                  message: "H??y ??i???n s??? gi?????ng ng???",
                },
                {
                  pattern: /^[+]?\d+([.]\d+)?$/,
                  message: "H??y ??i???n s??? h???p l???",
                },
              ]}
            >
              <Input type="number" min="1" placeholder="??i???n s??? gi?????ng ng???" />
            </Form.Item>
          </Col>
        </Row>

        <Row align="middle" gutter={10}>
          <Col span={8}>
            <Form.Item
              name={fields.PLACE}
              label="Lo???i h??nh n??i ???"
              rules={[
                {
                  required: true,
                  message: "??i???n ch???n lo???i h??nh n??i ???",
                },
              ]}
            >
              <Select placeholder="Ch???n lo???i h??nh n??i ???" showSearch>
                {placeList.map((item) => (
                  <Select.Option key={item.id} value={JSON.stringify(item)}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={16}>
            <Form.Item name={fields.AMENITY} label="Ti???n ??ch">
              <Select
                placeholder="Ch???n c??c ti???n ??ch"
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

        <Form.Item name={fields.GALLERY} label="B??? s??u t???p ???nh">
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
