import { Document } from 'mongoose';

export interface ProductInterface extends Document {
  readonly name: string;
  readonly descripcion: string;
  readonly imageURL: string;
  readonly price: number;
  readonly createdAt: Date;
}
