import React from 'react';
import { useDispatch } from 'react-redux';
import MainSide from './components/MainSide';
import MoreOpptionsModalSituations from './components/MainSideContent/dashboard/MoreOpptionsModalSituations';
import MoreOpptionsModal from './components/MainSideContent/driverManager/MoreOpptionsModal';
import MoreOpptionsModalTruck from './components/MainSideContent/truckManager/MoreOpperationsModalTruck';
import SideBar from './components/SideBar';
import TitleBar from './components/TitleBar';
import { requests } from './constants/IpcRendererConstants';
import { setDrivers } from './features/pages/DriverPageSlice';
import { setInfoMessage, setTargetMessage } from './features/pages/MessageModel';
import { setCamionArray, setSituationsValue } from './features/pages/SituationPageSlice';
import { setTrucks } from './features/pages/TruckPageSlice';
import './style/App.css';

const { ipcRenderer } = window.require('electron')

function App() {
  const dispatch = useDispatch()

  ipcRenderer.on(requests.MESSAGE_SEND, (e, args) => {
    dispatch(setInfoMessage({
      success: args.success,
      msg: args.msg
    }))
    dispatch(setTargetMessage("message_modal"))
  })
  ipcRenderer.on(requests.DISPLAY_DRIVERS, (e, args) => {
    dispatch(setDrivers(JSON.parse(args)))
  })
  ipcRenderer.on(requests.DISLPAY_TRUCKS, (e, args) => {
    dispatch(setTrucks(JSON.parse(args)))
  })
  ipcRenderer.on(requests.GET_AFFILIED_TRUCKS, (e, args) => {
    dispatch(setCamionArray(JSON.parse(args)))
  })
  ipcRenderer.on(requests.GET_SITUATIONS, (e, args) => {
    dispatch(setSituationsValue(JSON.parse(args)))
  })


  return (
    <div className="App">
      <TitleBar />
      <div className='app_container'>
        <SideBar />
        <MainSide />
      </div>

      <MoreOpptionsModal />
      <MoreOpptionsModalTruck />
      <MoreOpptionsModalSituations />
    </div>
  );
}

export default App;
