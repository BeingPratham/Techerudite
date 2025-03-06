import { useState } from "react";
import { registerUser } from "../apis/Api";
import "./css/Auth.css";
import { useLocation } from "react-router-dom";

function Register() {
    const location = useLocation();
    const isCustomer = location.pathname.includes("/register/customer"); 
    const role = isCustomer ? "customer" : "admin";

    const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "" });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUser({ ...form, role });
            alert(`${role.charAt(0).toUpperCase() + role.slice(1)} registered successfully!`);
            setForm({ firstName: "", lastName: "", email: "", password: "" }); 
        } catch (error) {
            alert("Registration failed!");
        }
    };

    return (
        <div className="auth-container">
            <h2>{isCustomer ? "Customer" : "Admin"} Registration</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} required />
                <input type="text" name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
                <button type="submit" className="submit-btn">Register as {isCustomer ? "Customer" : "Admin"}</button>
            </form>
        </div>
    );
}

export default Register;
