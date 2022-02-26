import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  selectCamionArray,
  selectCamionInfo,
  setCamionInfo,
} from "../../../features/pages/SituationPageSlice";
import CardTrucks from "./CardTrucks";

function AddTruckToSituation() {
  const camionInfo = useSelector(selectCamionInfo);
  const affiliedTrucks = useSelector(selectCamionArray);

  const dispatch = useDispatch();

  const [display, setDisplay] = useState(false);
  const [trucks, setTrucks] = useState([]);

  const [info, setInfo] = useState(null);
  const [card, setCard] = useState("");

  useEffect(() => {
    if (affiliedTrucks && affiliedTrucks.length) {
      setTrucks(affiliedTrucks);
    }
    if (camionInfo && camionInfo.display) setDisplay(true);
    if (camionInfo && camionInfo.camionID)
      setInfo({
        camionID: camionInfo.camionID,
        camion: camionInfo.camion,
        chauffeur: camionInfo.chauffeur,
        chauffeurID: camionInfo.chauffeurID,
      });
  }, [camionInfo, affiliedTrucks]);

  const affilierHandler = () => {
    setDisplay(false);
    dispatch(
      setCamionInfo({
        display: false,
        id: info.id,
        camionID: info.camionID,
        camion: info.camion,
        chauffeur: info.chauffeur,
        chauffeurID: info.chauffeurID,
      })
    );
    setInfo(null);
  };

  return (
    <div className="modal" style={{ display: display ? "flex" : "none" }}>
      <div className="content_modal">
        <FaWindowClose
          size={24}
          className="exit_modal_icone"
          onClick={() => setDisplay((preValue) => !preValue)}
        />

        <div className="title_modal">
          <span>affilié a un camion</span>
        </div>
        <div className="body_modal grided_body_modal max_300">
          {trucks.map(
            ({
              _id,
              marque,
              modele,
              currentChauffeurID,
              currentChauffeurName,
            }) => (
              <CardTrucks
                key={_id}
                id={_id}
                marque={marque}
                modele={modele}
                currentChauffeurID={currentChauffeurID}
                currentChauffeurName={currentChauffeurName}
                card={card}
                setCard={setCard}
                setInfo={setInfo}
              />
            )
          )}
        </div>
        <button
          onClick={affilierHandler}
          className={`btn_primary btn_100 btn_mt_5 ${
            info ? "" : "btn_disabled"
          }`}
        >
          affilier
        </button>
      </div>
    </div>
  );
}

export default AddTruckToSituation;
