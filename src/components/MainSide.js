import React from 'react';
import { useSelector } from 'react-redux';
import '../style/components_style/MainSide.style.css'
import DashBoard from './MainSideContent/DashBoard';
import { selectPage } from '../features/pages/pageSlice'
import TruckManager from './MainSideContent/TruckManager';
import DriverManager from './MainSideContent/DriverManager';
import '../style/pages_style/common.style.css'
import '../style/tables.css'
import '../style/buttons.css'
import '../style/opperationModals.css'
import '../style/error_success_modal.css'
import SuccessErrorModal from './MainSideContent/SuccessErrorModal';

function MainSide() {

  const currentPage = useSelector(selectPage)


  return <div className='main_side'>
    {
      currentPage === 'dashBoard' ? <DashBoard /> :
      currentPage === 'truckManager' ? <TruckManager /> :
      <DriverManager />
    }

    <SuccessErrorModal />
  </div>;
}

export default MainSide;
