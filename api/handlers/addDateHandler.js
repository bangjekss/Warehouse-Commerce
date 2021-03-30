const moment = require("moment");

const addDateHandler = (payload) => {
	return moment().add({ days: payload });
};

module.exports = { addDateHandler };
