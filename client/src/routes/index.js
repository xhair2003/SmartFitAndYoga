import LandingPage from "../pages/LandingPage/LandingPage.jsx";
import LoginPage from "../pages/LoginPage/LoginPage.jsx";
import HomePage from "../pages/HomePage/HomePage.jsx";
import NutritionPlansPage from "../pages/NutritionPlansPage/NutritionPlan.jsx"


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
        path: '/home',
        page: HomePage,
    },
    {   
        id: 4,
        path: '/nutrition',
        page: NutritionPlansPage,
    },

    
];
