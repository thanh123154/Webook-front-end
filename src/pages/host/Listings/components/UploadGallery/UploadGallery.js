import { Upload, notification, Image, Spin } from "antd";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { storage } from "../../../../../firebase";
import { memo, useState } from "react";
import uploadGallery from "./uploadGallery.module.scss";
import cn from "classnames";

const UploadGallery = ({ gallery = [], setGallery }) => {
  const [isLoading, setIsLoading] = useState(false);

  const beforeUpload = (file) => {
    const isImage = file.type.indexOf("image/") === 0;
    if (!isImage) {
      notification.error({ message: "Chỉ được upload ảnh" });
    }

    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      notification.error({ message: "Kích thước ảnh phải nhỏ hơn 5MB" });
    }
    return isImage && isLt5M;
  };

  const customUpload = async ({ onError, onSuccess, file }) => {
    setIsLoading(true);

    try {
      const storageRef = storage.ref();
      const imgFile = storageRef.child(
        `images/listing/${file.name}_${new Date().getTime()}`
      );
      const image = await imgFile.put(file);

      await imgFile.getDownloadURL().then((url) => {
        console.log(url);
        let tempArr = [...gallery];
        tempArr.push(url);
        setGallery(tempArr);
      });

      onSuccess(null, image);
      console.log(`${file.name} is uploaded!`);

      setIsLoading(false);
    } catch (error) {
      onError(null, error);
      console.log(error);
    }
  };

  const handleDelete = (path) => {
    setGallery(gallery.filter((item) => item !== path));
  };

  return (
    <div className={uploadGallery["container"]}>
      <Spin spinning={isLoading} style={{ paddingRight: 15 }}>
        <Upload
          beforeUpload={beforeUpload}
          customRequest={customUpload}
          showUploadList={false}
        >
          <div className={cn(uploadGallery["cell"], uploadGallery["btn"])}>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Tải lên</div>
          </div>
        </Upload>
      </Spin>

      {gallery.map((path, i) => (
        <div key={i} className={uploadGallery["cell"]}>
          <Image src={path} className={uploadGallery["img"]} />

          <div
            className={uploadGallery["delete-btn"]}
            onClick={() => handleDelete(path)}
          >
            <CloseOutlined />
          </div>
        </div>
      ))}
    </div>
  );
};

export default memo(UploadGallery);
