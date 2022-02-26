const { chauffeurModel } = require("../models/Chauffeur");
const mongoose = require("mongoose");

module.exports.AddChauffeur = async (obj) => {
  const { nom, prenom, N_permis, dateDebut, currentCamion, currentCamionID } = obj;

  const chauffeur = new chauffeurModel(
    mongoose.isValidObjectId(currentCamionID)
      ? {
          nom,
          prenom,
          N_permis,
          dateDebut,
          currentCamion,
          currentCamionID
        }
      : {
          nom,
          prenom,
          N_permis,
          dateDebut,
        }
  );

  return await chauffeur
    .save()
    .then((data) => {
      return {
        success: true,
        msg: `${data.nom} ${data.prenom} à etait ajouté(e) avec succée !`,
      };
    })
    .catch((err) => {
      console.log(err.message);
      return {
        success: false,
        msg: `erreur lors de l'ajout !`,
      };
    });
};

module.exports.GetChauffeurs = async () => {
  return await chauffeurModel.find();
};

module.exports.DeleteChauffeur = async (id) => {
  const isObjectID = mongoose.isValidObjectId(id);
  if (!isObjectID)
    return {
      success: false,
      msg: `erreur d'ID !`,
    };

  return await chauffeurModel
    .findByIdAndDelete(mongoose.Types.ObjectId(id))
    .then((data) => {
      return {
        success: true,
        msg: `suppression de ${data.nom} ${data.prenom} avec succée !`,
      };
    })
    .catch((err) => {
      console.log(err.message);
      return {
        success: false,
        msg: `erreur lors de la suppression !`,
      };
    });
};

module.exports.UpdateDriver = async (obj) => {
  const {
    id,
    nom,
    prenom,
    N_permis,
    dateDebut,
    currentCamion,
    currentCamionID
  } = obj

  console.log(obj)

  const driver = await chauffeurModel.findById(mongoose.Types.ObjectId(id))
  if(!driver) return {
    success: false,
    msg: `une erreur c'est produite lors de la mise a jours du profile !`
  }

  const isObjectID = mongoose.isValidObjectId(currentCamionID)

  driver.nom = nom
  driver.prenom = prenom
  driver.N_permis = N_permis
  driver.dateDebut = dateDebut
  if(isObjectID) driver.currentCamion = currentCamion
  if(isObjectID) driver.currentCamionID = currentCamionID

  return await driver.save()
  .then((data) => {
    return {
      success: true,
      msg: `le profile de ${data.nom} ${data.prenom} est a jour !`
    }
  }).catch((err) => {
    console.log(err.message)
    return {
      success: false,
      msg: `une erreur c'est produite lors de la mise a jour du profile !`
    }
  })
}