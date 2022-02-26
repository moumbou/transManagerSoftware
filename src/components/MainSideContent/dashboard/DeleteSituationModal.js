import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { requests } from "../../../constants/IpcRendererConstants";
import {
    resetOpperation,
  selectInfo,
  selectTarget,
} from "../../../features/pages/OpptionsSlice";

const { ipcRenderer } = window.require('electron')

function DeleteSituationModal() {
  const toInputDate = function (currentDate) {
    if (!currentDate) return "";
    let date = new Date(currentDate);
    let local = new Date(date);
    local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
  };

  const dispatch = useDispatch();
  const info = useSelector(selectInfo);
  const target = useSelector(selectTarget);

  const [display, setDisplay] = useState(false);

  const [camion, setCamion] = useState("");
  const [chauffeur, setChauffeur] = useState("");
  const [depart, setDepart] = useState("");
  const [departDate, setDepartDate] = useState("");
  const [arriver, setArriver] = useState("");
  const [arriverDate, setArriverDate] = useState("");
  const [fraisMission, setFraisMission] = useState("");
  const [depenses, setDepenses] = useState("");
  const [benefices, setBenefices] = useState("");
  const [situation, setSituation] = useState("");

  useEffect(() => {
    if (info && target === "delete_situation") {
      setCamion(info.camion);
      setChauffeur(info.chauffeur);
      setDepart(info.depart);
      setDepartDate(toInputDate(info.departDate));
      setArriver(info.arriver);
      setArriverDate(toInputDate(info.arriverDate));
      setFraisMission(info.fraisMission);
      setDepenses(info.depenses);
      setBenefices(info.benefices);
      setSituation(info.situation ? '- ' + info.situation : 0);
    }

    setDisplay(target === "delete_situation");
  }, [info, target]);

  const confirmeHandler = () => {
    ipcRenderer.send(requests.DELTE_SITUATION, info.id)
    dispatch(resetOpperation())
  }

  const declineHandler = () => {
      dispatch(resetOpperation())
  }

  return (
    <div className="modal" style={{ display: display ? "flex" : "none" }}>
      <div className="content_modal">
        <div className="body_modal">
          <p className="center cl-primary">
            <MdDelete size={34} />
          </p>

          <div className="grid_2">
            <div className={`input_groupe ${camion ? "valid_input" : ""}`}>
              <input type="text" disabled defaultValue={camion} />
              <label>camion</label>
            </div>
            <div className={`input_groupe ${chauffeur ? "valid_input" : ""}`}>
              <input
                style={{ pointerEvents: "none" }}
                defaultValue={chauffeur}
                disabled
                type="text"
              />
              <label>chauffeur</label>
            </div>
          </div>

          <div className="grid_2">
            <div
              className={`input_groupe w-100 ${depart ? "valid_input" : ""}`}
            >
              <input defaultValue={depart} disabled type="text" />
              <label>départ</label>
            </div>
            <div
              className={`input_groupe w-100 ${
                departDate ? "valid_input" : ""
              }`}
            >
              <input defaultValue={departDate} disabled type="date" />
              <label>le</label>
            </div>
          </div>

          <div className="grid_2">
            <div
              className={`input_groupe w-100 ${arriver ? "valid_input" : ""}`}
            >
              <input defaultValue={arriver} disabled type="text" />
              <label>arriver</label>
            </div>
            <div
              className={`input_groupe w-100 ${
                arriverDate ? "valid_input" : ""
              }`}
            >
              <input defaultValue={arriverDate} disabled type="date" />
              <label>le</label>
            </div>
          </div>

          <div className="grid_2">
            <div
              className={`input_groupe ${fraisMission ? "valid_input" : ""}`}
            >
              <input defaultValue={fraisMission} disabled type="text" />
              <label>frais de mission</label>
            </div>
            <div className={`input_groupe ${depenses ? "valid_input" : ""}`}>
              <input defaultValue={depenses} disabled type="text" />
              <label>dépenses</label>
            </div>
          </div>

          <div className="grid_2">
            <div className={`input_groupe ${benefices ? "valid_input" : ""}`}>
              <input defaultValue={benefices} disabled type="text" />
              <label>bénéfices</label>
            </div>
            <div className={`input_groupe ${situation ? "valid_input" : ""}`}>
              <input defaultValue={situation} disabled type="text" />
              <label>situation</label>
            </div>
          </div>

          <div className="grid_2">
            <button 
            onClick={confirmeHandler}
             className="btn_warning">
              supprimer
            </button>
            <button 
            onClick={declineHandler} 
            className="btn_primary">
              annuller
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteSituationModal;
