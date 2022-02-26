import React, { useState } from "react";
import { useEffect } from "react";
import { FaWindowClose } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { requests } from "../../../constants/IpcRendererConstants";
import {
  resetAffilier,
  selectAffilier,
  setAffilier,
} from "../../../features/pages/TruckPageSlice";

const { ipcRenderer } = window.require("electron");

function AddTrcukModal({ setDisplay, display }) {
  const dispatch = useDispatch();

  const infoAffilier = useSelector(selectAffilier);

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

  useEffect(() => {
    if (infoAffilier && infoAffilier.id) {
      setChauffeur(infoAffilier.fullName);
      setChauffeurID(infoAffilier.id);
    }
  }, [infoAffilier]);

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

  const AddTruckHandler = () => {
    ipcRenderer.send(requests.ADD_TRUCK, {
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
    setDisplay(false);
    dispatch(resetAffilier());
    
    setMarque('')
    setModele('')
    setImatriculation('')
    setChauffeur('')
    setChauffeurID('')
    setCouleur('')
    setKm('')
    setDebutAssurance('')
    setFinAssurance('')
    setJoursRestantAssurance('')
  };

  const dispalayAffilierModel = () => {
    ipcRenderer.send(requests.DISPLAY_DRIVERS);
    dispatch(
      setAffilier({
        display: true,
        info: null,
      })
    );
  };

  return (
    <div className="modal" style={{ display: display ? "flex" : "none" }}>
      <div className="content_modal">
        <FaWindowClose
          size={24}
          className="exit_modal_icone"
          onClick={() => {
            setDisplay((preValue) => !preValue)
            setChauffeur('')
            setChauffeurID('')
            return dispatch(resetAffilier())
          }}
        />
        <div className="title_modal">
          <span>ajouter un camion</span>
        </div>
        <div className="body_modal">
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
              onFocus={dispalayAffilierModel}
              value={chauffeur}
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
              disabled
              value={joursRestantAssurance}
              onChange={(e) => setJoursRestantAssurance(e.target.value)}
            />
            <label>Jours restant Assurance</label>
          </div>

          <button onClick={AddTruckHandler} className="btn_primary">
            ajouter
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddTrcukModal;
