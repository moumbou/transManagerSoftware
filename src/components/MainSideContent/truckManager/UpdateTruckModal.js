import React, { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { requests } from "../../../constants/IpcRendererConstants";
import {
  resetOpperation,
  selectInfo,
  selectTarget,
} from "../../../features/pages/OpptionsSlice";
import {
  resetAffilier,
  selectAffilier,
  setAffilier,
} from "../../../features/pages/TruckPageSlice";

const { ipcRenderer } = window.require("electron");

function UpdateTruckModal() {
  const toInputDate = function (date) {
    var local = new Date(date);
    local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
  };

  const info = useSelector(selectInfo);
  const target = useSelector(selectTarget);
  const affilierInfo = useSelector(selectAffilier);
  const dispatch = useDispatch();

  const [marque, setMarque] = useState("");
  const [modele, setModele] = useState("");
  const [imatriculation, setImatriculation] = useState("");
  const [chauffeur, setChauffeur] = useState("");
  const [chauffeurID, setChauffeurID] = useState("");
  const [couleur, setCouleur] = useState("");
  const [km, setKm] = useState(Number);
  const [debutAssurance, setDebutAssurance] = useState("");
  const [finAssurance, setFinAssurance] = useState("");
  const [joursRestantAssurance, setJoursRestantAssurance] = useState(Number);

  const joursRestantCompteur = (e) => {
    const value = e.target.value;
    const dateToNumber = new Date(value);
    const thisDateToNumber = new Date().setHours(0, 0, 0, 0);
    const isTooLate = thisDateToNumber > dateToNumber;
    const diffrenceDates = Math.abs(dateToNumber - thisDateToNumber);
    const diffrenceToDays = Math.round(diffrenceDates / (60 * 60 * 24 * 1000));

    setFinAssurance(value);
    setJoursRestantAssurance(isTooLate ? 0 : diffrenceToDays);
  };

  const joursRestantCompteurFirst = (date) => {
    const dateToNumber = new Date(date);
    const thisDateToNumber = new Date().setHours(0, 0, 0, 0);
    const isTooLate = thisDateToNumber > dateToNumber;
    const diffrenceDates = Math.abs(dateToNumber - thisDateToNumber);
    const diffrenceToDays = Math.round(diffrenceDates / (60 * 60 * 24 * 1000));

    return isTooLate ? 0 : diffrenceToDays;
  };

  useEffect(() => {
    if (target === "modify_truck" && info) {
      setMarque(info.marque);
      setModele(info.modele);
      setImatriculation(info.imatriculation);
      setChauffeur(info.currentChauffeurName);
      setChauffeurID(info._id);
      setCouleur(info.couleur);
      setKm(info.km);
      setDebutAssurance(toInputDate(new Date(info.debutAssurance)));
      setFinAssurance(toInputDate(new Date(info.finAssurance)));
      setJoursRestantAssurance(joursRestantCompteurFirst(info.finAssurance));
    }

    if (affilierInfo && affilierInfo.id) {
      setChauffeur(affilierInfo.fullName);
      setChauffeurID(affilierInfo.id);
    }
  }, [info, target, affilierInfo]);

  const dispalayAffilierModel = () => {
    ipcRenderer.send(requests.DISPLAY_DRIVERS);
    dispatch(
      setAffilier({
        display: true,
        info: null,
      })
    );
  };

  const confirmeUpdateHandler = () => {
    ipcRenderer.send(requests.UPDATE_TRUCK, {
      id: info.id,
      marque,
      modele,
      couleur,
      km,
      imatriculation,
      currentChauffeurID: chauffeurID,
      currentChauffeurName: chauffeur,
      debutAssurance: new Date(debutAssurance),
      finAssurance: new Date(finAssurance),
    });
    dispatch(resetOpperation());
    dispatch(resetAffilier());
    setChauffeur("");
    setChauffeurID("");
  };
  const declineHandler = () => {
    dispatch(resetOpperation());
    dispatch(resetAffilier());
    setChauffeur("");
    setChauffeurID("");
  };

  return (
    <div
      className="modal"
      style={{ display: target === "modify_truck" ? "flex" : "none" }}
    >
      <div className="content_modal">
        <div className="body_modal">
          <p className="center cl-primary">
            <MdEdit size={34} />
          </p>

          <p className="delete_p">
            Vous etes sur le point de modifier le camion{" "}
            <span className="delete_span">
              {marque ? `${marque} ${modele}` : "Erreur"}
            </span>
          </p>

          <span className="badge badge-primary">Informations</span>

          <div className="grid_2">
            <div className={`input_groupe ${marque ? "valid_input" : ""}`}>
              <input
                type="text"
                value={marque}
                onChange={(e) => setMarque(e.target.value)}
              />
              <label>Marque</label>
            </div>

            <div className={`input_groupe ${modele ? "valid_input" : ""}`}>
              <input
                type="text"
                value={modele}
                onChange={(e) => setModele(e.target.value)}
              />
              <label>Modéle</label>
            </div>
          </div>

          <div
            className={`input_groupe w-100 ${
              imatriculation ? "valid_input" : ""
            }`}
          >
            <input
              type="text"
              value={imatriculation}
              onChange={(e) => setImatriculation(e.target.value)}
            />
            <label>Imitraculation</label>
          </div>

          <div
            className={`input_groupe w-100 ${chauffeur ? "valid_input" : ""}`}
          >
            <input
              type="text"
              value={chauffeur}
              onFocus={dispalayAffilierModel}
              onChange={(e) => setChauffeur(e.target.value)}
            />
            <label>Chauffeur</label>
          </div>

          <div className="grid_2">
            <div className={`input_groupe ${couleur ? "valid_input" : ""}`}>
              <input
                type="text"
                value={couleur}
                onChange={(e) => setCouleur(e.target.value)}
              />
              <label>Couleur</label>
            </div>

            <div className={`input_groupe ${km ? "valid_input" : ""}`}>
              <input
                type="number"
                value={km}
                onChange={(e) => setKm(e.target.value)}
              />
              <label>Km</label>
            </div>
          </div>

          <div className="grid_2">
            <div
              className={`input_groupe w-100 ${
                debutAssurance ? "valid_input" : ""
              }`}
            >
              <input
                type="date"
                value={debutAssurance}
                onChange={(e) => setDebutAssurance(e.target.value)}
              />
              <label>Debut d'assurance</label>
            </div>

            <div
              className={`input_groupe w-100 ${
                finAssurance ? "valid_input" : ""
              }`}
            >
              <input
                type="date"
                value={finAssurance}
                onChange={joursRestantCompteur}
              />
              <label>Fin d'assurance</label>
            </div>
          </div>

          <div
            className={`input_groupe ${
              joursRestantAssurance ? "valid_input" : ""
            }`}
          >
            <input
              type="number"
              style={{ pointerEvents: "none" }}
              value={joursRestantAssurance}
              onChange={(e) => setJoursRestantAssurance(e.target.value)}
            />
            <label>Jours restant Assurance</label>
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

export default UpdateTruckModal;
