import { readFileSync } from "fs";
import { MESSAGES } from "../../common/constants/messages.js";

export class FileService {
  constructor() {}

  private searchMethod = (ignoreCased: boolean) => {
    if (!ignoreCased) {
      return (str: string, search: string) => str.includes(search);
    }

    return (str: string, search: string) =>
      str.toLocaleLowerCase().includes(search.toLocaleLowerCase());
  };

  public parseFile(path: string, search: string, ignoreCased: boolean = false) {
    let file: string[];
    try {
      const currentPath = `${process.cwd()}/${path}`;
      file = readFileSync(currentPath, { encoding: "utf-8" }).split("\n");
    } catch (e) {
      throw new Error(MESSAGES.FILE_NOT_FOUND);
    }

    if (file.length === 0) {
      throw new Error(MESSAGES.SEARCH_NOT_FOUND);
    }

    const searchMethod = this.searchMethod(ignoreCased);

    const res = file
      .map((str, index) => {
        if (searchMethod(str, search)) {
          return `[Line ${index + 1}]: ${str}`;
        }
      })
      .filter(Boolean);

    if (res.length === 0) {
      throw new Error(MESSAGES.SEARCH_NOT_FOUND);
    }

    return res.join("\n");
  }
}
