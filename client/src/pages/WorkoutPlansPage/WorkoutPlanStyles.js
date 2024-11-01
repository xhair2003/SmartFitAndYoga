import styled, { keyframes } from 'styled-components';

// Định nghĩa breakpoints cho responsive design
const breakpoints = {
  mobile: '480px',
  tablet: '768px',
  desktop: '1024px',
};

// Định nghĩa bảng màu chính cho toàn bộ component
export const colors = {
  background: '#1E1E1E',     // Màu nền chính
  text: '#FFFFFF',           // Màu chữ chính
  cardBackground: '#2A2A2A', // Màu nền cho các card
  secondaryText: '#B3B3B3',  // Màu chữ phụ
  accent: '#FFFFFF',         // Màu nhấn mạnh (xanh lá)
  accentHover: '#00CC00',    // Màu khi hover vào các phần tử có màu nhấn
  shadow: 'rgba(0, 255, 0, 0.2)', // Màu bóng đổ
};

// Hiệu ứng gradient động cho nền
const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Container chính cho toàn bộ trang
export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  background-color: ${colors.background};
  min-height: 100vh;
  background: linear-gradient(45deg, #1E1E1E, #2A2A2A, #1E1E1E);
  background-size: 200% 200%;
  animation: ${gradientAnimation} 10s ease infinite;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 20px 10px;
  }
`;

// Tiêu đề chính của trang
export const Title = styled.h1`
  color: ${colors.accent};
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 40px;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 0 0 10px ${colors.shadow};

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 36px;
    margin-bottom: 20px;
  }
`;

// Wrapper cho nội dung chính
export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  border-radius: 20px;
  padding: 30px;

  @media (max-width: ${breakpoints.tablet}) {
    padding: 20px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 15px;
  }
`;

// Container cho các nút chọn ngày
export const DaySelector = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  background-color: ${colors.cardBackground};
  border-radius: 15px;
  padding: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  overflow-x: auto;

  @media (max-width: ${breakpoints.tablet}) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

// Nút chọn ngày
export const DayButton = styled.button`
  background-color: ${props => props.isSelected ? colors.accent : 'transparent'};
  color: ${props => props.isSelected ? colors.background : colors.text};
  border: none;
  padding: 12px 20px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  margin: 5px;

  &:hover {
    background-color: ${props => props.isSelected ? colors.accentHover : colors.accent};
    color: ${colors.background};
    transform: translateY(-3px);
    box-shadow: 0 5px 10px ${colors.shadow};
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 14px;
    padding: 10px 15px;
  }
`;

// Grid layout cho các card kế hoạch
export const PlanGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 25px;

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }

  @media (max-width: ${breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

// Card hiển thị thông tin bài tập
export const PlanCard = styled.div`
  background-color: ${colors.cardBackground};
  border-radius: 15px;
  padding: 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: translateY(-10px) scale(1.03);
    box-shadow: 0 15px 30px ${colors.shadow};
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 20px;
  }
`;

// Tiêu đề của card bài tập
export const CardTitle = styled.h2`
  color: ${colors.accent};
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 15px;
  text-align: center;
  text-transform: uppercase;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 20px;
  }
`;

// Hiển thị thời lượng bài tập
export const CardDuration = styled.p`
  color: ${colors.text};
  font-size: 20px;
  font-weight: 500;
  background-color: rgba(0, 255, 0, 0.2);
  padding: 8px 15px;
  border-radius: 20px;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 16px;
  }
`;

// Phần hiển thị ngày đã chọn
export const DateSection = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
  margin-top: 30px;

  border-radius: 15px;
  padding: 20px;


  @media (max-width: ${breakpoints.mobile}) {
    padding: 15px;
    margin-top: 20px;
  }
`;

// Text hiển thị ngày đã chọn
export const DateItem = styled.p`
  color: ${colors.accent};
  font-size: 20px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 16px;
  }
`;


