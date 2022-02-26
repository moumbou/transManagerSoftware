import React, { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { requests } from "../../../constants/IpcRendererConstants";
import { resetAffiliationCamio, selectAffiliationCamion, setAffiliationCamion } from "../../../features/pages/DriverPageSlice";
import {
  resetOpperation,
  selectInfo,
  selectTarget,
} from "../../../features/pages/OpptionsSlice";

const { ipcRenderer } = window.require("electron");

function UpdateDriver() {
  const toInputDate = function (date) {
    var local = new Date(date);
    local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
  };

  const info = useSelector(selectInfo);
  const target = useSelector(selectTarget);
  const affilierInfo = useSelector(selectAffiliationCamion)
  const dispatch = useDispatch();

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [permis, setPremis] = useState("");
  const [date, setDate] = useState("");
  const [camion, setCamion] = useState("");
  const [camionID, setCamionID] = useState("");

  useEffect(() => {
    if (target === "modify_driver" && info) {
      setNom(info.nom);
      setPrenom(info.prenom);
      setPremis(info.permis);
      setDate(toInputDate(new Date(info.dateDebut)));
      setCamion(info.currentCamion);
      setCamionID(info.currentCamionID);
    }

    if (affilierInfo && affilierInfo.id) {
      setCamion(affilierInfo.fullName);
      setCamionID(affilierInfo.id);
    }
  }, [target, info, affilierInfo]);

  const confirmeUpdateHandler = () => {
    ipcRenderer.send(requests.UPDATE_DRIVER, {
      id: info.id,
      nom,
      prenom,
      N_permis: permis,
      dateDebut: new Date(date),
      currentCamion: camion,
      currentCamionID: camionID,
    });
    dispatch(resetOpperation());
    dispatch(resetAffiliationCamio())
    setCamion('')
    setCamionID('')
  };
  const declineHandler = () => {
    dispatch(resetOpperation());
    dispatch(resetAffiliationCamio())
    setCamion('')
    setCamionID('')
  };

  const dispalayAffilierModel = () => {
    ipcRenderer.send(requests.DISLPAY_TRUCKS);
    dispatch(
      setAffiliationCamion({
        display: true,
        id: affilierInfo ? affilierInfo.id : null,
        fullName: affilierInfo ? affilierInfo.fullName : null,
      })
    );
  };

  return (
    <div
      className="modal"
      style={{ display: target === "modify_driver" ? "flex" : "none" }}
    >
      <div className="content_modal">
        <div className="body_modal">
          <p className="center cl-primary">
            <MdEdit size={34} />
          </p>

          <p className="delete_p">
            Vous etes sur le point de modifier{" "}
            <span className="delete_span">
              {info ? `${info.nom} ${info.prenom}` : "Erreur"}
            </span>
          </p>

          <span className="badge badge-primary">Informations</span>

          <div className="grid_2">
            <div className={`input_groupe ${nom ? "valid_input" : ""}`}>
              <input
                type="text"
                onChange={(e) => setNom(e.target.value)}
                value={nom}
              />
              <label>Nom</label>
            </div>
            <div className={`input_groupe ${prenom ? "valid_input" : ""}`}>
              <input
                type="text"
                onChange={(e) => setPrenom(e.target.value)}
                value={prenom}
              />
              <label>Prenom</label>
            </div>
          </div>

          <div className={`input_groupe w-100 ${permis ? "valid_input" : ""}`}>
            <input
              type="text"
              onChange={(e) => setPremis(e.target.value)}
              value={permis}
            />
            <label>N° de permis</label>
          </div>

          <div className="grid_2 w-100">
            <div className={`input_groupe ${date ? "valid_input" : ""}`}>
              <input
                type="date"
                onChange={(e) => setDate(e.target.value)}
                value={date}
              />
              <label>Date de debut</label>
            </div>

            <div
              className={`input_groupe w-100 ${camion ? "valid_input" : ""}`}
            >
              <input
                type="text"
                onFocus={dispalayAffilierModel}
                onChange={(e) => setCamion(e.target.value)}
                value={camion}
              />
              <label>Camion</label>
            </div>
          </div>

          <div className="grid_2">
            <button onClick={confirmeUpdateHandler} className="btn_success">
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

export default UpdateDriver;
