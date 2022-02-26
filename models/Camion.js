const mongoose = require('mongoose')

const camionSchema = mongoose.Schema({
    marque: String,
    modele: String,
    couleur: String,
    km: Number,
    imatriculation: String,
    currentChauffeurID: mongoose.Types.ObjectId,
    currentChauffeurName: String,
    debutAssurance: Number,
    finAssurance: Number,
})

module.exports.camionModel = mongoose.model('camion', camionSchema)