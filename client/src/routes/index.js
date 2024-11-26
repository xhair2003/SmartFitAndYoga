import LoginPage from "../pages/LoginPage/LoginPage.jsx";
import ErrorPage from "../pages/ErrorPage/ErrorPage.jsx";
import HomePage from "../pages/HomePage/HomePage.jsx";
import AboutPage from "../pages/AboutPage/AboutPage.jsx";
import MealPlanPage from "../pages/MealPlansPage/MealPlan.jsx";
import ForgotPassword from "../pages/AuthPage/ForgotPasswordPage.jsx";
import VerifyOtpPage from "../pages/AuthPage/VerifyOtpPage.jsx";
import UpdatePasswordPage from "../pages/AuthPage/UpdatePasswordPage.jsx";
import CreatePage from "../pages/CreatePage/CreatePage.jsx";
import LoadingPage from "../pages/CreatePage/LoadingPage.jsx";
import WorkoutPlans from "../pages/WorkoutPlansPage/WorkoutPlan.jsx";
import UserProfilePage from "../pages/User/UserProfilePage.jsx"

export const routes = [
    {   
        id: 1,
        path: '/',
        page: HomePage,
    },
    {   
        id: 2,
        path: '/login',
        page: LoginPage,
    },
    {   
        id: 3,
        path: '/forgot-password',
        page: ForgotPassword,
    },
    {   
        id: 4,
        path: '/forgot-password/verify-otp',
        page: VerifyOtpPage,
    },
    {   
        id: 5,
        path: '/forgot-password/verify-otp/update-password',
        page: UpdatePasswordPage,
    },
    {   
        id: 6,
        path: '/create',
        page: CreatePage,
    },
    {   
        id: 7,
        path: '/loading',
        page: LoadingPage,
    },
    {   
        id: 8,
        path: '/home',
        page: HomePage,
    },
    {   
        id: 9,
        path: '/about',
        page: AboutPage,
    },
    {   
        id: 10,
        path: '/plans',
        page: MealPlanPage,
    },
    {   
        id: 11,
        path: '/workout-plans',
        page: WorkoutPlans,
    },
    {   
        id: 12,
        path: '/profile',
        page: UserProfilePage,
    },
    {   
        id: 13,
        path: '*',
        page: ErrorPage,
    },



];
