import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectAffilier } from "../../../features/pages/TruckPageSlice";

function CardDrivers({ setInfo, setCard, card, id, nom, prenom, permis, dateDebut }) {

    const affilierInfo = useSelector(selectAffilier)

    useEffect(() => {
        if(affilierInfo && affilierInfo.id) setCard(affilierInfo.id)
    }, [affilierInfo, setCard])

    const onClickHandler = (id) => {
        setCard(id)
        setInfo({
            fullName: `${nom} ${prenom}`,
            id
        })
    }

  return (
    <ul onClick={() => onClickHandler(id)} className={`card_info ${card === id ? 'selected_card' : ''}`}>
      <li>
        <span>nom prenom : </span>
        <span>{nom} {prenom}</span>
      </li>
      <li>
        <span>N° permis : </span>
        <span>{permis}</span>
      </li>
      <li>
        <span>date de debut : </span>
        <span>{dateDebut}</span>
      </li>
    </ul>
  );
}

export default CardDrivers;
