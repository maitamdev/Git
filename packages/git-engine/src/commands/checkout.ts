import { GitCommand, CommandContext, CommandExecutionResult } from './command.interface';
import { SwitchCommand } from './switch';
import { RestoreCommand } from './restore';

export class CheckoutCommand implements GitCommand {
  public name = 'checkout';
  public description = 'Switch branches or restore working tree files';

  private switchCmd = new SwitchCommand();
  private restoreCmd = new RestoreCommand();

  public execute(
    args: string[],
    flags: Record<string, string | boolean>,
    ctx: CommandContext
  ): CommandExecutionResult {
    if (flags[''] && args.length > 0) {
      return this.restoreCmd.execute(args, {}, ctx);
    }

    if (
      args.length > 0 &&
      !ctx.stateManager.getBranch(args[0]) &&
      ctx.stateManager.resolveRef(args[0])
    ) {
      return this.switchCmd.execute(args, { detach: true }, ctx);
    }

    // Map -b to -c for switch behavior
    const bFlag = flags['b'];
    if (bFlag) {
      const branchName = typeof bFlag === 'string' ? bFlag : args[0];
      return this.switchCmd.execute(args, { c: branchName }, ctx);
    }

    return this.switchCmd.execute(args, flags, ctx);
  }
}
