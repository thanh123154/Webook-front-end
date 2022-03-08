import { Col, Row, Form, Select } from "antd";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import addressGetter from "../../helpers/addressGetter";

const AddressSelect = forwardRef(
  (
    {
      form,
      provinceName,
      districtName,
      wardName,
      required = false,
      readOnly = false,
    },
    ref
  ) => {
    const [provinceList, setProvinceList] = useState([]);
    const [districtList, setDistrictList] = useState([]);
    const [wardList, setWardList] = useState([]);
    const [provinceCode, setProvinceCode] = useState();
    const [districtCode, setDistrictCode] = useState();
    const [districtFixBug, setDistrictFixBug] = useState(false);
    const [wardFixBug, setWardFixBug] = useState(false);
    const [wardCode, setWardCode] = useState(null);
    const [isEdit, setIsEdit] = useState(false);

    useImperativeHandle(ref, () => ({
      initDataList(data) {
        setIsEdit(true);

        if (!!data[provinceName] && !provinceCode) {
          setProvinceCode(data[provinceName]);
        }
        if (!!data[districtName] && !districtCode) {
          setDistrictCode(data[districtName]);
        }
        if (!!data[wardName] && !wardCode) {
          setWardCode(data[wardName]);
        }
      },
      reset() {
        setDistrictFixBug(false);
        setWardFixBug(false);
        !!provinceCode && setProvinceCode();
        !!districtCode && setDistrictCode();
        !!wardCode && setWardCode();
        districtList.length > 0 && setDistrictList([]);
        wardList.length > 0 && setWardList([]);
      },
    }));

    useEffect(() => {
      addressGetter.getAllProvinces().then((provinces) => {
        setProvinceList(provinces);
      });
    }, []);

    useEffect(() => {
      if (!!provinceCode && provinceList.length > 0) {
        if (!districtFixBug) {
          addressGetter
            .getAllDistricts(provinceCode)
            .then((districts) => {
              setDistrictList(districts);
              if (isEdit) {
                let initD = districts.find(
                  (item) => item.code === districtCode
                );
                let initP = provinceList.find(
                  (item) => item.code === provinceCode
                );
                form.setFields([
                  {
                    name: districtName,
                    value: JSON.stringify(initD),
                  },
                  {
                    name: provinceName,
                    value: JSON.stringify(initP),
                  },
                ]);
              }
            })
            .then(() => setDistrictFixBug(true));
        } else {
          addressGetter
            .getAllDistricts(provinceCode)
            .then((districts) => {
              setDistrictList(districts);
              setWardList([]);
            })
            .then(() => {
              form.setFields([
                { name: districtName, value: undefined },
                { name: wardName, value: undefined },
              ]);
            });
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [provinceCode, provinceList]);

    useEffect(() => {
      if (!!districtCode) {
        addressGetter
          .getAllWards(districtCode)
          .then((wards) => {
            setWardList(wards);
            if (isEdit) {
              let initW = wards.find((item) => item.code === wardCode);
              form.setFields([
                {
                  name: wardName,
                  value: JSON.stringify(initW),
                },
              ]);
            }
          })
          .then(() => {
            if (!wardFixBug) {
              setWardFixBug(true);
            } else {
              form.setFields([{ name: wardName, value: undefined }]);
            }
          });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [districtCode]);

    const onChangeProvince = (value) => {
      const { code } = JSON.parse(value);
      setProvinceCode(code);
      setDistrictCode();
    };

    const onChangeDistrict = (value) => {
      const { code } = JSON.parse(value);
      setDistrictCode(code);
    };

    return (
      <Row gutter={10}>
        <Col span={8}>
          <Form.Item
            name={provinceName}
            label="Tỉnh/Thành phố"
            rules={[required && { required: true, message: "Hãy chọn đầy đủ" }]}
          >
            <Select
              showSearch
              onChange={onChangeProvince}
              disabled={readOnly}
              placeholder="Chọn tỉnh thành"
            >
              {provinceList.map((item) => (
                <Select.Option key={item.id} value={JSON.stringify(item)}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            name={districtName}
            label="Quận/Huyện"
            rules={[required && { required: true, message: "Hãy chọn đầy đủ" }]}
          >
            <Select
              showSearch
              onChange={onChangeDistrict}
              disabled={readOnly}
              placeholder="Chọn quận huyện"
            >
              {districtList.map((item) => (
                <Select.Option key={item.id} value={JSON.stringify(item)}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            name={wardName}
            label="Xã/phường"
            rules={[required && { required: true, message: "Hãy chọn đầy đủ" }]}
          >
            <Select showSearch disabled={readOnly} placeholder="Chọn xã phường">
              {wardList.map((item) => (
                <Select.Option key={item.id} value={JSON.stringify(item)}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
    );
  }
);

export default AddressSelect;
