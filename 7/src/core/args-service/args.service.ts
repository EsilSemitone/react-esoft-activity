import { Command, program } from "commander";

import { type } from "arktype";
import { ArgsType, Args } from "../../common/schemas/args.schema.js";
import { MESSAGES } from "../../common/constants/messages.js";

export class ArgsService {
  private program: Command;
  public args: ArgsType;

  constructor(args: string[]) {
    this.program = program;
    this.bindArguments(args);
    this.program.parse();
    this.args = this.validateArgs();
  }

  public getArgs(): ArgsType {
    return this.args;
  }

  private bindArguments(args: string[]): void {
    for (const arg of args) {
      this.program.option(arg);
    }
  }

  public validateArgs() {
    const args = Args(this.program.opts());

    if (args instanceof type.errors) {
      throw new Error(MESSAGES.INVALID_INPUT);
    }

    return args;
  }
}
