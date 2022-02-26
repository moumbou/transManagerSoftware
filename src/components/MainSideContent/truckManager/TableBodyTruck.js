import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetOpperation, selectInfo, setInfo, setTarget } from "../../../features/pages/OpptionsSlice";

function TableBodyTruck({
  id,
  marque,
  modele,
  couleur,
  km,
  imatriculation,
  currentChauffeurName,
  debutAssurance,
  finAssurance,
}) {
  const dispatch = useDispatch();
  const info = useSelector(selectInfo);

  const onClickHandler = (e) => {
    dispatch(resetOpperation());
    if (info && info.id === id) return dispatch(resetOpperation());
    dispatch(setTarget("truck_opp"));

    const maxX = window.innerWidth - 300;
    const currentX = e.clientX >= maxX ? maxX - 20 : e.clientX;

    dispatch(
      setInfo({
        id,
        marque,
        modele,
        couleur,
        km,
        imatriculation,
        currentChauffeurName,
        debutAssurance,
        finAssurance,
        x: currentX + 5,
        y: e.clientY,
      })
    );
  };

  const joursRestantCompteur = (date) => {
    const dateToNumber = new Date(date);
    const thisDateToNumber = new Date().setHours(0, 0, 0, 0);
    const isTooLate = thisDateToNumber > dateToNumber;
    const diffrenceDates = Math.abs(dateToNumber - thisDateToNumber);
    const diffrenceToDays = Math.round(diffrenceDates / (60 * 60 * 24 * 1000));

    return isTooLate ? 0 : diffrenceToDays;
  };

  return (
    <tr onClick={onClickHandler}>
      <td>{marque}</td>
      <td>{modele}</td>
      <td>{couleur}</td>
      <td>{km}</td>
      <td>{imatriculation}</td>
      <td>{currentChauffeurName ? currentChauffeurName : "non affilié"}</td>
      <td>
        {debutAssurance
          ? new Date(debutAssurance).toLocaleString().split(",")[0]
          : ""}
      </td>
      <td>
        {finAssurance
          ? new Date(finAssurance).toLocaleString().split(",")[0]
          : ""}
      </td>
      <td>{finAssurance ? joursRestantCompteur(finAssurance) : "/"}</td>
    </tr>
  );
}

export default TableBodyTruck;
