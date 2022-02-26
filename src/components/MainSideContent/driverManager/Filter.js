import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  selectDrivers,
  setCurrentDrivers,
} from "../../../features/pages/DriverPageSlice";

function Filter({ isDesplayed }) {
  const dispatch = useDispatch();
  const drivers = useSelector(selectDrivers);

  const [searchValue, setSearchValue] = useState("");
  const search = (e) => {
    const value = e.target.value;
    setSearchValue(value);
  };

  useEffect(() => {
    dispatch(
      setCurrentDrivers(
        drivers.filter(
          (data) =>
            `${data.nom} ${data.prenom}`
              .toLowerCase()
              .indexOf(searchValue.toLowerCase()) !== -1
        )
      )
    );
  }, [drivers, dispatch, searchValue]);

  return (
    <div className="filter" style={{ display: isDesplayed ? "grid" : "none" }}>
      <div className={`input_groupe ${searchValue ? "valid_input" : ""}`}>
        <input
          placeholder="nom prénom"
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
