// client/src/pages/VerifyOtpPage/VerifyOtpPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import * as Components from './AuthStyles';
import './Auth.css';
import Timer from './Timer';
import { useNavigate } from "react-router-dom";

const VerifyOtpPage = () => {
  const navigate = useNavigate();

  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);
  const ref6 = useRef(null);

  const inputRef = [ref1, ref2, ref3, ref4, ref5, ref6];

  const [otp1, setOtp1] = useState('');
  const [otp2, setOtp2] = useState('');
  const [otp3, setOtp3] = useState('');
  const [otp4, setOtp4] = useState('');
  const [otp5, setOtp5] = useState('');
  const [otp6, setOtp6] = useState('');

  const otpArray = [setOtp1, setOtp2, setOtp3, setOtp4, setOtp5, setOtp6];

  //const [timer, setTimer] = useState(60); // 60 seconds countdown

  useEffect(() => {
    if (ref1.current) {
      ref1.current.focus();
    }

  }, []);

  const inputChange = (event, location) => {
    if (location < 5 && event.target.value) {
      inputRef[location + 1].current.focus();
    }
    otpArray[location](event.target.value);
  };

  const submitOtp = (event) => {
    event.preventDefault();
    console.log(otp1, otp2, otp3, otp4, otp5, otp6);
    navigate('/update-password');

  };

  return (
    <Components.Container>
      <Components.Title>Verify your OTP</Components.Title>
      <Components.Subtitle>Enter the 6-digit OTP we just sent to your email</Components.Subtitle>

      <Components.OtpContainer>
        {inputRef.map((item, index) => (
          <Components.OtpInput
            required
            key={index}
            ref={item}
            onChange={(event) => inputChange(event, index)}
            onKeyDown={(event) => {
              if (event.key === 'Backspace') {
                if (event.target.value === '' && index > 0) {
                  // Nếu ô hiện tại trống và không phải ô đầu tiên
                  inputRef[index - 1].current.focus();
                }
              }
            }}
            onInput={(event) => {
              const value = event.target.value;
              if (value.length > 1) {
                event.target.value = value.slice(0, 1);
              }
            }}
            type="number"
          />
        ))}
      </Components.OtpContainer>
      <Components.Button onClick={submitOtp} href="/update-password">Verify</Components.Button>
      <Components.Timer>
        <Timer/>
      </Components.Timer>
      <Components.Link href="/login">Back to login</Components.Link>
    </Components.Container>
  );
}

export default VerifyOtpPage;
