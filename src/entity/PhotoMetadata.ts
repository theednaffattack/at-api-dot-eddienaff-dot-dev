import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  // OneToOne,
  JoinColumn,
} from "typeorm";
import { Photo } from "./Photo";

// prettier-ignore
@Entity()
export class PhotoMetadata {
  @PrimaryGeneratedColumn("uuid") id: number;

  @Column("int") height: number;

  @Column("int") width: number;

  @Column() orientation: string;

  @Column() compressed: boolean;

  @Column() comment: string;

  // @OneToOne(
  //   () => Photo,
  //   photo => photo.metadata,
  // )

  @JoinColumn()
  photo: Photo;
}
