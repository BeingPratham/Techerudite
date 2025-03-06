import { useState } from "react";
import { adminLogin } from "../apis/Api";
import "./css/Auth.css";

function AdminLogin() {
    const [form, setForm] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await adminLogin(form);
            alert(data.message);
            setForm({ email: "", password: "" }); 
        } catch (error) {
            alert(error.response.data.message || "Login failed!");
        }
        
    };

    return (
        
        <div className="auth-container">
        <h2>Admin Login</h2>
        <form onSubmit={handleSubmit}>
            <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
             <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
             <button type="submit" className="submit-btn">Admin Login</button>
        </form>
        </div>
    );
}

export default AdminLogin;
