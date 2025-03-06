import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import Register from "./pages/Register";
import MainPage from "./pages/MainPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPage/>} />
                <Route path="/register/customer" element={<Register />} />
                <Route path="/register/admin" element={<Register />} />
                <Route path="/admin-login" element={<AdminLogin />} />
            </Routes>
        </Router>
    );
}

export default App;
