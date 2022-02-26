import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectDrivers } from "../../../features/pages/DriverPageSlice";
import {
  selectAffilier,
  setAffilier,
} from "../../../features/pages/TruckPageSlice";
import CardDrivers from "./CardDrivers";
import { FaWindowClose } from "react-icons/fa";
import { useDispatch } from "react-redux";

function AddDriverToTruck() {
  const affilier = useSelector(selectAffilier);
  const allDrivers = useSelector(selectDrivers);

  const dispatch = useDispatch();

  const [card, setCard] = useState("");
  const [info, setInfo] = useState("");

  const [display, setDisplay] = useState(false);
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    if (affilier && affilier.display) setDisplay(true);
    if (allDrivers && allDrivers.length) setDrivers(allDrivers);
    if (affilier && affilier.id)
      setInfo({ fullName: affilier.fullName, id: affilier.id });
  }, [affilier, allDrivers]);

  const affilierHandler = () => {
    setDisplay(false);
    dispatch(
      setAffilier({
        display: false,
        id: info.id,
        fullName: info.fullName,
      })
    );
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
          <span>affilié un chauffeur</span>
        </div>
        <div className="body_modal grided_body_modal max_300">
          {drivers.map(({ _id, nom, prenom, N_permis, dateDebut }) => (
            <CardDrivers
              key={_id}
              setInfo={setInfo}
              card={card}
              setCard={setCard}
              id={_id}
              nom={nom}
              prenom={prenom}
              permis={N_permis}
              dateDebut={dateDebut}
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

export default AddDriverToTruck;
