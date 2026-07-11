import logo from './logo.svg';
import './App.css';
import Login from './Components/Login';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from './Components/Dashboard';
import { useState } from "react";
import Invoice from './Components/Invoice';
import ProductList from './Components/Product/ProductList';
import InsertItem from './Components/AddItem/InsertItem';
import { ItemsProvider } from './Components/ItemContext/ItemsProvider';

function App() {
  const [isAuthenticated, setAuth] = useState(false);
  return (
    <ItemsProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login setAuth={setAuth} />} />
            {isAuthenticated ? (
              <>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/components/invoice" element={<Invoice />} />
                <Route path="/profile" element={<h2>Profile Page</h2>} />
                <Route path="/settings" element={<h2>Settings Page</h2>} />
                <Route path="/Components/Product/ProductList" element={<ProductList />} />
                <Route path="/Components/AddItem/InsertItem" element={<InsertItem />} />
              </>
            ) : (
              <Route path="*" element={<Navigate to="/" />} />
            )}
          </Routes>
        </Router>
    </ItemsProvider>
  );
}
export default App;
