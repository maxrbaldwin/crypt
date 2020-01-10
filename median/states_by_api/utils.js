const isJSONString = function (str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true
}

module.exports.parseArray = function (arr) {
    if (isJSONString(arr)) {
        return JSON.parse(arr);
    }
}

module.exports.parseObject = function (object) {
    var parsedResults;
    var billDetails = [];

    if (isJSONString(object)) {
        parsedResults = JSON.parse(object);
        billDetails.push(parsedResults);
    }

    return billDetails
}