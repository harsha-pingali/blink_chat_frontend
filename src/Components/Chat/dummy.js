import React from "react";
import "../App.css";
import { BsInstagram } from "react-icons/bs";
import { AiFillCopyrightCircle } from "react-icons/ai";
import { BiLogoTelegram, BiLastPage } from "react-icons/bi";
import { BsFillTelephoneFill, BsLinkedin } from "react-icons/bs";
import { Link } from "react-router-dom";
const Footer = () => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };
  return (
    <footer className="footer">
      <div className="container-xxl footer-cont">
        <div className="row">
          <div className="col-4">
            <h4>Explore</h4>
            <ul className="footer-icons">
              {/* <Link to={'/codingchannels'}><li><BiLastPage/><label className='mx-4' style={{cursor:"pointer"}} onClick={handleScrollToTop}>Coding Channels </label></li></Link> */}
              <Link to={"/team"}>
                <li>
                  <BiLastPage />
                  <label
                    className="mx-4"
                    style={{ cursor: "pointer" }}
                    onClick={handleScrollToTop}
                  >
                    Team
                  </label>
                </li>
              </Link>
              <Link to={"/announcements"} onClick={handleScrollToTop}>
                <li>
                  <BiLastPage />
                  <label className="mx-4" style={{ cursor: "pointer" }}>
                    Announcements
                  </label>
                </li>
              </Link>
              <Link to={"/sessions"} onClick={handleScrollToTop}>
                <li>
                  <BiLastPage />
                  <label className="mx-4" style={{ cursor: "pointer" }}>
                    {" "}
                    Registrations
                  </label>
                </li>
              </Link>
            </ul>
          </div>
          <div className="col-4">
            <h4>Social</h4>
            <ul className="footer-icons d-flex flex-column">
              <Link
                to={
                  "https://www.instagram.com/socc_klef/?utm_source=ig_web_button_share_sheet&igshid=OGQ5ZDc2ODk2ZA=="
                }
              >
                <li>
                  <BsInstagram />
                  <label className="mx-4">Instagram</label>
                </li>
              </Link>
              <Link
                to={
                  "https://www.linkedin.com/company/school-ofcompetitive-coding/"
                }
              >
                <li>
                  <BsLinkedin />
                  <label className="mx-4">LinkedIn</label>
                </li>
              </Link>
              <Link to={"https://t.me/socctechclub"}>
                <li>
                  <BiLogoTelegram />
                  <label className="mx-4">Telegram</label>
                </li>
              </Link>
            </ul>
          </div>
          <div className="col-4">
            <h4>Pages</h4>
            <ul className="footer-icons">
              <Link to={"/"}>
                <li>
                  <BiLastPage />
                  <label
                    style={{ cursor: "pointer" }}
                    className="mx-4"
                    onClick={handleScrollToTop}
                  >
                    Home
                  </label>
                </li>
              </Link>
              <Link to={"/contact"}>
                <li>
                  <BiLastPage />
                  <label
                    className="mx-4"
                    style={{ cursor: "pointer" }}
                    onClick={handleScrollToTop}
                  >
                    Contact
                  </label>
                </li>
              </Link>
              <Link to={"/team"}>
                <li>
                  <BiLastPage />
                  <label
                    style={{ cursor: "pointer" }}
                    className="mx-4"
                    onClick={handleScrollToTop}
                  >
                    Team
                  </label>
                </li>
              </Link>
              <Link to={"/sessions"}>
                <li>
                  <BiLastPage />
                  <label
                    style={{ cursor: "pointer" }}
                    onClick={handleScrollToTop}
                    className="mx-4"
                  >
                    Sessions
                  </label>
                </li>
              </Link>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <h6 className="my-4 text-center copyright">
              <AiFillCopyrightCircle /> <span></span>Copyright 2023 Socc Offical
            </h6>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
