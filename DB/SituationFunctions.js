const mongoose = require("mongoose");
const { situationModel } = require("../models/Situation");

module.exports.addSituation = async (obj) => {
  const {
    camionID,
    camion,
    chauffeurID,
    chauffeur,
    depart,
    arriver,
    departDate,
    arriverDate,
    fraisMission,
    depenses,
    benefices,
    situation,
  } = obj;

  const camionIDValideObjectID = mongoose.isValidObjectId(camionID);
  const chauffeurIDValideObjectID = mongoose.isValidObjectId(chauffeurID);

  if (!camionIDValideObjectID || !chauffeurIDValideObjectID)
    return {
      success: false,
      msg: `Les case camion et chauffeur doivent etre valide !`,
    };

  const newSituation = new situationModel({
    camionID,
    camion,
    chauffeurID,
    chauffeur,
    depart,
    arriver,
    departDate,
    arriverDate,
    fraisMission,
    depenses,
    benefices,
    situation,
  });

  return await newSituation
    .save()
    .then((data) => {
      return {
        success: true,
        msg: `La situation du camion ${data.camion} a etait ajouté avec succée`,
      };
    })
    .catch((err) => {
      console.log(err.message);
      return {
        success: false,
        msg: `Une erreur c'est produite lors de l'ajout !`,
      };
    });
};

module.exports.GetAllSituations = async () => {
  return await situationModel.find();
};

module.exports.UpdateSituation = async (obj) => {
  const {
    id,
    camionID,
    camion,
    chauffeurID,
    chauffeur,
    depart,
    arriver,
    departDate,
    arriverDate,
    fraisMission,
    depenses,
    benefices,
    situation,
  } = obj;
  const toIdObject = mongoose.Types.ObjectId(id);
  const selectedSituation = await situationModel.findById(toIdObject);
  if (!selectedSituation)
    return {
      success: false,
      msg: "Erreur d'ID !",
    };

  const camionIDValideObjectID = mongoose.isValidObjectId(camionID);
  const chauffeurIDValideObjectID = mongoose.isValidObjectId(chauffeurID);

  if (!camionIDValideObjectID || !chauffeurIDValideObjectID)
    return {
      success: false,
      msg: `Les case camion et chauffeur doivent etre valide !`,
    };

  if (camionID) selectedSituation.camionID = camionID;
  if (camion) selectedSituation.camion = camion;
  if (chauffeurID) selectedSituation.chauffeurID = chauffeurID;
  if (chauffeur) selectedSituation.chauffeur = chauffeur;
  if (depart) selectedSituation.depart = depart;
  if (arriver) selectedSituation.arriver = arriver;
  if (departDate) selectedSituation.departDate = departDate;
  if (arriverDate) selectedSituation.arriverDate = arriverDate;
  if (fraisMission) selectedSituation.fraisMission = fraisMission;
  if (depenses) selectedSituation.depenses = depenses;
  if (benefices) selectedSituation.benefices = benefices;
  if (situation) selectedSituation.situation = situation;

  return await selectedSituation
    .save()
    .then(() => {
      return {
        success: true,
        msg: `La mise a jour de la situation a était faite avec succée !`,
      };
    })
    .catch((err) => {
      console.log(err.message);
      return {
        success: false,
        msg: `Une erreure c'est produite lors de la mise a jours de la situation !`,
      };
    });
};

module.exports.DeleteSituation = async (id) => {
  const toObjectID = mongoose.Types.ObjectId(id);
  return await situationModel
    .findByIdAndDelete(toObjectID)
    .then(() => {
      return {
        success: true,
        msg: `La suppression de la situation a était faite avec succée !`,
      };
    })
    .catch((err) => {
      console.log(err.message);
      return {
        success: false,
        msg: `Une erreure c'est produite lors de la supression !`,
      };
    });
};
