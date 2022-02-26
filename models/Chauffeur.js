const mongoose = require('mongoose')

const chauffeurSchema = mongoose.Schema({
    nom: String,
    prenom: String,
    N_permis: String,
    dateDebut: Number,
    currentCamionID: mongoose.Types.ObjectId,
    currentCamion: String
})

module.exports.chauffeurModel = mongoose.model('chauffeur', chauffeurSchema)