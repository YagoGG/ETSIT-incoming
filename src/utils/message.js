export class Message {
	constructor(type, message) {
		this.type = type;
		this.message = message;
	}
}

export const ERROR = 'error';
export const INFO = 'info';
export const WARNING = 'warning';
export const SUCCESS = 'success';

export class ErrorMessage extends Message {
	constructor(message) {
		super(ERROR, message);
	}
}

export class InfoMessage extends Message {
	constructor(message) {
		super(INFO, message);
	}
}

export class WarningMessage extends Message {
	constructor(message) {
		super(WARNING, message);
	}
}

export class SuccessMessage extends Message {
	constructor(message) {
		super(SUCCESS, message);
	}
}
