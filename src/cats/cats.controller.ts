import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Redirect,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Cat } from 'src/cats/interfaces/cat.interface';
import { Roles } from 'src/common/decorators/roles.decorator';
import { CatsService } from './cats.service';
import { CreateCatDto, UpdateCatDto } from './dto/create-cat.dto';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  // @Roles('admin') // equal to @SetMetadata('roles', ['admin'])
  create(@Body() createCatDto: CreateCatDto) {
    console.log('createCatDto: ', createCatDto);
    return this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get('err')
  async err(): Promise<Cat[]> {
    throw new ConflictException();
    return this.catsService.findAll();
  }
  // findAll(@Query() query: ListAllEntities) {
  //   return `This action returns all cats (limit: ${query.limit} items)`;
  // }

  @Get(':id')
  findOne(
    @Param('id', new ParseIntPipe())
    id: string,
  ) {
    //@Param() params: string[]
    // params.id
    // return `This action returns a #${id} cat`;
    return this.catsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    console.log('update: ', updateCatDto);
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }

  // @Get('host')
  // getInfo(@HostParam('account') account: string) {
  //   return account;
  // }

  @Get('res')
  res(@Req() request: Request, @Res() response: Response) {
    response.json({ user: 'zhangsan' });
  }

  @Get('ab*cd')
  find() {
    return 'This route uses a wildcard'; // 使用通配符
  }

  @Get('docs')
  @Redirect('https://docs.nestjs.com', 302)
  getDocs(@Query('version') version) {
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }
}
