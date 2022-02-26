import React from "react";
import { MdDelete, MdOutlineModeEditOutline } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  selectInfo,
  selectTarget,
  setTarget,
} from "../../../features/pages/OpptionsSlice";

function MoreOpptionsModal() {
  const dispatch = useDispatch();

  const opperations = useSelector(selectInfo);
  const target = useSelector(selectTarget);

  const modifyHandler = () => {
      dispatch(setTarget('modify_driver'))
  };

  const deleteHandler = () => {
      dispatch(setTarget('delete_driver'))
  }

  return (
    <ul
      className="more_opption_modal"
      style={{
        display: target && target == "driver_opp" ? "flex" : "none",
        top: opperations ? opperations.y : 0,
        left: opperations ? opperations.x : 0,
      }}
    >
      <li onClick={modifyHandler}>
        <span>modifier</span> <MdOutlineModeEditOutline />
      </li>
      <li onClick={deleteHandler}>
        <span>supprimer</span> <MdDelete />
      </li>
    </ul>
  );
}

export default MoreOpptionsModal;
