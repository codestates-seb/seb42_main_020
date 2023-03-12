import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import Footer from './Components/Footer/Footer';
import Section from './Components/Section/Section';
import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
  body{
    background: #f2f2f2;
  }
`;

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Header />
      <Section />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
