import LoginPage from "../pages/LoginPage/LoginPage.jsx";
import ErrorPage from "../pages/ErrorPage/ErrorPage.jsx";
import HomePage from "../pages/HomePage/HomePage.jsx";
import LandingPage from "../pages/LandingPage/LandingPage.jsx";

export const routes = [
    {   
        id: 1,
        path: '/login',
        page: LoginPage,
    },

    {   
        id: 2,
        path: '/',
        page: HomePage,
    },

    {   
        id: 5,
        path: '/home',
        page: HomePage,
    },


    {   
        id: 3,
        path: '/landing',
        page: LandingPage,
    },

    {   
        id: 4,
        path: '*',
        page: ErrorPage,
    },


];
