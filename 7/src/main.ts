import { ARGUMENTS } from "./common/constants/arguments.js";
import { ArgsService } from "./core/args-service/args.service.js";
import { FileService } from "./core/file-service/file.service.js";

function main() {
  try {
    const argumentsService = new ArgsService(ARGUMENTS);
    const fileService = new FileService();

    const { file, search, ignoreCase } = argumentsService.getArgs();
    const parseResult = fileService.parseFile(file, search, ignoreCase);

    console.log(parseResult);
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
    }
  }
}

main();
