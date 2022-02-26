import React from "react";
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

function DeleteDriverModal() {
  const info = useSelector(selectInfo);
  const target = useSelector(selectTarget);
  const dispatch = useDispatch();

  const declineHandler = () => {
    dispatch(resetOpperation());
  };

  const confirmeDeleteHandler = () => {
    ipcRenderer.send(requests.DELETE_DRIVER, info ? info.id : null);
    dispatch(resetOpperation());
  };

  return (
    <div
      className="modal"
      style={{ display: target === "delete_driver" ? "flex" : "none" }}
    >
      <div className="content_modal">
        <div className="body_modal">
          <p className="center cl-warning">
            <MdDelete size={34} />
          </p>

          <p className="delete_p">
            Vous etes sur le point de supprimer{" "}
            <span className="delete_span">
              {info ? `${info.nom} ${info.prenom}` : "Erreur"}
            </span>
          </p>

          <span className="badge badge-primary">plus d'info</span>

          <div className="grid_2">
            <div
              className={`input_groupe ${
                info && info.nom ? "valid_input" : ""
              }`}
            >
              <input type="text" disabled defaultValue={info ? info.nom : ""} />
              <label>Nom</label>
            </div>
            <div
              className={`input_groupe ${
                info && info.prenom ? "valid_input" : ""
              }`}
            >
              <input
                type="text"
                disabled
                defaultValue={info ? info.prenom : ""}
              />
              <label>Prenom</label>
            </div>
          </div>

          <div
            className={`input_groupe ${
              info && info.dateDebut ? "valid_input" : ""
            }`}
          >
            <input
              type="text"
              disabled
              defaultValue={
                info
                  ? new Date(info.dateDebut).toLocaleString().split(",")[0]
                  : ""
              }
            />
            <label>Date de debut</label>
          </div>

          <div
            className={`input_groupe w-100 ${
              info && info.permis ? "valid_input" : ""
            }`}
          >
            <input
              type="text"
              disabled
              defaultValue={info ? info.permis : ""}
            />
            <label>N° de permis</label>
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

export default DeleteDriverModal;
