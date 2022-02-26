import React, { useState } from "react";
import "../style/components_style/SideBar.style.css";
import { RiDashboard3Fill, RiTruckFill } from "react-icons/ri";
import { IoPersonCircle } from "react-icons/io5";
import { useSelector } from "react-redux";
import { selectPage, setPage } from "../features/pages/pageSlice";
import { useDispatch } from "react-redux";
import "../style/inputs.css";
import { requests } from "../constants/IpcRendererConstants";
import { selectDrivers } from "../features/pages/DriverPageSlice";
import { resetOpperation } from "../features/pages/OpptionsSlice";
import { resetAffilier, selectTrucks } from "../features/pages/TruckPageSlice";
import { resetCamionInfo } from "../features/pages/SituationPageSlice";

const selectedButton = "selected_side_bar_button";
const { ipcRenderer } = window.require('electron')

function SideBar() {
  const drivers = useSelector(selectDrivers)
  const trucks = useSelector(selectTrucks)

  const currentPage = useSelector(selectPage);
  const dispatch = useDispatch();
  const [page, setCurrentPage] = useState(currentPage);
  const clickHandler = (e) => {
    const selectedPage = e.target.getAttribute("data-page");
    setCurrentPage(selectedPage);
    dispatch(setPage(selectedPage));
    dispatch(resetOpperation())
    dispatch(resetAffilier())
    dispatch(resetCamionInfo())
    if( selectedPage === 'driverManager' && !drivers.length ) ipcRenderer.send(requests.DISPLAY_DRIVERS)
    if( selectedPage === 'truckManager' && !trucks.length ) ipcRenderer.send(requests.DISLPAY_TRUCKS)
  };

  return (
    <div className="side_bar">
      <div className="side_bar_buttons_section">
        <button
          className={page === "dashBoard" ? selectedButton : ""}
          onClick={clickHandler}
          data-page="dashBoard"
          data-info="Tableau de bord"
        >
          <RiDashboard3Fill style={{ pointerEvents: "none" }} />
        </button>

        <button
          className={page === "truckManager" ? selectedButton : ""}
          onClick={clickHandler}
          data-page="truckManager"
          data-info="Gestion des camions"
        >
          <RiTruckFill style={{ pointerEvents: "none" }} />
        </button>

        <button
          className={page === "driverManager" ? selectedButton : ""}
          onClick={clickHandler}
          data-page="driverManager"
          data-info="Gestion des chauffeurs"
        >
          <IoPersonCircle style={{ pointerEvents: "none" }} />
        </button>
      </div>

      <div className="side_bar_logo_section">
        <img src={require("../img/logo/big-cat-logo.png")} alt="big_cat_logo" />
      </div>
    </div>
  );
}

export default SideBar;
