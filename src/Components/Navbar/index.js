import React from "react";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./NavbarElements";
import logo from '../../Resources/logo.png';
import "./Navbar.css";

const Navbar = () => {
  return (
    <>
      <img src={logo} alt="Logo" className="logo"/>
      <Nav>
        <Bars />
        <NavMenu>
          <NavLink to="/mix" activeStyle>
            Trộn đề
          </NavLink>
          <NavLink to="/tutorial" activeStyle>
            Hướng dẫn
          </NavLink>
          <NavLink to="/about" activeStyle>
            Về chúng tôi
          </NavLink>
          <NavLink to="/feedback" activeStyle>
            Góp ý
          </NavLink>
          {/* <NavLink to="/contact" activeStyle>
            Liên hệ
          </NavLink> */}
          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
        </NavMenu>
        {/* <NavBtn>
          <NavBtnLink to="/signin">Sign In</NavBtnLink>
        </NavBtn> */}
      </Nav>
    </>
  );
};

export default Navbar;
