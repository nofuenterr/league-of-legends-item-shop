import { NavLink } from 'react-router-dom'
import GitHubIcon from '../icons/GitHubIcon'
import lolIconFlatWhite from '../../assets/images/LoL_Icon_Flat_WHITE.png'
import styles from './Footer.module.css'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer>
      <div className={styles.footerMain}>
        <div className={styles.footerTop}>
          <NavLink to='/' title="Summoner's Shop">
            <div className={styles.brand}>
              <div className={styles.brandImage}>
                <img src={lolIconFlatWhite} alt="LoL icon" />
              </div>
              <div>
                <p>Summoner's</p>
                <p>Shop</p>
              </div>
            </div>
          </NavLink>
          <div className={styles.footerGroup}>
            <h4>Shop</h4>
            <nav aria-label='footer nav 1'>
              <ul>
                <li><NavLink to='/shop'>All Items</NavLink></li>
                <li><NavLink to='/sale'>On Sale</NavLink></li>
              </ul>
            </nav>
          </div>
          <div className={styles.footerGroup}>
            <h4>Support</h4>
            <nav aria-label='footer nav 2'>
              <ul>
                <li><a href="#">Order Status</a></li>
                <li><a href="#">Gift Card Balance</a></li>
                <li><a href="#">Verify Your Product</a></li>
                <li><a href="#">Faqs</a></li>
                <li><a href="#">Shipping Information</a></li>
                <li><a href="#">Return Policy</a></li>
                <li><a href="#">Collectability Guide</a></li>
                <li><a href="#">Accessibility</a></li>
              </ul>
            </nav>
          </div>
          <form className={`${styles.footerGroup} ${styles.footerForm}`} action="#">
            <legend>Contact Us</legend>
            <div className={styles.footerFormBody}>
              <FormControl 
                element='input'
                type='text'
                label='Name'
                name='name'
                id='name'
              />
              <FormControl 
                element='input'
                type='email'
                label='Email Address*'
                name='email'
                id='email'
                required
              />
              <FormControl 
                element='input'
                type='text'
                label='Order Number'
                name='orderNumber'
                id='orderNumber'
              />
              <FormControl 
                element='input'
                type='text'
                label='Country'
                name='country'
                id='country'
              />
              <FormControl 
                element='input'
                type='text'
                label='Tracking Number'
                name='trackingNumber'
                id='trackingNumber'
              />
              <FormControl 
                element='input'
                type='text'
                label='Subject*'
                name='subject'
                id='subject'
                required
              />
              <FormControl 
                element='textarea' 
                label='How can we help?*'
                name='howCanWeHelp'
                id='howCanWeHelp'
                required
                rows={4}
              />
              <button className={styles.sendForm}>Send</button>
            </div>
          </form>
        </div>
        <div className={styles.footerBottom}>
          <a href="#">Legal</a>
          <a href="#">Cookie Preferences</a>
          <a href="#">Terms & Conditions</a>
          <a href="#">Privacy Policy</a>
        </div>
        <div className={styles.footerMainBackgroundSlash}></div>
        <div className={styles.footerMainBackground}></div>
      </div>
      <div className={styles.footerCopyright}>
        <a href="https://github.com/nofuenterr" target='_blank'>
          <GitHubIcon width={20} height={20} fill={'var(--color-primary)'} />
          Developed by RR Nofuente
        </a>
        <p>&copy; Copyright {currentYear} RR Nofuente. All rights reserved.</p>
      </div>
    </footer>
  )
}

function FormControl({ element = 'input', label, type = 'text', name, id, ...props }) {
  return (
    <div>
      <label>
        {label}
        {element === 'input' ? (
          <input type={type} name={name} id={id} {...props} />
        ) : null}
        {element === 'textarea' ? (
          <textarea name={name} id={id} {...props}></textarea>
        ) : null}
      </label>
    </div>
  )
}

export default Footer