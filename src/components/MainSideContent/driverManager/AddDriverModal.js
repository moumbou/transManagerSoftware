import React, { useEffect, useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { requests } from "../../../constants/IpcRendererConstants";
import { resetAffiliationCamio, selectAffiliationCamion, setAffiliationCamion } from "../../../features/pages/DriverPageSlice";

const { ipcRenderer } = window.require("electron");

function AddDriverModal({ display, setDisplay }) {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [permis, setPremis] = useState("");
  const [date, setDate] = useState("");
  const [camion, setCamion] = useState("");
  const [camionID, setCamionID] = useState("");

  const dispatch = useDispatch();
  const infoAffilier = useSelector(selectAffiliationCamion)
  
  useEffect(() => {
    if (infoAffilier && infoAffilier.id) {
      setCamion(infoAffilier.fullName);
      setCamionID(infoAffilier.id);
    }
  }, [infoAffilier]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const obj = {
      nom,
      prenom,
      N_permis: permis,
      dateDebut: new Date(date),
      currentCamion: camion,
      currentCamionID: camionID
    };

    ipcRenderer.send(requests.ADD_DRIVER, obj);
    setDisplay(false);
    dispatch(resetAffiliationCamio())
    setNom("");
    setPrenom("");
    setPremis("");
    setDate("");
    setCamion("");
    setCamionID("");
  };

  const dispalayAffilierModel = () => {
    ipcRenderer.send(requests.DISLPAY_TRUCKS);
    dispatch(
      setAffiliationCamion({
        display: true,
        id: infoAffilier ? infoAffilier.id : null,
        fullName: infoAffilier ? infoAffilier.fullName : null,
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
            setNom("");
            setPrenom("");
            setPremis("");
            setDate("");
            setCamion("");
            setCamionID("");
            return dispatch(resetAffiliationCamio())
          }}
        />
        <div className="title_modal">
          <span>ajouter un chauffeur</span>
        </div>
        <form onSubmit={onSubmitHandler} className="body_modal">
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
            <label>N° de permis de conduire</label>
          </div>

          <div className="grid_2">
            <div className={`input_groupe w-100 ${date ? "valid_input" : ""}`}>
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

          <button type="submit" className="btn_primary">
            ajouter
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddDriverModal;
