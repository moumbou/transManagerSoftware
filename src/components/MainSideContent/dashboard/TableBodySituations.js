import React from "react";
import { IoCheckmarkCircle } from "react-icons/io5";
import { RiErrorWarningFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { resetOpperation, selectInfo, setInfo, setTarget } from "../../../features/pages/OpptionsSlice";

function TableBodySituations({
  id,
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
  situation,
}) {

  const dispatch = useDispatch()
  const info = useSelector(selectInfo)

  const toDate = (date) => {
    const theDate = new Date(date);
    return theDate.toLocaleString().split(",")[0];
  };

  const onClickHandler = (e) => {
    dispatch(resetOpperation());
    if (info && info.id === id) return dispatch(resetOpperation());
    dispatch(setTarget("situation_opp"));

    const maxX = window.innerWidth - 300;
    const currentX = e.clientX >= maxX ? maxX - 20 : e.clientX;

    dispatch(
      setInfo({
        id,
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
        situation,
        x: currentX + 5,
        y: e.clientY,
      })
    );
  };

  return (
    <tr onClick={onClickHandler}>
      <td>{camion}</td>
      <td>{chauffeur}</td>
      <td>
        {depart ? depart : <RiErrorWarningFill color="#EA5230" />} -{" "}
        {arriver ? arriver : <RiErrorWarningFill color="#EA5230" />}
      </td>
      <td>
        {departDate ? (
          toDate(departDate)
        ) : (
          <RiErrorWarningFill color="#EA5230" />
        )}
      </td>
      <td>
        {arriverDate ? (
          toDate(arriverDate)
        ) : (
          <RiErrorWarningFill color="#EA5230" />
        )}
      </td>
      <td>{fraisMission}</td>
      <td>{depenses}</td>
      <td>{benefices}</td>
      <td className={`${situation ? "text_warning" : ""}`}>
        {situation ? `- ${situation}` : <IoCheckmarkCircle color="#36B368" />}
      </td>
    </tr>
  );
}

export default TableBodySituations;
