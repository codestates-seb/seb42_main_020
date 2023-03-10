import FooterStyle from '../../Style/FooterStyle';
import { RxNotionLogo } from 'react-icons/rx';
import { GoMarkGithub } from 'react-icons/go';

function Footer() {
  return (
    <>
      <FooterStyle>
        <div className="content">
          <div className="footerLogo">
            <div className="logo">
              <img
                src="/images/logo.png"
                alt="footer_logo"
                className="logoImg"
              />
            </div>
            <h3>다나아</h3>
          </div>
          <div className="frontTeam">
            <h4>Front-End</h4>
            <ul>
              <li>
                <span>오송아 (TL)</span>
                <a
                  href="https://github.com/Mia-Oh"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    className="profile-icon"
                    src="https://github.com/Mia-Oh.png"
                    alt="Profile icon"
                  />
                </a>
              </li>
              <li>
                <span>백종우</span>
                <a
                  href="https://github.com/Observant0120"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    className="profile-icon"
                    src="https://github.com/Observant0120.png"
                    alt="Profile icon"
                  />
                </a>
              </li>
              <li>
                <span>오승민</span>
                <a
                  href="https://github.com/SUM1NG"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    className="profile-icon"
                    src="https://github.com/SUM1NG.png"
                    alt="Profile icon"
                  />
                </a>
              </li>
            </ul>
          </div>
          <div className="backTeam">
            <h4>Back-End</h4>
            <ul>
              <li>
                <span>박무승 (DTL)</span>
                <a
                  href="https://github.com/bblack-apple"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    className="profile-icon"
                    src="https://github.com/bblack-apple.png"
                    alt="Profile icon"
                  />
                </a>
              </li>
              <li>
                <span>장홍재</span>
                <a
                  href="https://github.com/janghongjae"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    className="profile-icon"
                    src="https://github.com/janghongjae.png"
                    alt="Profile icon"
                  />
                </a>
              </li>
              <li>
                <span>조건희</span>
                <a
                  href="https://github.com/bliss94s"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    className="profile-icon"
                    src="https://github.com/bliss94s.png"
                    alt="Profile icon"
                  />
                </a>
              </li>
            </ul>
          </div>
          <div className="teamContent">
            <div className="teamLogo">
              <img
                src="/images/Swear.png"
                alt="teamLogo"
                className="teamlogoItem"
              />
              <span>
                Team. <strong>도원결의</strong>
              </span>
            </div>
            <div className="linkSNS">
              <a
                href="https://www.notion.so/codestates/6a748265eba041fda45f2d6ddb4eb908"
                target="_blank"
                rel="noreferrer"
              >
                <RxNotionLogo size={25} />
              </a>
              <a
                href="https://github.com/codestates-seb/seb42_main_020"
                target="_blank"
                rel="noreferrer"
              >
                <GoMarkGithub size={25} />
              </a>
            </div>
          </div>
        </div>
        <div className="copyright">
          ⓒ 2023 DNA Company. All Rights Reserved.
        </div>
      </FooterStyle>
    </>
  );
}

export default Footer;
