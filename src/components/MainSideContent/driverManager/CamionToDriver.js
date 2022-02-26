import React, { useEffect, useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { selectAffiliationCamion, setAffiliationCamion } from "../../../features/pages/DriverPageSlice";
import { selectTrucks } from "../../../features/pages/TruckPageSlice";
import CardTruck from "./CardTruck";

function CamionToDriver() {
  const Alltrucks = useSelector(selectTrucks);
  const affilier = useSelector(selectAffiliationCamion);

  const dispatch = useDispatch();

  const [card, setCard] = useState("");
  const [info, setInfo] = useState("");

  const [display, setDisplay] = useState(false);
  const [trucks, setTrucks] = useState([]);

  useEffect(() => {
    if (affilier && affilier.display) setDisplay(true);
    if (Alltrucks && Alltrucks.length) setTrucks(Alltrucks);
    if (affilier && affilier.id)
      setInfo({ fullName: affilier.fullName, id: affilier.id });
  }, [affilier, Alltrucks]);

  const affilierHandler = () => {
    setDisplay(false);
    dispatch(
      setAffiliationCamion({
        display: false,
        id: info.id,
        fullName: info.fullName,
      })
    );
    setInfo("")
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
          {trucks.map(({ _id, marque, modele, couleur, imatriculation }) => (
            <CardTruck
              key={_id}
              id={_id}
              marque={marque}
              modele={modele}
              couleur={couleur}
              imatriculation={imatriculation}
              card={card}
              setCard={setCard}
              setInfo={setInfo}
            />
          ))}
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

export default CamionToDriver;
