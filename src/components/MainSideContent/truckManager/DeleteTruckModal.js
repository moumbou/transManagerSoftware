import React, { useState } from "react";
import { useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { requests } from "../../../constants/IpcRendererConstants";
import {
  resetOpperation,
  selectInfo,
  selectTarget,
} from "../../../features/pages/OpptionsSlice";

const { ipcRenderer } = window.require("electron");

function DeleteTruckModal() {
    const toInputDate = function (date) {
        var local = new Date(date);
        local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
        return local.toJSON().slice(0, 10);
      };

    const [marque, setMarque] = useState('')
    const [modele, setModele] = useState('')
    const [imatriculation, setImatriculation] = useState('')
    const [chauffeur, setChauffeur] = useState('')
    const [couleur, setCouleur] = useState('')
    const [km, setKm] = useState(Number)
    const [debutAssurance, setDebutAssurance] = useState('')
    const [finAssurance, setFinAssurance] = useState('')
    const [joursRestantAssurance, setJoursRestantAssurance] = useState(Number)
  
    const joursRestantCompteur = (date) => {
      const dateToNumber = new Date(date)
      const thisDateToNumber = new Date().setHours(0, 0, 0, 0)
      const isTooLate = thisDateToNumber > dateToNumber
      const diffrenceDates = Math.abs(dateToNumber - thisDateToNumber)
      const diffrenceToDays = Math.round(diffrenceDates / (60 * 60 * 24 * 1000))
  
      return isTooLate ? 0 : diffrenceToDays
    }

  const info = useSelector(selectInfo);
  const target = useSelector(selectTarget);
  const dispatch = useDispatch();

  useEffect(() => {

    if(target === 'delete_truck' && info) {
        setMarque(info.marque)
        setModele(info.modele)
        setImatriculation(info.imatriculation)
        setChauffeur(info.currentChauffeurName)
        setCouleur(info.couleur)
        setKm(info.km)
        setDebutAssurance(toInputDate(new Date(info.debutAssurance)))
        setFinAssurance(toInputDate(new Date(info.finAssurance)))
        setJoursRestantAssurance(joursRestantCompteur(info.finAssurance))
    }

  }, [info, target])

  const declineHandler = () => {
    dispatch(resetOpperation());
  };

  const confirmeDeleteHandler = () => {
    ipcRenderer.send(requests.DELETE_TRUCK, info ? info.id : null);
    dispatch(resetOpperation());
  };

  return (
    <div
      className="modal"
      style={{ display: target === "delete_truck" ? "flex" : "none" }}
    >
      <div className="content_modal">
        <div className="body_modal">
          <p className="center cl-warning">
            <MdDelete size={34} />
          </p>

          <p className="delete_p">
            Vous etes sur le point de supprimer le camion{" "}
            <span className="delete_span">
              {marque ? `${modele} ${marque}` : "Erreur"}
            </span>
          </p>

          <span className="badge badge-primary">plus d'info</span>

          <div className="grid_2">
            <div className={`input_groupe w-100 ${marque ? 'valid_input' : ''}`}>
              <input type="text" 
              disabled
              value={marque}
              onChange={(e) => setMarque(e.target.value)} />
              <label>Marque</label>
            </div>

            <div className={`input_groupe w-100 ${modele ? 'valid_input' : ''}`}>
              <input type="text" 
              disabled
              value={modele}
              onChange={(e) => setModele(e.target.value)}/>
              <label>Modéle</label>
            </div>
          </div>

          <div className={`input_groupe w-100 ${imatriculation ? 'valid_input' : ''}`}>
            <input type="text" 
            disabled
            value={imatriculation}
            onChange={(e) => setImatriculation(e.target.value)}/>
            <label>Imitraculation</label>
          </div>

          <div className={`input_groupe w-100 ${chauffeur ? 'valid_input' : ''}`}>
            <input type="text" 
            disabled
            value={chauffeur}
            onChange={(e) => setChauffeur(e.target.value)}/>
            <label>Chauffeur</label>
          </div>

          <div className="grid_2">
            <div className={`input_groupe w-100 ${couleur ? 'valid_input' : ''}`}>
              <input type="text"
              disabled
              value={couleur}
              onChange={(e) => setCouleur(e.target.value)}/>
              <label>Couleur</label>
            </div>

            <div className={`input_groupe w-100 ${km ? 'valid_input' : ''}`}>
              <input type="number"
              disabled
              value={km}
              onChange={(e) => setKm(e.target.value)}/>
              <label>Km</label>
            </div>
          </div>

          <div className="grid_2">
            <div className={`input_groupe w-100 ${debutAssurance ? 'valid_input' : ''}`}>
              <input type="date" 
              disabled
              value={debutAssurance}
              onChange={(e) => setDebutAssurance(e.target.value)}/>
              <label>Debut d'assurance</label>
            </div>

            <div className={`input_groupe w-100 ${finAssurance ? 'valid_input' : ''}`}>
              <input type="date" 
              disabled
              value={finAssurance}
              onChange={joursRestantCompteur}/>
              <label>Fin d'assurance</label>
            </div>
          </div>

          <div className={`input_groupe w-100 ${joursRestantAssurance ? 'valid_input' : ''}`}>
            <input type="number"
            disabled
            value={joursRestantAssurance}
            onChange={(e) => setJoursRestantAssurance(e.target.value)}/>
            <label>Jours restant Assurance</label>
          </div>

          <div className="grid_2">
            <button onClick={confirmeDeleteHandler} className="btn_warning">supprimer quand meme</button>
            <button onClick={declineHandler} className="btn_primary">
              annuller
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteTruckModal;
