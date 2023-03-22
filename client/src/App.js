import { Routes, Route } from 'react-router-dom';
import { lazy } from 'react';

import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';

const Landing = lazy(() => import('./Pages/Landing/Landing'));
const Section = lazy(() => import('./Components/Section/Section'));
const Login = lazy(() => import('./Pages/Login/Login'));
const Signup = lazy(() => import('./Pages/Signup/Signup'));
const DoctorSignup = lazy(() => import('./Pages/DoctorSignup/DoctorSignup'));
const UserInfo = lazy(() => import('./Components/UserInfo/UserInfo'));
const AskQuestion = lazy(() => import('./Pages/AskQuestion/AskQuestion'));
const Review = lazy(() => import('./Pages/Review/Review'));
const ReviewDetail = lazy(() => import('./Pages/ReviewDetail/ReviewDetail'));
const QuestionDetail = lazy(() =>
  import('./Pages/QuestionDetail/QuestionDetail')
);

import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';
import EditQuestion from './Pages/EditQuestion/EditQuestion';

const GlobalStyle = createGlobalStyle`
  ${reset}
`;

function App() {
  return (
    <>
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
        <Route path="/home/question/:postId" element={<QuestionDetail />} />
        <Route path="/home/review/:postId/" element={<ReviewDetail />} />
        <Route path="/home/question/edit/:postId" element={<EditQuestion />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
