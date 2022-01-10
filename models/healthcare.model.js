var mongoose = require('mongoose');

var listRecordedSchema = new mongoose.Schema({
    bodyTemperature: {
        name: String,
        keyword: String,
        activityId: String,
        numeral: Number,
        rate: String,
        time: String,
        unit: String,
    },
    sleepingTimes: {
        name: String,
        keyword: String,
        activityId: String,
        numeral: Number,
        rate: String,
        start:String,
        end:String,
        unit: String
    },
    BMI: {
        name: String,
        keyword: String,
        activityId: String,
        numeral: Number,
        rate: String,
        time: String,
        height: Number,
        weight: Number,
        unit: String
    },
    bloodPressure: {
        name: String,
        keyword: String,
        activityId: String,
        systolic: Number,
        diastolic: Number,
        rate: String,
        time: String,
        unit: String,
        numeral: String,
    },
    heartBeat: {
        name: String,
        keyword: String,
        activityId: String,
        numeral: Number,
        rate: String,
        time: String,
        unit: String
    },
    Date:String
});

var healthCareSchema = new mongoose.Schema({
    listRecorded: [listRecordedSchema]
});
var HealthCare = mongoose.model('HealthCare', healthCareSchema, 'healthcareStatistics');

module.exports = HealthCare;