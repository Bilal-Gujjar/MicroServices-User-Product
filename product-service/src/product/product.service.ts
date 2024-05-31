import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './product.schema';

@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);

  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy,
  ) {}

  async findAll(): Promise<Product[]> {
    const products = await this.productModel.find().exec();
    this.logger.log('Emitting product_findAll event');
    this.userServiceClient.emit('product_findAll', products);
    return products;
  }


  async create(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    await createdProduct.save();
    this.logger.log('Emitting product_created event');
    this.userServiceClient.emit('product_created', createdProduct);
    return createdProduct;
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    const updatedProduct = await this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true }).exec();
    this.logger.log('Emitting product_updated event');
    this.userServiceClient.emit('product_updated', { id, ...updateProductDto });
    return updatedProduct;
  }

  async remove(id: string): Promise<void> {
    await this.productModel.findByIdAndDelete(id).exec();
    this.logger.log('Emitting product_deleted event');
    this.userServiceClient.emit('product_deleted', { id });
  }
}
