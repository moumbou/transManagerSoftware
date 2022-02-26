import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  selectTrucks,
  setCurrentTrucks,
} from "../../../features/pages/TruckPageSlice";

function Filter({ isDesplayed }) {
  const dispatch = useDispatch();
  const trucks = useSelector(selectTrucks);

  const [searchValue, setSearchValue] = useState("");
  const search = (e) => {
    const value = e.target.value;
    setSearchValue(value);
  };

  useEffect(() => {
    dispatch(
      setCurrentTrucks(
        trucks.filter(
          (data) =>
            `${data.marque}/${data.modele}/${data.couleur}`
              .toLowerCase()
              .indexOf(searchValue.toLowerCase()) !== -1
        )
      )
    );
  }, [trucks, searchValue, dispatch]);

  return (
    <div className="filter" style={{ display: isDesplayed ? "grid" : "none" }}>
      <div className={`input_groupe ${searchValue ? "valid_input" : ""}`}>
        <input
          placeholder="marque/modele/couleur"
          type="text"
          onChange={search}
          value={searchValue}
        />
        <label>Rechercher</label>
      </div>
    </div>
  );
}

export default Filter;
