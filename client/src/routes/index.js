import LandingPage from "../pages/LandingPage/LandingPage.jsx";
import LoginPage from "../pages/LoginPage/LoginPage.jsx";
import ErrorPage from "../pages/ErrorPage/ErrorPage.jsx";
import HomePage from "../pages/HomePage/HomePage.jsx";
import AboutPage from "../pages/AboutPage/AboutPage.jsx";
import NutritionPlan from "../pages/NutritionPlansPage/NutritionPlan.jsx";

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
    {   
        id: 3,
        path: '/',
        page: HomePage,
    },
    {   
        id: 4,
        path: '/home',
        page: HomePage,
    },
    {   
        id: 5,
        path: '/about',
        page: AboutPage,
    },
    {   
        id: 6,
        path: '/plans',
        page: NutritionPlan,
    },
    {   
        id: 8,
        path: '*',
        page: ErrorPage,
    },
];
