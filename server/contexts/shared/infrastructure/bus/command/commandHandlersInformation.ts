import Command from '@shared/domain/bus/command/command';
import { CommandHandler } from '@shared/domain/bus/command/commandHandler';
import CommandNotRegisteredError from '@shared/domain/bus/command/commandNotRegisteredError';

export default class CommandHandlersInformation {
    #commandHandlersMap: Map<Command, CommandHandler<Command>>;

    constructor(commandHandlers: Array<CommandHandler<Command>>) {
        this.#commandHandlersMap = this.formatHandlers(commandHandlers);
    }

    // eslint-disable-next-line class-methods-use-this
    formatHandlers(
        commandHandlers: Array<CommandHandler<Command>>
    ): Map<Command, CommandHandler<Command>> {
        const handlersMap = new Map();

        commandHandlers.forEach((commandHandler) => {
            handlersMap.set(commandHandler.subscribedTo(), commandHandler);
        });

        return handlersMap;
    }

    public search(command: Command): CommandHandler<Command> {
        const commandHandler = this.#commandHandlersMap.get(command.constructor);

        if (!commandHandler) {
            throw new CommandNotRegisteredError(command);
        }

        return commandHandler;
    }
}
