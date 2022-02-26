import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentValue } from "../../../features/pages/SituationPageSlice";
import TableBodySituations from "./TableBodySituations";

function TableDashboard() {

  const situations = useSelector(selectCurrentValue)

  const [situationsArray, setSituationsArray] = useState([])

  useEffect(() => {
    setSituationsArray(situations)
  }, [situations])

  return (
    <div className="table_dashboard">
      <table className="table">
        <thead>
          <tr>
            <th>camion</th>
            <th>chauffeur</th>
            <th>destination</th>
            <th>départ</th>
            <th>arriver</th>
            <th>frais de mission</th>
            <th>dépenses</th>
            <th>bénèfices</th>
            <th>situation</th>
          </tr>
        </thead>
        <tbody>
          {
            situationsArray.map(({
              _id,
              camionID,
              camion,
              chauffeurID,
              chauffeur,
              depart,
              arriver,
              departDate,
              arriverDate,
              fraisMission,
              depenses,
              benefices,
              situation
            })=> <TableBodySituations 
              key={_id}
              id={_id}
              camionID={camionID}
              camion={camion}
              chauffeurID={chauffeurID}
              chauffeur={chauffeur}
              depart={depart}
              arriver={arriver}
              departDate={departDate}
              arriverDate={arriverDate}
              fraisMission={fraisMission}
              depenses={depenses}
              benefices={benefices}
              situation={situation}
            />)
          }
        </tbody>
      </table>
    </div>
  );
}

export default TableDashboard;
