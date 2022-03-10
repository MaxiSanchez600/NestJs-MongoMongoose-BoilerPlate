import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ProductInterface } from './interfaces/product.interface';
import { CreateProductDTO } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product')
    private readonly productModel: Model<ProductInterface>,
  ) {}

  async getProducts(): Promise<ProductInterface[]> {
    const products = await this.productModel.find();
    return products;
  }

  async getProduct(productId: string): Promise<ProductInterface> {
    const product = await this.productModel.findById(productId);
    return product;
  }

  async createProduct(
    createProductDTO: CreateProductDTO,
  ): Promise<ProductInterface> {
    const product = await new this.productModel(createProductDTO);
    return product.save();
  }

  async deleteProduct(productId: string): Promise<ProductInterface> {
    const product = await this.productModel.findByIdAndDelete(productId);
    return product;
  }

  async updateProduct(
    productId: string,
    createProductDTO: CreateProductDTO,
  ): Promise<ProductInterface> {
    const product = await this.productModel.findByIdAndUpdate(
      productId,
      createProductDTO,
      { new: true },
    );
    return product;
  }
}
