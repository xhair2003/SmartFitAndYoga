import React, { useState } from "react";
import * as Components from './LoginPageStyles';
import { FaGooglePlusG, FaFacebookF } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";
import './LoginPage.css';
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from 'axios';

const LoginPage = () => {
    const navigate = useNavigate();
    const [signIn, toggle] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        repassword: '', // Đã thêm trường repassword
    });
    //const [setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((state) => ({ ...state, [name]: value }));
    };

    const handleSignup = async () => {
        // Kiểm tra xem email và mật khẩu có được nhập hay không
        if (!formData.email || !formData.password) {
            toast.error("Email và mật khẩu là bắt buộc!");
            return;
        }
    
        try {
            // Gửi yêu cầu đăng ký đến máy chủ
            await axios.post("http://localhost:5000/api/auth/signup", {
                email: formData.email,
                password: formData.password,
            });
    
            // Thông báo thành công
            toast.success("Signup success! Please signin.");
            
            // Chuyển hướng đến trang đăng nhập hoặc trang chính
            // navigate('/login');
        } catch (error) {
            console.error("Lỗi đăng ký:", error);
            // Lấy thông báo lỗi từ phản hồi hoặc hiển thị thông báo chung
            const errorMessage = error.response?.data?.error || error.message || "An error occurred. Please try again.";
            toast.error(errorMessage);
        }
    };

    const handleSignin = async () => {
        if (!formData.email || !formData.password) {
            toast.error("Email and password are required!");
            return;
        }
    
        try {
            const { data } = await axios.post("http://localhost:5000/api/auth/signin", {
                email: formData.email,
                password: formData.password,
            });
    
            toast.success("Signin success");
            localStorage.setItem("token", data.token);
            localStorage.setItem("refreshToken", data.refreshToken);
    
            navigate('/home');
        } catch (error) {
            console.error("Signin error:", error);
            const errorMessage = error.response?.data?.error || error.message || "An error occurred. Please try again.";
            toast.error(errorMessage);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/auth/signin", {
                email: formData.email,
                password: formData.password,
                level: 0,
            });
    
            navigate('/home');
        } catch (error) {
            console.error("Lỗi đăng nhập:", error);
            const errorMessage = error.response?.data?.error || error.message || "An error occurred. Please try again.";
            toast.error(errorMessage);
        }
    };

    return (
        <Components.Background>
            <Components.Container>
                {/* Sign Up Container */}
                <Components.SignUpContainer >
                    <Components.Form onSubmit={handleSignup}>
                        <Components.Title>Create Account</Components.Title>
                        <Components.SocialButtons>
                            <Components.SocialButton><FaGooglePlusG /></Components.SocialButton>
                            <Components.SocialButton><FaFacebookF /></Components.SocialButton>
                            <Components.SocialButton><FaXTwitter /></Components.SocialButton>
                        </Components.SocialButtons>
                        <Components.Retitle href='#'>or use your Phone number/Email for registration</Components.Retitle>
                        <Components.Input
                            type='email'
                            placeholder='Phone number or Email'
                            name='email'
                            onChange={handleInputChange}
                        />
                        <Components.Input
                            type='password'
                            placeholder='Password'
                            name='password'
                            onChange={handleInputChange}
                        />
                        <Components.Input
                            type='password'
                            placeholder='Re-Password'
                            name='repassword'
                            onChange={handleInputChange}
                        />
                        <Components.Button type="submit">Sign Up</Components.Button>
                    </Components.Form>
                </Components.SignUpContainer>

                {/* Sign In Container */}
                <Components.SignInContainer signinIn={signIn}>
                    <Components.Form onSubmit={handleSubmit}>
                        <Components.Title>Sign In</Components.Title>
                        <Components.SocialButtons>
                            <Components.SocialButton><FaGooglePlusG /></Components.SocialButton>
                            <Components.SocialButton><FaFacebookF /></Components.SocialButton>
                            <Components.SocialButton><FaXTwitter /></Components.SocialButton>
                        </Components.SocialButtons>
                        <Components.Retitle href='#'>or use your Phone number/Email and password</Components.Retitle>
                        <Components.Input
                            type='email'
                            placeholder='Email'
                            name='email'
                            onChange={handleInputChange}
                        />
                        <Components.Input
                            type='password'
                            placeholder='Password'
                            name='password'
                            onChange={handleInputChange}
                        />
                        <Components.Anchor href='#' onClick={() => navigate('/forgot-password')}>Forgot your password?</Components.Anchor>
                        <Components.Button onClick={handleSignin}>Sign In</Components.Button>
                    </Components.Form>
                </Components.SignInContainer>

                {/* Overlay Panels */}
                <Components.OverlayContainer signinIn={signIn}>
                    <Components.Overlay signinIn={signIn}>
                        <Components.LeftOverlayPanel signinIn={signIn}>
                            <Components.Title>Welcome Back!</Components.Title>
                            <Components.Paragraph>Enter your personal details to use all site features</Components.Paragraph>
                            <Components.GhostButton onClick={() => toggle(true)}>Sign In</Components.GhostButton>
                        </Components.LeftOverlayPanel>

                        <Components.RightOverlayPanel signinIn={signIn}>
                            <Components.Title>Hello, Friend!</Components.Title>
                            <Components.Paragraph>Register to use all site features</Components.Paragraph>
                            <Components.GhostButton onClick={() => toggle(false)}>Sign Up</Components.GhostButton>
                        </Components.RightOverlayPanel>
                    </Components.Overlay>
                </Components.OverlayContainer>
            </Components.Container>
        </Components.Background>
    );
};

export default LoginPage;
