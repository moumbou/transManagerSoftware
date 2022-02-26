const { camionModel } = require("../models/Camion");
const mongoose = require("mongoose");

module.exports.AddTruck = async (obj) => {
  const {
    marque,
    modele,
    couleur,
    km,
    imatriculation,
    currentChauffeurID,
    currentChauffeurName,
    debutAssurance,
    finAssurance,
  } = obj;

  const isObjectID = mongoose.isValidObjectId(currentChauffeurID);

  const truck = new camionModel(
    isObjectID
      ? {
          marque,
          modele,
          couleur,
          km,
          imatriculation,
          currentChauffeurID,
          currentChauffeurName,
          debutAssurance,
          finAssurance,
        }
      : {
          marque,
          modele,
          couleur,
          km,
          imatriculation,
          debutAssurance,
          finAssurance,
        }
  );

  return await truck
    .save()
    .then((data) => {
      return {
        success: true,
        msg: `le camion ${data.modele} de la marque ${data.marque} a etait ajouté avec succée !`,
      };
    })
    .catch((err) => {
      console.log(err.message);
      return {
        success: false,
        msg: `une erreur c'est produite lors de l'ajout du camion !`,
      };
    });
};

module.exports.DisplayTrucks = async () => {
  return await camionModel.find();
};

module.exports.DeleteTruck = async (id) => {
  const isValidObjectId = mongoose.isValidObjectId(id);
  if (!isValidObjectId)
    return {
      success: false,
      msg: `Erreur lors de la suppression (erreur ID)`,
    };
  return await camionModel
    .findByIdAndDelete(mongoose.Types.ObjectId(id))
    .then((data) => {
      return {
        success: true,
        msg: `le camion ${data.modele} ${data.marque} a etait supprimé avec succée !`,
      };
    })
    .catch((err) => {
      console.log(err.message);
      return {
        success: false,
        msg: `erreur lors de la suppression (erreur DB)`,
      };
    });
};

module.exports.UpdateTruck = async (obj) => {
  const {
    id,
    marque,
    modele,
    couleur,
    km,
    imatriculation,
    currentChauffeurID,
    currentChauffeurName,
    debutAssurance,
    finAssurance
  } = obj

  const isValidObjectId = mongoose.isValidObjectId(id)
  const isChauffeurValidID = mongoose.isValidObjectId(currentChauffeurID)

  if(!isValidObjectId) return {
    success: false,
    msg: `erreur lors de la mise a jour du camion (erreur ID)`
  }

  const truck = await camionModel.findById(mongoose.Types.ObjectId(id))

  
  truck.marque = marque
  truck.modele = modele
  truck.couleur = couleur
  truck.km = km
  truck.imatriculation = imatriculation
  if(isChauffeurValidID) truck.currentChauffeurID = mongoose.Types.ObjectId(currentChauffeurID)
  if(isChauffeurValidID) truck.currentChauffeurName = currentChauffeurName
  truck.debutAssurance = debutAssurance
  truck.finAssurance = finAssurance

  return truck.save()
  .then((data) => {
    return {
      success: true,
      msg: `le camion ${data.modele} ${data.marque} est a jour !`
    }
  }).catch((err) => {
    console.log(err.message)
    return {
      success: false,
      msg: `erreur lors de la mise a jour (erreur DB)`
    }
  })
}

module.exports.getAffiliedTrucks = async () => {
  return await camionModel.find({ currentChauffeurID: { $exists: true } })
}