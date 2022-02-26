import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { requests } from "../../../constants/IpcRendererConstants";
import {
  resetCamionInfo,
  selectCamionInfo,
  setCamionInfo,
} from "../../../features/pages/SituationPageSlice";

const { ipcRenderer } = window.require("electron");

function AddSituationModal({ display, setDisplay }) {
  const dispatch = useDispatch();
  const camionInfo = useSelector(selectCamionInfo);

  const [camion, setCamion] = useState("");
  const [camionID, setCamionID] = useState("");
  const [chauffeur, setChauffeur] = useState("");
  const [chauffeurID, setChauffeurID] = useState("");
  const [depart, setDepart] = useState("");
  const [departDate, setDepartDate] = useState("");
  const [arriver, setArriver] = useState("");
  const [arriverDate, setArriverDate] = useState("");
  const [fraisMission, setFraisMission] = useState(0);
  const [depenses, setDepenses] = useState(0);
  const [benefices, setBenefices] = useState(0);
  const [situation, setSituation] = useState(0);

  const dispalayAffilierModel = () => {
    ipcRenderer.send(requests.GET_AFFILIED_TRUCKS);
    dispatch(
      setCamionInfo({
        display: true,
        camionID: camionInfo ? camionInfo.camionID : null,
        camion: camionInfo ? camionInfo.camion : null,
        chauffeur: camionInfo ? camionInfo.chauffeur : null,
        chauffeurID: camionInfo ? camionInfo.chauffeurID : null,
      })
    );
  };

  useEffect(() => {
    if (camionInfo && camionInfo.camionID) {
      setCamionID(camionInfo.camionID);
      setCamion(camionInfo.camion);
      setChauffeur(camionInfo.chauffeur);
      setChauffeurID(camionInfo.chauffeurID);
    }
  }, [camionInfo]);

  const SubmitHandler = (e) => {
    e.preventDefault();
    ipcRenderer.send(requests.ADD_SITUATION, {
      camionID,
      camion,
      chauffeurID,
      chauffeur,
      depart,
      arriver,
      departDate: departDate ? new Date(departDate) : null,
      arriverDate: arriverDate ? new Date(arriverDate) : null,
      fraisMission,
      depenses,
      benefices,
      situation,
    });

    if (!camionID || !chauffeurID) return;
    
    setCamion("");
    setCamionID("");
    setChauffeur("");
    setChauffeurID("");
    setDepart("");
    setDepartDate("");
    setArriver("");
    setArriverDate("");
    setFraisMission(0);
    setDepenses(0);
    setBenefices(0);
    setSituation(0);

    dispatch(resetCamionInfo());
    setDisplay(false);
  };

  return (
    <div className="modal" style={{ display: display ? "flex" : "none" }}>
      <div className="content_modal">
        <FaWindowClose
          size={24}
          className="exit_modal_icone"
          onClick={() => {
            setCamion("");
            setCamionID("");
            setChauffeur("");
            setChauffeurID("");
            setDepart("");
            setDepartDate("");
            setArriver("");
            setArriverDate("");
            setFraisMission(0);
            setDepenses(0);
            setBenefices(0);
            setSituation(0);
            dispatch(resetCamionInfo());
            setDisplay(false);
          }}
        />
        <div className="title_modal">
          <span>ajouter une situation</span>
        </div>
        <form onSubmit={SubmitHandler} className="body_modal">
          <div className="grid_2">
            <div className={`input_groupe ${camion ? "valid_input" : ""}`}>
              <input
                onFocus={dispalayAffilierModel}
                type="text"
                onChange={() => null}
                value={camion}
              />
              <label>camion</label>
            </div>
            <div className={`input_groupe ${chauffeur ? "valid_input" : ""}`}>
              <input
                style={{ pointerEvents: "none" }}
                value={chauffeur}
                onChange={() => null}
                type="text"
              />
              <label>chauffeur</label>
            </div>
          </div>

          <div className="grid_2">
            <div
              className={`input_groupe w-100 ${depart ? "valid_input" : ""}`}
            >
              <input
                value={depart}
                onChange={(e) => setDepart(e.target.value)}
                type="text"
              />
              <label>départ</label>
            </div>
            <div
              className={`input_groupe w-100 ${
                departDate ? "valid_input" : ""
              }`}
            >
              <input
                value={departDate}
                onChange={(e) => setDepartDate(e.target.value)}
                type="date"
              />
              <label>le</label>
            </div>
          </div>

          <div className="grid_2">
            <div
              className={`input_groupe w-100 ${arriver ? "valid_input" : ""}`}
            >
              <input
                value={arriver}
                onChange={(e) => setArriver(e.target.value)}
                type="text"
              />
              <label>arriver</label>
            </div>
            <div
              className={`input_groupe w-100 ${
                arriverDate ? "valid_input" : ""
              }`}
            >
              <input
                value={arriverDate}
                onChange={(e) => setArriverDate(e.target.value)}
                type="date"
              />
              <label>le</label>
            </div>
          </div>

          <div className="grid_2">
            <div
              className={`input_groupe ${fraisMission ? "valid_input" : ""}`}
            >
              <input
                value={fraisMission}
                onChange={(e) => setFraisMission(e.target.value)}
                type="number"
              />
              <label>frais de mission</label>
            </div>
            <div className={`input_groupe ${depenses ? "valid_input" : ""}`}>
              <input
                value={depenses}
                onChange={(e) => setDepenses(e.target.value)}
                type="number"
              />
              <label>dépenses</label>
            </div>
          </div>

          <div className="grid_2">
            <div className={`input_groupe ${benefices ? "valid_input" : ""}`}>
              <input
                value={benefices}
                onChange={(e) => setBenefices(e.target.value)}
                type="number"
              />
              <label>bénéfices</label>
            </div>
            <div className={`input_groupe ${situation ? "valid_input" : ""}`}>
              <input
                value={situation}
                onChange={(e) => setSituation(e.target.value)}
                type="number"
              />
              <label>situation</label>
            </div>
          </div>

          <button type="submit" className="btn_primary">
            ajouter
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddSituationModal;
