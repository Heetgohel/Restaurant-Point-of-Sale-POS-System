// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TableEntry from "./pages/TableEntery";
import Menu from "./pages/Menu";
import OrderSuccess from "./pages/OrderSuccess";
import Cart from './pages/Cart'; 
import Bill from './pages/Bill';
// import OrderHistory from './pages/OrderHistory';
import Start from "./pages/Start";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TableEntry />} />
        <Route path="/start" element={<Start />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/bill" element={<Bill />} />
      </Routes>
    </Router>
  );
}

export default App;
