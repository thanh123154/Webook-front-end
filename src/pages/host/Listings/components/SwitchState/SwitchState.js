import { Modal } from "antd";
import { forwardRef, useImperativeHandle, useState } from "react";

const SwitchState = forwardRef(({ onSwitch }, ref) => {
  const [visible, setVisible] = useState(false);
  const [listing, setListing] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useImperativeHandle(ref, () => ({
    open(data) {
      setListing(data);
      setVisible(true);
    },
  }));

  const onClose = () => {
    setListing({});
    setIsLoading(false);
    setVisible(false);
  };

  const onOk = () => {
    setIsLoading(true);
    onSwitch(listing.id, { active: !listing.active }).then(() => onClose());
  };

  return (
    <Modal
      visible={visible}
      onCancel={onClose}
      onOk={onOk}
      okText="Xác nhận"
      cancelText="Quay lại"
      title="Chuyển trạng thái nơi ở"
      confirmLoading={isLoading}
    >
      <p>
        Bạn có chắc chắn muốn chuyển trạng thái nơi ở này sang thành{" "}
        {listing.active ? `"Tạm dừng"` : `"Hoạt động"`} chứ ?
      </p>
    </Modal>
  );
});

export default SwitchState;
