import React from 'react'
import './AppDownload.css'
import { assets } from '../../assets/assets'

const AppDownload = () => {
  return (
    <div className='app-download' id='app-download'>
        <p>For Better Experience Download <br/>Yumio App</p>
        <div className="app-download-platforms">
            <img src={assets.play_store} alt="PlayStore" />
            <img src={assets.app_store} alt="AppStore" />
        </div>
      
    </div>
  )
}

export default AppDownload
