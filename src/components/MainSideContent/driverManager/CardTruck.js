import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectAffiliationCamion } from '../../../features/pages/DriverPageSlice'

function CardTruck({
    id,
    marque,
    modele,
    couleur,
    imatriculation,
    card,
    setCard,
    setInfo
}) {

    const affilierInfo = useSelector(selectAffiliationCamion)

    useEffect(() => {
        if(affilierInfo && affilierInfo.id) setCard(affilierInfo.id)
    }, [affilierInfo, setCard])

    const onClickHandler = (id) => {
        setCard(id)
        setInfo({
            fullName: `${marque} ${modele}`,
            id
        })
    }

  return (
    <ul onClick={() => onClickHandler(id)} className={`card_info ${card === id ? 'selected_card' : ''}`}>
      <li>
        <span>marque : </span>
        <span>{marque}</span>
      </li>
      <li>
        <span>modele : </span>
        <span>{modele}</span>
      </li>
      <li>
        <span>couleur : </span>
        <span>{couleur}</span>
      </li>
      <li>
        <span>N° imatriculation : </span>
        <span>{imatriculation}</span>
      </li>
    </ul>
  )
}

export default CardTruck