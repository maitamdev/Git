import { GitCommand, CommandContext, CommandExecutionResult } from './command.interface';
import { SwitchCommand } from './switch';

export class CheckoutCommand implements GitCommand {
  public name = 'checkout';
  public description = 'Switch branches or restore working tree files';

  private switchCmd = new SwitchCommand();

  public execute(
    args: string[],
    flags: Record<string, string | boolean>,
    ctx: CommandContext
  ): CommandExecutionResult {
    // Map -b to -c for switch behavior
    const bFlag = flags['b'];
    if (bFlag) {
      const branchName = typeof bFlag === 'string' ? bFlag : args[0];
      return this.switchCmd.execute(args, { c: branchName }, ctx);
    }

    return this.switchCmd.execute(args, flags, ctx);
  }
}
