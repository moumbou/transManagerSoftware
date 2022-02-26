import React, { useState } from "react";
import { AiFillRightCircle, AiFillDownCircle } from "react-icons/ai";
import Filter from "./driverManager/Filter";
import TableDriverManager from "./driverManager/TableDriverManager";
import { MdOutlineAddCircle } from 'react-icons/md'
import AddDriverModal from "./driverManager/AddDriverModal";
import DeleteDriverModal from "./driverManager/DeleteDriverModal";
import UpdateDriver from "./driverManager/UpdateDriver";
import CamionToDriver from "./driverManager/CamionToDriver";


function DriverManager() {
  const [isDesplayed, setFilter] = useState(false);

  const setToDesplayed = () => {
    setFilter(true);
  };

  const setToHidden = () => {
    setFilter(false);
  };

  const [isDisplayed, setDisplay] = useState(false)

  return (
    <div className="page">
      <div className="page_header">
        <h2>gestion des chauffeurs</h2>
        <div className="page_header_buttons">
          <button className="button_detailed add_button" onClick={() => setDisplay(preValue => !preValue)}>
            <MdOutlineAddCircle size={24} />
            <span>Ajouter un chauffeur</span>
          </button>
        </div>
      </div>
      <div className="page_content">
        <div className="filter_section">
          <p className="filter_display">
            {isDesplayed ? (
              <AiFillDownCircle onClick={setToHidden} />
            ) : (
              <AiFillRightCircle onClick={setToDesplayed} />
            )}
            <span>Filtrer</span>
          </p>

          <Filter isDesplayed={isDesplayed} />
        </div>
        <div className="content_section">
          <TableDriverManager />
        </div>
      </div>

      <AddDriverModal display={isDisplayed} setDisplay={setDisplay} />
      <DeleteDriverModal />
      <UpdateDriver />
      <CamionToDriver />
    </div>
  );
}

export default DriverManager;
