import Command from '@shared/domain/bus/command/command';

export interface CommandHandler<T extends Command> {
    subscribedTo(): Command;
    handle(command: T): Promise<void>;
}
