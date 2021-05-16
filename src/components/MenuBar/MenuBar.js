import React from 'react'

import './MenuBar.css';
import Logo from '../../assets/logo.png';

export default function MenuBar () {

    return (
        <div className="ui pointing secondary menu menubar-color row">
          <div className="col-12 d-flex justify-content-center">
            <a className="item" href="/">
              <img src={Logo} alt="logo" />
            </a>
          </div>
        </div>

    )
  }