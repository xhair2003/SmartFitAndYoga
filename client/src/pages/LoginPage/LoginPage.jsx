import React from "react";
import * as Components from './Components';
import { FaGooglePlusG, FaFacebookF } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";
import './LoginPage.css';

const LoginPage = () => {
    const [signIn, toggle] = React.useState(true);
    return (
        <Components.Background>
            <Components.Container>
                <Components.SignUpContainer signinIn={signIn}>
                    <Components.Form>
                        <Components.Title>Create Account</Components.Title>
                        <Components.SocialButtons>
                            <Components.SocialButton>
                                <FaGooglePlusG />
                            </Components.SocialButton>
                            <Components.SocialButton>
                                <FaFacebookF />
                            </Components.SocialButton>
                            <Components.SocialButton>
                                <FaXTwitter />
                            </Components.SocialButton>
                        </Components.SocialButtons>
                        <Components.Retitle href='#'>or use your Phone number/Email for registeration</Components.Retitle>
                        <Components.Input type='email' placeholder='Phone number or Email' />
                        <Components.Input type='password' placeholder='Password' />
                        <Components.Input type='repassword' placeholder='Re-Password' />
                        <Components.Button>Sign Up</Components.Button>
                    </Components.Form>
                </Components.SignUpContainer>

                <Components.SignInContainer signinIn={signIn}>
                    <Components.Form>
                        <Components.Title>Sign In</Components.Title>
                        <Components.SocialButtons>
                            <Components.SocialButton>
                                <FaGooglePlusG />
                            </Components.SocialButton>
                            <Components.SocialButton>
                                <FaFacebookF />
                            </Components.SocialButton>
                            <Components.SocialButton>
                                <FaXTwitter />
                            </Components.SocialButton>
                        </Components.SocialButtons>
                        <Components.Retitle href='#'>or use your Phone number/Email and password</Components.Retitle>
                        <Components.Input type='email' placeholder='Email' />
                        <Components.Input type='password' placeholder='Password' />
                        <Components.Anchor href='#'>Forgot your password?</Components.Anchor>
                        <Components.Button>Sign In</Components.Button>
                    </Components.Form>
                </Components.SignInContainer>

                <Components.OverlayContainer signinIn={signIn}>
                    <Components.Overlay signinIn={signIn}>
                        <Components.LeftOverlayPanel signinIn={signIn}>
                            <Components.Title>Welcome Back!</Components.Title>
                            <Components.Paragraph>
                                Enter your personal details to use all of site features
                            </Components.Paragraph>
                            <Components.GhostButton onClick={() => toggle(true)}>
                                Sign In
                            </Components.GhostButton>
                        </Components.LeftOverlayPanel>

                        <Components.RightOverlayPanel signinIn={signIn}>
                            <Components.Title>Hello, Friend!</Components.Title>
                            <Components.Paragraph>
                                Register with your personal details to use all of site features
                            </Components.Paragraph>
                            <Components.GhostButton onClick={() => toggle(false)}>
                                Sign Up
                            </Components.GhostButton>
                        </Components.RightOverlayPanel>
                    </Components.Overlay>
                </Components.OverlayContainer>
            </Components.Container>
        </Components.Background>
    );
};

export default LoginPage;
