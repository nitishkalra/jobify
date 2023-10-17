import React from 'react'
import styled from 'styled-components';
import Wrapper from '../assets/wrappers/LandingPage';
import main from '../assets/images/main.svg';
import {Logo} from '../components';
import {Link} from 'react-router-dom';

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>job <span>tracking</span> app</h1>
          <p>I'm baby edison bulb Brooklyn bruh, whatever succulents hammock raclette pok pok skateboard fit. Farm-to-table JOMO messenger bag helvetica venmo chillwave vegan austin affogato fashion axe la croix seitan tbh brunch big mood. Plaid organic grailed man braid chia tumeric coloring book post-ironic. Fanny pack biodiesel snackwave, mukbang photo booth poke cred before they sold out paleo kombucha.</p>
          <Link to="/register" className='btn register-link'>
            Register
          </Link>
          <Link to="/login" className='btn'>
            Login/Demo User
          </Link>
        </div>
        <img src={main} alt="job hunt" className='img main-img' />
      </div>
    </Wrapper>
  )
}

export default Landing;
