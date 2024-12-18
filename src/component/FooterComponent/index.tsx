import React from "react";
import "./styles.scss";

const FooterComponent: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        
        <div className="footer-column">
          <h3>Chính sách bán hàng</h3>
          <ul>
            <li>Chính sách bảo hành</li>
            <li>Chính sách mua hàng Online</li>
            <li>Chính sách bảo mật thông tin khách hàng</li>
          </ul>
        </div>

        
        <div className="footer-column">
          <h3>Tổng đài hỗ trợ</h3>
          <p>Hotline bán hàng: <strong>1900.633.909</strong></p>
          <p>Hotline bảo hành, kỹ thuật: <strong>1900.633.909</strong></p>
          <p>Hotline hỗ trợ phần mềm: <strong>1900.633.909</strong></p>
          <p>Hotline tư vấn trả góp: <strong>0866.779.177</strong></p>
          <p>Hotline phản ánh chất lượng dịch vụ: <strong>0981.000.731</strong></p>
        </div>

        
        <div className="footer-column">
          <h3>Khu vực</h3>
          <p>
            <span className="area">MIỀN BẮC</span> |{" "}
            <span className="area active">NGHỆ AN - ĐÀ NẴNG</span> |{" "}
            <span className="area">MIỀN NAM</span>
          </p>
          <p>161 Hàm Nghi, Q.Thanh Khê, TP.Đà Nẵng: <strong>0799.101.799</strong> - <a href="#">Bản đồ đường đi</a></p>
          <p>233 Lê Duẩn, TP Vinh, Nghệ An: <strong>0989.961.233</strong> - <a href="#">Bản đồ đường đi</a></p>
        </div>
      </div>

      
      <div className="footer-bottom">
        <p>© 2013 ~ 2024 - Công ty TNHH & XNK Phone VN. GPKD số 0106081880 do Sở KH & ĐT Thành phố Hà Nội cấp ngày 10/01/2013</p>
      </div>
    </footer>
  );
};

export default FooterComponent;
