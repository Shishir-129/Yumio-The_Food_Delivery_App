import React, { useState } from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(null);
  const [highlightedIcon, setHighlightedIcon] = useState(null);

  const handleNavigation = (section) => {
    if (section === 'home') {
      // Scroll to top of page
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (section === 'about') {
      setOpenModal('about');
    } else if (section === 'delivery') {
      // Scroll to app-download section
      setTimeout(() => {
        const element = document.getElementById('app-download');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 0);
    } else if (section === 'privacy') {
      setOpenModal('privacy');
    }
  }

  const closeModal = () => {
    setOpenModal(null);
  }

  return (
    <>
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <img src={assets.logo} alt="" />
            <p> Select from a wide variety of delicious meals and get them delivered to your doorstep.</p>
            <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="" onClick={() => setHighlightedIcon('facebook')} className={highlightedIcon === 'facebook' ? 'highlighted' : ''} />
                <img src={assets.twitter_icon} alt="" onClick={() => setHighlightedIcon('twitter')} className={highlightedIcon === 'twitter' ? 'highlighted' : ''} />
                <img src={assets.linkedin_icon} alt="" onClick={() => setHighlightedIcon('linkedin')} className={highlightedIcon === 'linkedin' ? 'highlighted' : ''} />
            </div>
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li onClick={() => handleNavigation('home')}>Home</li>
                <li onClick={() => handleNavigation('about')}>About us</li>
                <li onClick={() => handleNavigation('delivery')}>Delivery</li>
                <li onClick={() => handleNavigation('privacy')}>Privacy Policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+977 9847412404, +977 9749399663</li>
                <li>yumiofoods@gmail.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright © 2026 Yumio Foods. All rights reserved.</p>
    </div>

    {/* About Modal */}
    {openModal === 'about' && (
      <div className="modal-overlay" onClick={closeModal}>
        <div className="modal-box" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={closeModal}>×</button>
          <h2>About Yumio</h2>
          <p>Yumio is a modern Nepali food delivery platform dedicated to bringing delicious, fresh meals straight to your doorstep. We partner with the best local restaurants and chefs to offer you a diverse selection of cuisines.</p>
          <p>Our mission is to make quality food accessible to everyone while supporting local businesses. With our user-friendly app and reliable delivery service, we ensure that every meal arrives fresh and on time.</p>
          <p>Founded in 2026, Yumio has quickly become a trusted name in food delivery. We believe in exceptional customer service, food quality, and community support.</p>
        </div>
      </div>
    )}

    {/* Privacy Policy Modal */}
    {openModal === 'privacy' && (
      <div className="modal-overlay" onClick={closeModal}>
        <div className="modal-box" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={closeModal}>×</button>
          <h2>Privacy Policy</h2>
          <p><strong>Last Updated: February 2026</strong></p>
          <p><strong>1. Information We Collect</strong></p>
          <p>We collect information you provide directly, such as name, email, phone number, and delivery address. We also collect payment information and order history.</p>
          <p><strong>2. How We Use Your Information</strong></p>
          <p>We use your information to process orders, improve our services, communicate with you, and provide customer support. We never sell your personal information to third parties.</p>
          <p><strong>3. Data Security</strong></p>
          <p>We implement industry-standard security measures to protect your personal information from unauthorized access and misuse.</p>
          <p><strong>4. Cookies</strong></p>
          <p>Our platform uses cookies to enhance your experience and remember your preferences. You can disable cookies in your browser settings.</p>
          <p><strong>5. Contact Us</strong></p>
          <p>If you have any privacy concerns, please contact us at yumiofoods@gmail.com</p>
        </div>
      </div>
    )}
    </>
  )
}

export default Footer
