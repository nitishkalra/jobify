import Wrapper from "../assets/wrappers/SmallSidebar";
import Logo from "./Logo";
import React from 'react';
import links from "../utils/links";
import { useDashBoardContext } from "../pages/DashboardLayout";
import { FaTimes } from "react-icons/fa";

import NavLinks from "./NavLinks";

const SmallSidebar = () => {
  const {showSidebar, toggleSidebar} = useDashBoardContext();
  
  return (
    <Wrapper>
      <div className={showSidebar?"sidebar-container show-sidebar":"sidebar-container"}>
        <div className="content">
          <button type="button" className="close-btn" onClick={toggleSidebar}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  )
}

export default SmallSidebar
