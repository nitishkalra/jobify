import Wrapper from "../assets/wrappers/BigSidebar";
import NavLinks from "./NavLinks";
import Logo from "./Logo";
import { useDashBoardContext } from "../pages/DashboardLayout";
import React from 'react'

const BigSidebar = () => {
  const {showSidebar} = useDashBoardContext();
  return (
    <Wrapper>
      <div className={showSidebar ? 'sidebar-container' : 'sidebar-container show-sidebar'}>
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLinks isBigSidebar/>
        </div>
      </div>
    </Wrapper>
  )
}

export default BigSidebar
