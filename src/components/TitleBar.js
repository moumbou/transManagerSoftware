import React, { useState } from 'react';
import '../style/components_style/TitleBar.style.css'
import { FaRegWindowClose, FaWindowMinimize } from 'react-icons/fa'
import { VscChromeRestore, VscChromeMaximize } from 'react-icons/vsc'
import { FiTool } from 'react-icons/fi'
import { constants } from '../constants/IpcRendererConstants';

const { ipcRenderer } = window.require('electron')

function TitleBar() {

  const pointerNone = {
    pointerEvents: "none"
  }

  const [isMaximizedWindow, setWindow] = useState(false)
  const onClickHandler = (e) => {
    const info = e.target.getAttribute('data-info')
    
    switch (info) {
      case "dev_tools":
        ipcRenderer.send(constants.SHOW_DEV_TOOLS)
        break;
      case "minimize":
        ipcRenderer.send(constants.MINIMIZE_WINDOW)
        break;
      case "window_size":
        setWindow(preValue => !preValue)
        ipcRenderer.send(isMaximizedWindow ? constants.NORMALIZE_WINDOW : constants.MAXIMIZE_WINDOW)
        break;
      case "exit":
        ipcRenderer.send(constants.EXIT_APP)
        break;
      default: console.log('nothing')
        break;
    }
  }

  ipcRenderer.on(constants.MAXIMIZE_WINDOW, () => {
    setWindow(true)
  })

  ipcRenderer.on(constants.NORMALIZE_WINDOW, () => {
    setWindow(false)
  })

  return <div className='title_bar'>
      <div className='logo_container'>
        <img src={require('../img/logo/logo.png')} alt="trans_manager_logo" />
        <p>trans manager by <span>BigCat</span></p>
      </div>

      <div className="title_bar_buttons_contaner">
        <button data-info="dev_tools" onClick={onClickHandler}><FiTool style={pointerNone} /></button>
        <button data-info="minimize" onClick={onClickHandler}><FaWindowMinimize style={pointerNone} /></button>
        <button data-info="window_size" onClick={onClickHandler}>
          {
            isMaximizedWindow ? <VscChromeRestore style={pointerNone} /> :
            <VscChromeMaximize style={pointerNone} />
          } 
        </button>
        <button data-info="exit" onClick={onClickHandler}><FaRegWindowClose style={pointerNone} /></button>
      </div>
  </div>;
}

export default TitleBar;
