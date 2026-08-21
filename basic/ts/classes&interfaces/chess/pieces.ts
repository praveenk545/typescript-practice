import { File, Rank, Color } from "./config";
import { Position } from "./position";
export abstract class Pieces {
  protected position!: Position;
  constructor(
    private readonly color: Color,
    file: File,
    rank: Rank,
  ) {
    this.position = new Position(file, rank);
  }
}
