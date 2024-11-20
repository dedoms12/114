import TopProductsSection from "../../Client/home-page/top-prod-section";

const TopSelling = () => {

  return (
    <div className="border rounded bg-white shadow-lg my-5">
      <div className="m-6">
        {/* <h1 className="text-xl font-bold text-gray-800 m-3">Top Selling</h1> */}
        <TopProductsSection />
      </div>
    </div>
  );
};

export default TopSelling;