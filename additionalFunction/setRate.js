module.exports.setRateTemperature = function(age,numeral){
    if(age >= 0 && age <= 2){
        if(numeral>37.7)
            return "Có dấu hiệu sốt";
        else if(numeral>38.5)
            return "Sốt với nhiệt độ cao";
        else 
            return "Bình thường";
    }
    else if(age >= 3 && age <= 65){
        if(numeral>37.8)
            return "Có dấu hiệu sốt";
        else if(numeral>38.5)
            return "Sốt với nhiệt độ cao";
        else 
            return "Bình thường";
    }
    else{
        if(numeral>37.1)
            return "Có dấu hiệu sốt";
        else if(numeral>38.5)
            return "Sốt với nhiệt độ cao";
        else 
            return "Bình thường";
    }
}

module.exports.setRateBloodPressure = function(age,numeral1,numeral2){
    if(age >= 0 && age <= 1){
        if(numeral1>100 || numeral2>70)
            return "Huyết áp cao";
        else if(numeral1<75 || numeral2<50)
            return "Huyết áp thấp";
        else 
            return "Bình thường";
    }
    else if(age > 1 && age <= 14){
        if(numeral1>100 || numeral2>80)
            return "Huyết áp cao";
        else if(numeral1<80 || numeral2<55)
            return "Huyết áp thấp";
        else 
            return "Bình thường";
    }
    else{
        if(numeral1>140 || numeral2>90)
            return "Huyết áp cao";
        else if(numeral1<95 || numeral2<60)
            return "Huyết áp thấp";
        else 
            return "Bình thường";
    }
}

module.exports.setRateBloodPressure = function(age,numeral1,numeral2){
    if(age >= 0 && age <= 1){
        if(numeral1>100 || numeral2>70)
            return "Huyết áp cao";
        else if(numeral1<75 || numeral2<50)
            return "Huyết áp thấp";
        else 
            return "Bình thường";
    }
    else if(age > 1 && age <= 14){
        if(numeral1>100 || numeral2>80)
            return "Huyết áp cao";
        else if(numeral1<80 || numeral2<55)
            return "Huyết áp thấp";
        else 
            return "Bình thường";
    }
    else{
        if(numeral1>140 || numeral2>90)
            return "Huyết áp cao";
        else if(numeral1<95 || numeral2<60)
            return "Huyết áp thấp";
        else 
            return "Bình thường";
    }
}