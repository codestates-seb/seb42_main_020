import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import Footer from './Components/Footer/Footer';
import Userinfo from './Components/UserInfo/Userinfo';
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
      <Userinfo />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
