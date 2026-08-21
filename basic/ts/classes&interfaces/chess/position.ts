import { File, Rank } from "./config";

export class Position {
  constructor(
    private file: File,
    private rank: Rank,
  ) {}
}
