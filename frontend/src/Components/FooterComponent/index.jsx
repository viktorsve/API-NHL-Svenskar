import React, { Component } from 'react';
import styles from './FooterComponent.module.css';

// Component that renders a footer on the whole application.
class Footer extends Component {
  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.box}>
          <h3>RSS och distribution</h3>
          <li>
            <a href="https://www.svenskafans.com/svenskafans/rss.aspx">RSS</a>
            <a href="https://gitlab.com/dword4/nhlapi">NHL:s API</a>
          </li>
        </div>
        <div className={styles.box}>
          <h3>Press & media</h3>
          <p>Officiella logotyper</p>
          <p>Rättigheter till bilder</p>
        </div>
        <div className={styles.box}>
          <h3>Cookies</h3>
          <p>Villkor och integritetspolicy</p>
        </div>
      </div>
    );
  }
}

export default Footer;
