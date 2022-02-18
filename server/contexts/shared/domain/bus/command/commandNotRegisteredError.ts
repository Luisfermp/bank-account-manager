import Command from '@shared/domain/bus/command/command';
import CustomError from '@shared/domain/customError';

export default class CommandNotRegisteredError extends CustomError {
    static COMMAND_NOT_REGISTERED_ERROR_CODE = 10001;

    constructor(command: Command) {
        super(
            `The command <${command.constructor.name}> hasn't a command handler associated`,
            CommandNotRegisteredError.COMMAND_NOT_REGISTERED_ERROR_CODE
        );
    }
}
