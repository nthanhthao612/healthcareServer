var mongoose = require('mongoose');

var listRecordedSchema = new mongoose.Schema({
    footStep: {
        numeral: Number,
        rate: String,
        time: String,
    },
    sleepingTime: {
        numeral: Number,
        rate: String,
        time: String,
        start:String,
        end:String
    },
    BMInumeral: {
        numeral: Number,
        rate: String,
        time: String,
    },
    bloodPressure: {
        systolic: Number,
        diastolic: Number,
        rate: String,
        time: String,
        unit: String,
        numeral: String
    },
    heartBeat: {
        numeral: Number,
        rate: String,
        time: String,
        unit: String,
    },
    date:String
});

var healthCareSchema = new mongoose.Schema({
    listRecorded: [listRecordedSchema]
});
var HealthCare = mongoose.model('HealthCare', healthCareSchema, 'healthcareStatistics');

module.exports = HealthCare;