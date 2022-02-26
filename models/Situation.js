const mongoose = require('mongoose')

const situationSchema = mongoose.Schema({
    camionID: mongoose.Types.ObjectId,
    camion: String,
    chauffeurID: mongoose.Types.ObjectId,
    chauffeur: String,
    depart: String,
    arriver: String,
    departDate: Number,
    arriverDate: Number,
    fraisMission: Number,
    depenses: Number,
    benefices: Number,
    situation: Number
})

module.exports.situationModel = mongoose.model('situation', situationSchema)