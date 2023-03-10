import './variables.css';
import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';

import Footer from './Components/Footer/Footer';
import Section from './Components/Section/Section';

const GlobalStyle = createGlobalStyle`
  ${reset}
  body{
    background: #f2f2f2;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Section />
      </div>
      <Footer />
    </>
  );
}

export default App;
