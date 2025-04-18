import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets';

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <img src={assets.logo} alt=""/>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium delectus et eveniet molestias nesciunt? Quidem temporibus eligendi, maxime quasi officiis velit beatae distinctio, non corrupti qui assumenda debitis porro repellat.</p>
            <div className="footer-social-icon">
              <img src={assets.facebook_icon} alt=''/>
              <img src={assets.twitter_icon} alt=''/>
              <img src={assets.linkedin_icon} alt=''/>
            </div>
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
              <li>Home</li>
              <li>About us</li>
              <li>Delivary</li>
              <li>Privacy policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
              <li>+91-7798042167</li>
              <li>sumitkamble1252@gmail.com</li>
            </ul>
        </div>
      </div>
      <hr/>
      <p className="footer-copyright">Copyright 2024 @ Green Grocery.com - All Right Reserved.</p>
    </div>
  )
}

export default Footer
