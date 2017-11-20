function RequiredAction(message) {
    this.message = message;
    this.name = "RequiredAction";
    Error.captureStackTrace(this, RequiredAction);
}
RequiredAction.prototype = Object.create(Error.prototype);
RequiredAction.prototype.constructor = RequiredAction;

module.exports.RequiredAction = RequiredAction;

function UsernameNotFoundException(message) {
    this.message = message;
    this.name = "UsernameNotFoundException";
    Error.captureStackTrace(this, UsernameNotFoundException);
}
UsernameNotFoundException.prototype = Object.create(Error.prototype);
UsernameNotFoundException.prototype.constructor = UsernameNotFoundException;

module.exports.UsernameNotFoundException = UsernameNotFoundException;
