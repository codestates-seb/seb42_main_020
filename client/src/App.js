import './variables.css';
import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';
import Footer from './Components/Footer/Footer';

const GlobalStyle = createGlobalStyle`${reset}`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Footer />
    </>
  );
}

export default App;
