
import { Controller, Get, Post, Put, Delete, Param, Body, Logger } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './product.schema';

@Controller('products')
export class ProductController {
  private readonly logger = new Logger(ProductController.name);

  constructor(private readonly productService: ProductService) {}

  // Event handlers
  @EventPattern('user_created')
  handleUserCreated(data: Record<string, unknown>) {
    this.logger.log('Received user_created event with data: ' + JSON.stringify(data));
  }

  @EventPattern('user_updated')
  handleUserUpdated(data: Record<string, unknown>) {
    this.logger.log('Received user_updated event with data: ' + JSON.stringify(data));
  }

  @EventPattern('user_found_all')
  handleUserFindAll(data: Record<string, unknown>) {
    this.logger.log('Received user_findAll event with data: ' + JSON.stringify(data));
  }

  @EventPattern('user_deleted')
  handleUserDeleted(data: Record<string, unknown>) {
    this.logger.log('Received user_deleted event with data: ' + JSON.stringify(data));
  }

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }


  @Post()
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productService.create(createProductDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto): Promise<Product> {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.productService.remove(id);
  }


}
