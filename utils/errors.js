function RequiredAction(message) {
    this.message = message;
    this.name = "RequiredAction";
    Error.captureStackTrace(this, RequiredAction);
}
RequiredAction.prototype = Object.create(Error.prototype);
RequiredAction.prototype.constructor = RequiredAction;

module.exports.RequiredAction = RequiredAction;
