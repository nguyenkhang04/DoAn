import ProductPage from "../product/ProductPage";
import Advertisement from "../advertisement/Advertisement";


const HomePage = () => {
  return <div className="home-page">
    <Advertisement></Advertisement>
    <ProductPage></ProductPage>
  </div>;
};

export default HomePage;
