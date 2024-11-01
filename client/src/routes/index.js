import LandingPage from "../pages/LandingPage/LandingPage.jsx";
import LoginPage from "../pages/LoginPage/LoginPage.jsx";
import NutritionPlansPage from "../pages/NutritionPlansPage/NutritionPlan.jsx"
import WorkoutPlansPage from "../pages/WorkoutPlansPage/WorkoutPlan.jsx"

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
        path: '/nutrition',
        page: NutritionPlansPage,
    },
    {   
        id: 4,
        path: '/workout',
        page: WorkoutPlansPage,
    },
    
];
