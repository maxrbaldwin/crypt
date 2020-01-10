const apiKey = 'c833fc6b098b4c2d9fbcaf1087f1ff29';

module.exports.getRepsByStateOptions = function (state) {
	return {
        url: 'http://openstates.org/api/v1/legislators/',
        timeout: 1000,
        qs: {
            state: state,
            apikey: apiKey,
        }
    };
}

module.exports.getBillsByLegIDOptions = function (rep) {
	return {
        url: 'http://openstates.org/api/v1/bills/',
        qs: {
            apikey: apiKey,
            state: rep.state,
            sponsor_id: rep.leg_id,
            chamber: rep.chamber
        }
    }
}

module.exports.getBillDetailsByBillIDOptions = function (bill) {
	return {
        url: `http://openstates.org/api/v1/bills/${bill.state}/${bill.session}/${encodeURIComponent(bill.bill_id)}/`,
        timeout: 1000,
        qs: {
            apikey: apiKey,
        }
    }
}