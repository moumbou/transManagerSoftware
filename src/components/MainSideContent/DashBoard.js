import React, { useState } from "react";
import { AiFillRightCircle, AiFillDownCircle } from "react-icons/ai";
import { MdOutlineAddCircle } from "react-icons/md";
import AddSituationModal from "./dashboard/AddSituationModal";
import AddTruckToSituation from "./dashboard/AddTruckToSituation";
import DeleteSituationModal from "./dashboard/DeleteSituationModal";
import Filter from "./dashboard/Filter";
import TableDashboard from "./dashboard/TableDashboard";
import UpdateSituation from "./dashboard/UpdateSituation";

function DashBoard() {

  const [isDesplayed, setFilter] = useState(false)
  const [modal, setDisplay] = useState(false)

  const setToDesplayed = () => {
    setFilter(true)
  }

  const setToHidden = () => {
    setFilter(false)
  }

  return (
    <div className="page">
      <div className="page_header">
        <h2>tableau de bord</h2>
        <div className="page_header_buttons">
          <button className="button_detailed add_button" onClick={() => setDisplay(preValue => !preValue)}>
            <MdOutlineAddCircle size={24} />
            <span>Ajouter une situation</span>
          </button>
        </div>
      </div>
      <div className="page_content">
        <div className="filter_section">
          <p className="filter_display">
            {
              isDesplayed ? <AiFillDownCircle onClick={setToHidden}/> :
              <AiFillRightCircle onClick={setToDesplayed} />
            }
            <span>Filtrer</span>
          </p>

          <Filter isDesplayed={isDesplayed} />
        </div>
        <div className="content_section">
          <TableDashboard />
        </div>
      </div>

      <AddSituationModal display={modal} setDisplay={setDisplay} />
      <UpdateSituation />
      <DeleteSituationModal />
      <AddTruckToSituation />
    </div>
  );
}

export default DashBoard;
