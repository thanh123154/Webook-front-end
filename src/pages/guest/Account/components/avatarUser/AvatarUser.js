import { Avatar, notification, Upload } from "antd";
import avatarUser from "./avatarUser.module.scss";
import { storage } from "../../../../../firebase";
import { useDispatch } from "react-redux";
import { doEditUser } from "../../../../../ducks/slices/authSlice";

export default function AvatarUser({ src, txt }) {
  const dispatch = useDispatch();

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
    try {
      const storageRef = storage.ref();
      const imgFile = storageRef.child(
        `images/user/${file.name}_${new Date().getTime()}`
      );
      const image = await imgFile.put(file);

      await imgFile.getDownloadURL().then((url) => {
        dispatch(doEditUser({ avatar: url }));
      });

      onSuccess(null, image);
      console.log(`${file.name} is uploaded!`);
    } catch (error) {
      onError(null, error);
      console.log(error);
    }
  };

  return (
    <div className={avatarUser["container"]}>
      <Upload
        listType="picture-card"
        showUploadList={false}
        maxCount={1}
        beforeUpload={beforeUpload}
        customRequest={customUpload}
        className={avatarUser["upload"]}
      >
        <Avatar size={150} src={src}>
          {txt}
        </Avatar>

        <div className={avatarUser["layer"]}>
          <span>Sửa</span>
        </div>
      </Upload>
    </div>
  );
}
