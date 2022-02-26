import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { MdEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { requests } from "../../../constants/IpcRendererConstants";
import {
  resetOpperation,
  selectInfo,
  selectTarget,
} from "../../../features/pages/OpptionsSlice";
import {
  resetCamionInfo,
  selectCamionInfo,
  setCamionInfo,
} from "../../../features/pages/SituationPageSlice";

const { ipcRenderer } = window.require("electron");

function UpdateSituation() {
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
  const camionInfo = useSelector(selectCamionInfo);

  const [display, setDisplay] = useState(false);

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

  useEffect(() => {
    if (info && target === "modify_situation") {
      setCamion(info.camion);
      setCamionID(info.camionID);
      setChauffeur(info.chauffeur);
      setChauffeurID(info.chauffeurID);
      setDepart(info.depart);
      setDepartDate(toInputDate(info.departDate));
      setArriver(info.arriver);
      setArriverDate(toInputDate(info.arriverDate));
      setFraisMission(info.fraisMission);
      setDepenses(info.depenses);
      setBenefices(info.benefices);
      setSituation(info.situation);
    }

    setDisplay(target === "modify_situation");

    if (camionInfo && camionInfo.camionID) {
      setCamion(camionInfo.camion);
      setCamionID(camionInfo.camionID);
      setChauffeur(camionInfo.chauffeur);
      setChauffeurID(camionInfo.chauffeurID);
    }
  }, [info, target, camionInfo]);

  const declineHandler = () => {
    dispatch(resetOpperation());
    dispatch(resetCamionInfo());
    setCamion("");
    setCamionID("");
    setChauffeur("");
    setChauffeurID("");
  };

  const confirmeHandler = () => {
    ipcRenderer.send(requests.UPDATE_SITUATION, {
      id: info.id,
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

    dispatch(resetOpperation());
    dispatch(resetCamionInfo());
    setCamion("");
    setCamionID("");
    setChauffeur("");
    setChauffeurID("");
  };

  const dispalayAffilierModel = () => {
    ipcRenderer.send(requests.GET_AFFILIED_TRUCKS);
    dispatch(
      setCamionInfo({
        display: true,
        camion,
        camionID,
        chauffeur,
        chauffeurID,
      })
    );
  };

  return (
    <div className="modal" style={{ display: display ? "flex" : "none" }}>
      <div className="content_modal">
        <div className="body_modal">
          <p className="center cl-primary">
            <MdEdit size={34} />
          </p>

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

          <div className="grid_2">
            <button onClick={confirmeHandler} className="btn_success">
              modifier
            </button>
            <button onClick={declineHandler} className="btn_primary">
              annuller
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateSituation;
