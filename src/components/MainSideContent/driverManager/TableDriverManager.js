import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentDrivers } from "../../../features/pages/DriverPageSlice";
import TableBodyDriver from "./TableBodyDriver";

function TableDriverManager() {
  const drivers = useSelector(selectCurrentDrivers);

  const [driversArray, setDriversArray] = useState([])
  useEffect(() => {
    setDriversArray(drivers)
  }, [drivers])

  return (
    <div className="table_container driver_manager_table">
      <table className="table">
        <thead>
          <tr>
            <th>nom</th>
            <th>prenom</th>
            <th>N° permis de conduire</th>
            <th>date de debut</th>
            <th>camion</th>
          </tr>
        </thead>
        <tbody>
          {driversArray.map(
            ({
              N_permis,
              dateDebut,
              nom,
              prenom,
              _id,
              currentCamionID,
              currentCamion,
            }) => (
              <TableBodyDriver
                id={_id}
                key={_id}
                nom={nom}
                prenom={prenom}
                permis={N_permis}
                dateDebut={dateDebut}
                currentCamion={currentCamion}
                currentCamionID={currentCamionID}
              />
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TableDriverManager;
