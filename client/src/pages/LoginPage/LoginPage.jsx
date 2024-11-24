import React, { useState, useEffect } from "react";
import axios from "axios";
import * as Components from './LoginPageStyles';
import { FaFacebookF, FaGoogle } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";
import './LoginPage.css';
<<<<<<< HEAD
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
//import { GoogleLogin } from '@react-oauth/google';
=======
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
>>>>>>> cefe2b1d5a94b9f9d5539108e7d2a41638084db1

const LoginPage = () => {
    const navigate = useNavigate();
    const [signIn, toggle] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
<<<<<<< HEAD
=======
        //repassword: '', // Thêm repassword
>>>>>>> cefe2b1d5a94b9f9d5539108e7d2a41638084db1
    });

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            console.log(parsedUser);
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((state) => ({ ...state, [name]: value }));
    };

<<<<<<< HEAD
    // const handleGoogleSuccess = async (credentialResponse) => {
    //     try {
    //         const { credential } = credentialResponse;

    //         // Gửi token Google đến backend để xử lý
    //         const response = await axios.post('http://localhost:5000/api/auth/google-login', {
    //             token: credential,
    //         });

    //         // Xử lý dữ liệu trả về từ backend
    //         const { token: jwtToken, user } = response.data;

    //         // Lưu thông tin vào localStorage
    //         localStorage.setItem('token', jwtToken);
    //         localStorage.setItem('user', JSON.stringify(user));

    //         toast.success("Google login successful!");

    //         // Điều hướng đến trang chủ hoặc nơi cần thiết
    //         navigate('/home');
    //     } catch (error) {
    //         const data = error?.response?.data;
    //         toast.error(data?.message || "Google login failed. Please try again.");
    //     }
    // };

    // const handleGoogleError = () => {
    //     toast.error("Google login failed. Please try again.");
    // };

    const handleSignUp = async (e) => {
        e.preventDefault();
        const { name, email, password, } = formData;

        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
            const { token, user } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            if (response.status === 201) {
                toast.success("Account created successfully!");
                toggle(true); // Chuyển sang giao diện Sign In sau khi đăng ký thành công
=======
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
>>>>>>> cefe2b1d5a94b9f9d5539108e7d2a41638084db1
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to register. Please try again.");
        }
    };

<<<<<<< HEAD
    const handleSignIn = async (e) => {
        e.preventDefault();
        const { email, password } = formData;

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            const { token, user } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            toast.success("Login successful!");
            navigate('/home');
        } catch (error) {
            toast.error("Login failed. Please check your credentials.");
        }
    };

    const handleSubmit = (e) => {
        if (signIn) {
            handleSignIn(e);
        } else {
            handleSignUp(e);
=======
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
>>>>>>> cefe2b1d5a94b9f9d5539108e7d2a41638084db1
        }
    };

    return (
        <Components.Background>
            <Components.Container>
                {/* Sign Up Container */}
                <Components.SignUpContainer signinIn={signIn}>
                    <Components.Form onSubmit={handleSubmit}>
                        <Components.Title1>Create Account</Components.Title1>
                        <Components.SocialButtons>
                            {/* <Components.SocialButton>
                                <FaGoogle />
                                <GoogleLogin
                                    onSuccess={handleGoogleSuccess}
                                    onError={handleGoogleError}
                                />
                            </Components.SocialButton> */}
                            <Components.SocialButton><FaFacebookF /></Components.SocialButton>
                            <Components.SocialButton><FaXTwitter /></Components.SocialButton>
                        </Components.SocialButtons>
                        <Components.Retitle href='#'>or use your Phone number/Email for registration</Components.Retitle>
                        <Components.Input
                            type='text'
                            placeholder='Name'
                            name='name'
                            onChange={handleInputChange}
                        />
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
                        <Components.Button type="submit">Sign Up</Components.Button>
                    </Components.Form>
                </Components.SignUpContainer>

                {/* Sign In Container */}
                <Components.SignInContainer signinIn={signIn}>
                    <Components.Form onSubmit={handleSubmit}>
                        <Components.Title1>Sign In</Components.Title1>
                        <Components.SocialButtons>
                            <Components.SocialButton><FaGoogle /></Components.SocialButton>
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
                        <Components.Anchor href='/forgot-password'>Forgot your password?</Components.Anchor>
                        <Components.Button type="submit">Sign In</Components.Button>
                    </Components.Form>
                </Components.SignInContainer>

                {/* Overlay Panels */}
                <Components.OverlayContainer signinIn={signIn}>
                    <Components.Overlay signinIn={signIn}>
                        <Components.LeftOverlayPanel signinIn={signIn}>
                            <Components.Title2>Welcome Back!</Components.Title2>
                            <Components.Paragraph>Enter your personal details to use all site features</Components.Paragraph>
                            <Components.GhostButton onClick={() => toggle(true)}>Sign In</Components.GhostButton>
                        </Components.LeftOverlayPanel>

                        <Components.RightOverlayPanel signinIn={signIn}>
                            <Components.Title2>Hello, Friend!</Components.Title2>
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
