import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCamionInfo } from "../../../features/pages/SituationPageSlice";

function CardTrucks({
  id,
  marque,
  modele,
  currentChauffeurID,
  currentChauffeurName,
  card,
  setInfo,
  setCard,
}) {
  const affiliedTrucks = useSelector(selectCamionInfo);

  useEffect(() => {
    if (affiliedTrucks && affiliedTrucks.camionID)
      setCard(affiliedTrucks.camionID);
  }, [affiliedTrucks, setCard]);

  const onClickHandler = (id) => {
    setCard(id);
    setInfo({
      camionID: id,
      camion: `${marque}/${modele}`,
      chauffeur: currentChauffeurName,
      chauffeurID: currentChauffeurID,
    });
  };

  return (
    <ul
      onClick={() => onClickHandler(id)}
      className={`card_info ${card === id ? "selected_card" : ""}`}
    >
      <li>
        <span>camion : </span>
        <span>
          marque : {marque} <br/>
          model : {modele}
        </span>
      </li>
      <li>
        <span>chauffeur : </span>
        <span>{currentChauffeurName}</span>
      </li>
    </ul>
  );
}

export default CardTrucks;
