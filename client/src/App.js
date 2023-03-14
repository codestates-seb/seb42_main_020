import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import Landing from './Pages/Landing/Landing';
import Section from './Components/Section/Section';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import DoctorSignup from './Pages/DoctorSignup/DoctorSignup';
import UserInfo from './Components/UserInfo/UserInfo';
import AskQuestion from './Pages/AskQuestion/AskQuestion';
import Review from './Pages/Review/Review';
import Footer from './Components/Footer/Footer';

import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';
import ReviewDetail from './Pages/ReviewDetail/ReviewDetail';
import QuestionDetail from './Pages/QuestionDetail/QuestionDetail';

const GlobalStyle = createGlobalStyle`
  ${reset}
`;

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Section />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/medicalprovider" element={<DoctorSignup />} />
        <Route path="/myinfo" element={<UserInfo />} />
        <Route path="/askquestion" element={<AskQuestion />} />
        <Route path="/review" element={<Review />} />
        <Route path="/question/1234" element={<QuestionDetail />} />
        <Route path="/review/1234" element={<ReviewDetail />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
