import React, { useState } from "react";
import * as Components from './LoginPageStyles';
import { FaGooglePlusG, FaFacebookF } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";
import './LoginPage.css';
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const LoginPage = () => {
    const navigate = useNavigate();
    const [signIn, toggle] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        //repassword: '', // Thêm repassword
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSignup = async () => {
        // Kiểm tra đầu vào
        if (!formData.email || !formData.password || !formData.repassword) {
            alert("All fields are required!");
            return;
        }
        if (formData.password !== formData.repassword) {
            alert("Passwords do not match!");
            return;
        }
        try {
            const response = await fetch("http://localhost:5000/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                })
            });
            const data = await response.json();
            if (response.ok) {
                toast.success("Sign up successful!");
                toggle(true); // Chuyển về trang đăng nhập sau khi đăng ký thành công
            } else {
                alert(data.error || "Sign up failed.");
            }
        } catch (error) {
            console.error("Signup error:", error);
            alert("An error occurred during signup.");
        }
    };

    const handleSignin = async () => {
        // Kiểm tra đầu vào
        if (!formData.email || !formData.password) {
            alert("Both email and password are required!");
            return;
        }
        try {
            const response = await fetch("http://localhost:5000/api/auth", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                })
            });

            const data = await response.json();
            console.log("Response data:", data); // Log phản hồi từ server
            //console.log("formData:", formData);

            if (response.ok) {
                toast.success("Sign in successful!");
                navigate('/home');
            } else {
                alert(data.error || "Login failed. Please check your credentials.");
            }
        } catch (error) {
            console.error("Signin error:", error);
            alert("An error occurred during login. Please try again later.");
        }
    };

    return (
        <Components.Background>
            <Components.Container>
                {/* Sign Up Container */}
                <Components.SignUpContainer signinIn={signIn}>
                    <Components.Form>
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
                        <Components.Button onClick={handleSignup}>Sign Up</Components.Button>
                    </Components.Form>
                </Components.SignUpContainer>

                {/* Sign In Container */}
                <Components.SignInContainer signinIn={signIn}>
                    <Components.Form>
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
