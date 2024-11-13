import React, { useState } from 'react';
import * as Components from './AuthStyles';
import { useNavigate } from "react-router-dom";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const submitHandler = (event) => {
    event.preventDefault();
    console.log('Sending OTP to:', email);
    navigate('/verify-otp');
  };

  return (
    <Components.Container>
      <Components.Title>Forgot your password</Components.Title>
      <Components.Subtitle>Enter your registered email we will send a 6-digit OTP</Components.Subtitle>
        <Components.ItemContainer>
          Email *
          <Components.Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="enter your email"
            required
          />
        </Components.ItemContainer>
        <Components.Button onClick={submitHandler} href="/verify-otp">Send OTP</Components.Button>
      <Components.Link href="/login">Back to login</Components.Link>
    </Components.Container>
  );
};

export default ForgotPasswordPage;