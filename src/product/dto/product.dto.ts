import { IsNotEmpty } from 'class-validator';

export class CreateProductDTO {
  @IsNotEmpty({ message: 'The product should have a name' })
  readonly name: string;
  @IsNotEmpty({ message: 'The product should have a description' })
  readonly description: string;
  @IsNotEmpty({ message: 'The product should have an imageUrl' })
  readonly imageURL: string;
  @IsNotEmpty({ message: 'The product should have a price' })
  readonly price: number;
}
