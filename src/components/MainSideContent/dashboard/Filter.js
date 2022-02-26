import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  selectSituationsValue,
  setCurrentValue,
} from "../../../features/pages/SituationPageSlice";

function Filter({ isDesplayed }) {
  const toInputDate = function (currentDate) {
    if (!currentDate) return "";
    let date = new Date(currentDate);
    let local = new Date(date);
    local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
  };

  const date = new Date();
  const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
  const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  const dispatch = useDispatch();
  const situationsArray = useSelector(selectSituationsValue);

  const [camion, setCamion] = useState("");
  const [chauffeur, setChauffeur] = useState("");
  const [destination, setDestination] = useState("");
  const [depart, setDepart] = useState(toInputDate(monthStart));
  const [arriver, setArriver] = useState(toInputDate(monthEnd));

  const onChangeHandler = (e) => {
    const value = e.target.value;
    const target = e.target.getAttribute("data-info");
    if (target === "camion") return setCamion(value);
    if (target === "chauffeur") return setChauffeur(value);
    if (target === "destination") return setDestination(value);
    if (target === "depart") return setDepart(value);
    if (target === "arriver") return setArriver(value);
  };

  const [situation, setSituation] = useState("tout");
  const radioOnchangeHanlder = (e) => {
    const value = e.target.getAttribute("data-info");
    setSituation(value);
  };

  useEffect(() => {
    if (situation === "tout")
      dispatch(
        setCurrentValue(
          situationsArray.filter(
            (data) =>
              data.chauffeur.toLowerCase().indexOf(chauffeur.toLowerCase()) !==
                -1 &&
              data.camion.toLowerCase().indexOf(camion.toLowerCase()) !== -1 &&
              `${data.depart}-${data.arriver}`
                .toLowerCase()
                .indexOf(destination.toLowerCase()) !== -1 &&
              data.departDate >= new Date(depart) &&
              data.arriverDate <= new Date(arriver)
          )
        )
      );
    if (situation === "encours")
      dispatch(
        setCurrentValue(
          situationsArray.filter(
            (data) =>
              data.situation > 0 &&
              data.chauffeur.toLowerCase().indexOf(chauffeur.toLowerCase()) !==
                -1 &&
              data.camion.toLowerCase().indexOf(camion.toLowerCase()) !== -1 &&
              `${data.depart}-${data.arriver}`
                .toLowerCase()
                .indexOf(destination.toLowerCase()) !== -1 &&
              data.departDate >= new Date(depart) &&
              data.arriverDate <= new Date(arriver)
          )
        )
      );
    if (situation === "regler")
      dispatch(
        setCurrentValue(
          situationsArray.filter(
            (data) =>
              !data.situation &&
              data.chauffeur.toLowerCase().indexOf(chauffeur.toLowerCase()) !==
                -1 &&
              data.camion.toLowerCase().indexOf(camion.toLowerCase()) !== -1 &&
              `${data.depart}-${data.arriver}`
                .toLowerCase()
                .indexOf(destination.toLowerCase()) !== -1 &&
              data.departDate >= new Date(depart) &&
              data.arriverDate <= new Date(arriver)
          )
        )
      );
  }, [
    situationsArray,
    dispatch,
    situation,
    chauffeur,
    camion,
    destination,
    depart,
    arriver,
  ]);

  return (
    <div className="filter" style={{ display: isDesplayed ? "grid" : "none" }}>
      <div className={`input_groupe w-100 ${camion ? "valid_input" : ""}`}>
        <input
          type="text"
          data-info="camion"
          onChange={onChangeHandler}
          value={camion}
        />
        <label>Par camion</label>
      </div>

      <div className={`input_groupe w-100 ${chauffeur ? "valid_input" : ""}`}>
        <input
          type="text"
          data-info="chauffeur"
          onChange={onChangeHandler}
          value={chauffeur}
        />
        <label>Par chauffeur</label>
      </div>

      <div className={`input_groupe w-100 ${destination ? "valid_input" : ""}`}>
        <input
          type="text"
          data-info="destination"
          placeholder="départ-arriver"
          onChange={onChangeHandler}
          value={destination}
        />
        <label>Par destination</label>
      </div>

      <div className="checkbox_groupe">
        <span>Situation de livraison</span>

        <div className="checkbox">
          <input
            type="radio"
            checked={situation === "regler"}
            onChange={radioOnchangeHanlder}
            data-info="regler"
            name="livraison"
          />
          <label>Reglé</label>
        </div>

        <div className="checkbox">
          <input
            type="radio"
            checked={situation === "encours"}
            onChange={radioOnchangeHanlder}
            data-info="encours"
            name="livraison"
          />
          <label>En cours</label>
        </div>

        <div className="checkbox">
          <input
            type="radio"
            checked={situation === "tout"}
            onChange={radioOnchangeHanlder}
            data-info="tout"
            name="livraison"
          />
          <label>Tout</label>
        </div>
      </div>

      <div className={`input_groupe w-100 ${destination ? "valid_input" : ""}`}>
        <input
          type="date"
          data-info="depart"
          onChange={onChangeHandler}
          value={depart}
        />
        <label>Date de départ</label>
      </div>

      <div className={`input_groupe w-100 ${destination ? "valid_input" : ""}`}>
        <input
          type="date"
          data-info="arriver"
          onChange={onChangeHandler}
          value={arriver}
        />
        <label>Date d'arriver</label>
      </div>
    </div>
  );
}

export default Filter;
