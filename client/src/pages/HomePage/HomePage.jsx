import React from 'react'; 
import Navbar from '../../Components/Navbar/Navbar.jsx';
// import Footer from '../../Components/Footer/Footer.jsx';
import { useNavigate } from "react-router-dom";


const HomePage = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Logic để xử lý đăng xuất
        console.log("Đã đăng xuất");
        navigate('/login');
    };

    return (
        <div>
            <Navbar />
            <div style={{ height: '120px', backgroundColor: 'black' }}></div>
            <button onClick={handleLogout} style={{ margin: '20px', padding: '10px' }}>
                Đăng xuất
            </button>
            {/* <Footer /> */}
        </div>
    );
};

export default HomePage;
