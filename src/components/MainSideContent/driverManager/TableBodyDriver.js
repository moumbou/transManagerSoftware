import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  resetOpperation,
  selectInfo,
  setInfo,
  setTarget,
} from "../../../features/pages/OpptionsSlice";

function TableBodyDriver({
  nom,
  prenom,
  permis,
  dateDebut,
  currentCamionID,
  currentCamion,
  id,
}) {
  const dispatch = useDispatch();
  const info = useSelector(selectInfo);

  const onClickHandler = (e) => {
    dispatch(resetOpperation());
    if (info && info.id === id) return dispatch(resetOpperation());
    dispatch(setTarget("driver_opp"));

    const maxX = window.innerWidth - 300;
    const currentX = e.clientX >= maxX ? maxX - 20 : e.clientX;

    dispatch(
      setInfo({
        id,
        nom,
        prenom,
        permis,
        dateDebut,
        currentCamionID,
        currentCamion,
        x: currentX + 5,
        y: e.clientY,
      })
    );
  };

  return (
    <tr onClick={onClickHandler}>
      <td>{nom}</td>
      <td>{prenom}</td>
      <td>{permis}</td>
      <td>
        {dateDebut ? new Date(dateDebut).toLocaleString().split(",")[0] : "/"}
      </td>
      <td>{currentCamion ? currentCamion : "non affilié"}</td>
    </tr>
  );
}

export default TableBodyDriver;
