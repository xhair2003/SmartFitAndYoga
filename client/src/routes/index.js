import LandingPage from "../pages/LandingPage/LandingPage.jsx";
import LoginPage from "../pages/LoginPage/LoginPage.jsx";

export const routes = [
    {   
        id: 1,
        path: '/',
        page: LandingPage,
    },
    {   
        id: 2,
        path: '/login',
        page: LoginPage,
    },

    
];
