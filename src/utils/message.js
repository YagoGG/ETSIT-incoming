class Message {
	constructor(type, message) {
		this.type = type;
		this.message = message;
	}
}

module.exports.Message = Message;
module.exports.ERROR = 'error';
module.exports.INFO = 'info';
module.exports.WARNING = 'warning';
module.exports.SUCCESS = 'success';

module.exports.ErrorMessage = class extends Message {
	constructor(message) {
		super(module.exports.ERROR, message);
	}
};

module.exports.InfoMessage = class extends Message {
	constructor(message) {
		super(module.exports.INFO, message);
	}
};

module.exports.WarningMessage = class extends Message {
	constructor(message) {
		super(module.exports.WARNING, message);
	}
};

module.exports.SuccessMessage = class extends Message {
	constructor(message) {
		super(module.exports.SUCCESS, message);
	}
};
