import { type } from "arktype";

export const Args = type({
  file: "string",
  search: "string",
  "ignoreCase?": "boolean",
});

export type ArgsType = typeof Args.infer;
