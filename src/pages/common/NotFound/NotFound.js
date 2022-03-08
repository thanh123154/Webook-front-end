import { Result } from "antd";

export default function NotFound() {
  return (
    <div className="container">
      <Result
        status="404"
        title="404"
        subTitle="Rất tiếc, trang bạn tìm kiếm không tồn tại!"
      />
    </div>
  );
}
