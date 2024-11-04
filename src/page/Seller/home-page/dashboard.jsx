import NavbarSeller from '../components/navbarSeller';
import Info from './info';
import Inventory from './inventory';
import TopSelling from './top-selling';

const Dashboard = () => {
  return (
    <div className="bg-gray-100">
      <NavbarSeller />
      <div className="p-6 max-w-7xl mx-auto sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold mx-6 mb-6">Dashboard</h1>
        <Info />
        <Inventory />
        <TopSelling />
      </div>
    </div>
  );
};

export default Dashboard;
