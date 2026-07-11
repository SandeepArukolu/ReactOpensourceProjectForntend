
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-5">
      <ul>
        <li className="mb-2">
          <Link to="/dashboard" className="hover:text-gray-400">Home</Link>
        </li>
        <li className="mb-2">
          <Link to="/profile" className="hover:text-gray-400">Profile</Link>
        </li>
        <li className="mb-2">
          <Link to="/settings" className="hover:text-gray-400">Settings</Link>
        </li>
        <li className="mb-2">
          <Link to="/components/invoice" className="hover:text-gray-400">Invoice</Link>
        </li>
        <li className="mb-2">
          <Link to="/components/product/productList" className="hover:text-gray-400">Items</Link>
        </li>
        <li className="mb-2">
          <Link to="/components/addItem/insertItem" className="hover:text-gray-400">Add Item</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
