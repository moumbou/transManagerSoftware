import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentTrucks } from "../../../features/pages/TruckPageSlice";
import TableBodyTruck from "./TableBodyTruck";

function TableTruckManager() {
  const [trucksArray, setTrucksArray] = useState([]);
  const trucks = useSelector(selectCurrentTrucks);

  useEffect(() => {
    setTrucksArray(trucks);
  }, [trucks]);

  return (
    <div className="truck_manager_data_section">
      <table className="table">
        <thead>
          <tr>
            <th>Marque</th>
            <th>modele</th>
            <th>couleur</th>
            <th>kms</th>
            <th>imatriculation</th>
            <th>chauffeur</th>
            <th>debut d'assurance</th>
            <th>fin d'assurance</th>
            <th>jours restants assurrance</th>
          </tr>
        </thead>
        <tbody>
          {trucksArray.map(
            ({
              _id,
              marque,
              modele,
              couleur,
              km,
              imatriculation,
              currentChauffeurName,
              debutAssurance,
              finAssurance,
            }) => (
              <TableBodyTruck
                key={_id}
                id={_id}
                marque={marque}
                modele={modele}
                couleur={couleur}
                km={km}
                imatriculation={imatriculation}
                currentChauffeurName={currentChauffeurName}
                debutAssurance={debutAssurance}
                finAssurance={finAssurance}
              />
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TableTruckManager;
