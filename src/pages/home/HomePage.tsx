import ProductPage from "../product/ProductPage";
import Advertisement from "../advertisement/Advertisement";
import "./styles.scss"
import AccessoryPage from "../accessory/AccessoryPage";


const HomePage = () => {
  return <div className="home-page">
    <Advertisement></Advertisement>
    <ProductPage></ProductPage>

    <div className="Tet-advertising">
      <h3>Tết như ý</h3>
      <img src="https://cdn2.fptshop.com.vn/unsafe/480x0/filters:quality(100)/H3_405x175_4fdc4f2fc6.png" alt="" />
      <img src="https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:quality(100)/H2_614x212_7_a0209cd3f9.png" alt="" />
      <img src="https://cdn2.fptshop.com.vn/unsafe/828x0/filters:quality(100)/H3_405x175_2_7cd0eb3667.png" alt="" />
    </div>
    <AccessoryPage></AccessoryPage>
  </div>;
};

export default HomePage;
