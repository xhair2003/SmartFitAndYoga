import styled from 'styled-components';

export const Container = styled.div`
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h2`
  color: #98FF14;
  font-size: 1.8rem;
  font-weight: 600;
`;

export const Subtitle = styled.p`
  color: gray;
  font-size: 12px;
`;

export const OtpContainer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  width: 100%;
  gap: 1rem;
  text-align: center;
`;

export const OtpInput = styled.input`
  width: 40px;
  height: 40px;
  text-align: center;
  font-size: 18px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 0;
  font-weight: 600;
  transition: border-color 0.3s;
  
  &:focus {
    border-color: #98FF14;
    outline: none;
  }
  
  &:disabled {
    background-color: #f0f0f0;
  }
`;

export const Input = styled.input`
  margin-top: 8px;
  padding: 12px 16px;
  width: 100%;
  max-width: 400px;
  outline: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.2s;
  text-align: left;

  &::placeholder {
    color: #000;
    opacity: 1;
  }

  &:focus {
    border-color: #98FF14;
    outline: none;
  }
`;


export const Button = styled.button`
  background-color: ${(props) => (props.secondary ? '#ccc' : '#007BFF')};
  color: ${(props) => (props.secondary ? '#333' : 'white')};
  margin-top: 20px;
  padding: 12px 25px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%;
  max-width: 300px;

  &:hover {
    background-color: ${(props) =>
      props.secondary ? '#888' : '#0056b3'};
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const Timer = styled.div`
  color: #007BFF;
  font-size: 14px;
  padding: 1rem 0;
`;

export const Link = styled.a`
  display: block;
  margin-top: 10px;
  color: #007BFF;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

export const ErrorMessage = styled.p`
  color: #e74c3c;
  font-size: 14px;
  margin-top: 15px;
  text-align: center;
`;

export const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  
`;