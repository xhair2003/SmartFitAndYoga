import React, { useState } from 'react';
import * as Components from './AuthStyles';
import { useNavigate } from "react-router-dom";

const UpdatePasswordPage = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const passwordChange = (event) => {
        setPassword(event.target.value);
    };
    const confirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        console.log(password, confirmPassword);
        navigate('/login');
    };
    return (
        <Components.Container>
            <Components.Title>New Password</Components.Title>
            <Components.Subtitle>Enter the 6-digit password</Components.Subtitle>
            <Components.ItemContainer>
                Password *
                <Components.Input
                    type="text"
                    value={password}
                    onChange={passwordChange}
                    placeholder="new password"
                    required
                />
                Confirm Password *
                <Components.Input
                    type="text"
                    value={confirmPassword}
                    onChange={confirmPasswordChange}
                    placeholder="confirm password"
                    required
                />
            </Components.ItemContainer>
            <Components.Button onClick={submitHandler} href="/login">Update Password</Components.Button>
            <Components.Link href="/login">Back to login</Components.Link>
        </Components.Container>
    );
};

export default UpdatePasswordPage;
