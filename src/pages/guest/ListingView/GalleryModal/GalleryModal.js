import { Modal, Image } from "antd";
import { forwardRef, useImperativeHandle, memo, useState } from "react";
import galleryModal from "./galleryModal.module.scss";

const GalleryModal = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const [galleryList, setGalleryList] = useState([]);

  useImperativeHandle(ref, () => ({
    open(data) {
      if (!!data) {
        setGalleryList(data);
      }
      setVisible(true);
    },
  }));

  const onClose = () => {
    setGalleryList([]);
    setVisible(false);
  };

  return (
    <Modal
      className={galleryModal["container"]}
      visible={visible}
      onCancel={onClose}
      width={1000}
      title="Ảnh nơi ở"
      footer={null}
      style={{ top: 0 }}
    >
      {galleryList.map((img, i) => (
        <Image src={img} alt={i} key={i} className={galleryModal["image"]} />
      ))}
    </Modal>
  );
});

export default memo(GalleryModal);
