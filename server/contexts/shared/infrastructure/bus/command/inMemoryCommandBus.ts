import Command from '@shared/domain/bus/command/command';
import { CommandBus } from '@shared/domain/bus/command/commandBus';
import CommandHandlersInformation from '@shared/infrastructure/bus/command/commandHandlersInformation';

export default class InMemoryCommandBus implements CommandBus {
    #commandHandlersInformation: CommandHandlersInformation;

    constructor(commandHandlersInformation: CommandHandlersInformation) {
        this.#commandHandlersInformation = commandHandlersInformation;
    }

    async dispatch(command: Command): Promise<void> {
        const handler = this.#commandHandlersInformation.search(command);

        await handler.handle(command);
    }
}
