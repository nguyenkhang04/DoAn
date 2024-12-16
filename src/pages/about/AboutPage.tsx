import React from "react";
import "./styles.scss";

const AboutPage = () => {
  return (
    <div className="about-page">
      <h1>Chính sách bảo hành - Cam Kết Hỗ Trợ Khách Hàng Tối Đa</h1>
      <hr />
      <p>
        Phone VN rất tiếc và xin lỗi vì sự bất tiện của Quý khách khi sản phẩm
        không may phát sinh lỗi phải bảo hành. Hi vọng chi tiết chính sách đổi
        trả , bảo hành tại CLICKBUY cũng như thông tin liên hệ các bộ phận hỗ
        trợ dưới đây có thể giúp Quý khách yên tâm hơn trong quá trình sử dụng
        sản phẩm.
      </p>
      <p>Hotline khiếu nại về sản phẩm dịch vụ: 0981631267</p>
      <p>Hotline tiếp nhận bảo hành: 0981631267</p>
      <h4>I. QUY ĐỊNH VỀ ĐỔI TRẢ SẢN PHẨM</h4>
      <img
        src="https://clickbuy.com.vn/uploads/images/2023/10/bao-hanh.png"
        alt="chinh sach bao hanh"
      />
      <hr />
      <h4>Điều kiện tiếp nhận đổi trả sản phẩm:</h4>
      <div className="condition">
        <p> Máy Như mới, không xước xát, không dán decal, hình trang trí </p>
        <p> Máy cũ: có tình trạng sản phẩm như lúc mới mua</p>
        <p>
          Hộp: Như mới, không móp méo, rách, vỡ, bị viết, vẽ, quấn băng dính,
          keo; có Serial/IMEI trên hộp trùng với thân máy.
        </p>
        <p>
          Phụ kiện và quà tặng: Còn đầy đủ, nguyên vẹn, không móp méo xước xát
          hoặc bị hư hại trong quá trình sử dụng. Phụ kiện theo hộp bảo hành 1
          đổi 1 theo thời gian bao test sản phẩm.
        </p>
        <p>
          Tài khoản: Máy đã đã được đăng xuất khỏi tất cả các tài khoản như:
          iCloud, Google Account, Mi Account…
        </p>
      </div>
      <p>
        Các lỗi từ NSX cần được xác định bởi trung tâm bảo hành chính hãng hoặc
        trung tâm bảo hành uỷ quyền Lỗi từ phía Nhà sản xuất là các lỗi bao gồm:
        Lỗi nguồn, lỗi trên mainboard, ổ cứng, màn hình và các linh kiện phần
        cứng bên trong Lỗi điểm chết màn hình : màn hình có từ 3 điểm chết trở
        lên hoặc 1 điểm chết có kích thước lớn hơn 1mm đối với điện thoại và từ
        5 điểm chết trở lên đối với laptop, màn hình rời Nếu sản phẩm quý khách
        không đủ những điều kiện trên, Clickbuy có quyền từ chối đổi mới hoặc
        nhập lại. Lưu ý: Trong trường hợp khách mua điện thoại mới, trong thời
        gian bao test máy bị lỗi nếu máy đã bị trầy xước, Clickbuy sẽ từ chối
        đổi máy mà nhận lại bảo hành theo các gói bảo hành khách hàng đã lựa
        chọn. Ngoài thời gian đổi mới như trên, vấn đề nhập lại máy giá sẽ theo
        thõa thuận giữa cửa hàng và khách hàng
      </p>
    </div>
  );
};

export default AboutPage;
