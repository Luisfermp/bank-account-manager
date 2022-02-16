import Command from '@shared/domain/bus/command/command';

export interface CommandBus {
    dispatch(command: Command): Promise<void>;
}
