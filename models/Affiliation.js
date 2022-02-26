const mongoose = require('mongoose')

const affiliationSchema = mongoose.Schema({
    date: Number,
    camionID: mongoose.Types.ObjectId,
    chauffeurID: mongoose.Types.ObjectId,
    camionMatricule: String,
    chauffeurName: String,
    chauffeurPermis: String
})

module.exports.affiliationModel = mongoose.model('affiliation', affiliationSchema)