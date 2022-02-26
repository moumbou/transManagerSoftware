import React, { useState } from "react";
import { AiFillRightCircle, AiFillDownCircle } from "react-icons/ai";
import { MdOutlineAddCircle } from 'react-icons/md'
import AddDriverToTruck from "./truckManager/AddDriverToTruck";
import AddTrcukModal from "./truckManager/AddTrcukModal";
import DeleteTruckModal from "./truckManager/DeleteTruckModal";
import Filter from "./truckManager/Filter";
import TableTruckManager from "./truckManager/TableTruckManager";
import UpdateTruckModal from "./truckManager/UpdateTruckModal";

function TruckManager() {
  const [isDesplayed, setFilter] = useState(false);

  const setToDesplayed = () => {
    setFilter(true);
  };

  const setToHidden = () => {
    setFilter(false);
  };

  const [isDisplayed, setDisplay] = useState(false);

  return (
    <div className="page">
      <div className="page_header">
        <h2>gestion des camions</h2>
        <button
          className="button_detailed add_button"
          onClick={() => setDisplay((preValue) => !preValue)}
        >
          <MdOutlineAddCircle size={24} />
          <span>Ajouter un camion</span>
        </button>
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
          <TableTruckManager />
        </div>
      </div>

      <AddTrcukModal setDisplay={setDisplay} display={isDisplayed} />
      <DeleteTruckModal />
      <UpdateTruckModal />
      <AddDriverToTruck />
    </div>
  );
}

export default TruckManager;
