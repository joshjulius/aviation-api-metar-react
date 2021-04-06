import React from 'react';
import styles from "./Footer.module.css";

const Footer = () => {
    return (
        <footer>
            <div className={styles.footerContainer}>
                <p>Not for real world use. Refer to official sources for weather information.</p>
            </div>
        </footer>
    );
}

export default Footer;