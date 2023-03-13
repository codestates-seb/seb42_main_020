import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import DoctorSignup from './Pages/DoctorSignup/DoctorSignup';
import Footer from './Components/Footer/Footer';
import UserInfo from './Components/UserInfo/UserInfo';
// import Section from './Components/Section/Section';
import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';

const GlobalStyle = createGlobalStyle`${reset}`;

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Header />
      {/* <Section /> */}
      <UserInfo />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/medicalprovider" element={<DoctorSignup />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
