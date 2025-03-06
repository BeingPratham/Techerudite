import { Link, useNavigate } from "react-router-dom";
import "./css/Main.css";

function MainPage() {
    

    return (
        <div className="main-container">
            
            <div className="button-group">
                <Link to="/register/customer"><button>Customer Registration</button></Link>
                <Link to="/register/admin"><button>Admin Registration</button></Link>
                <Link to="/admin-login"><button>Admin Login</button></Link>
            </div>
        </div>
    );
}

export default MainPage;
