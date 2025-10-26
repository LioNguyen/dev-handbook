import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { DataService } from './data.service'

@Controller('data')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Post('excel')
  @UseInterceptors(FileInterceptor('file'))
  async uploadExcel(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded')
    }
    return this.dataService.analyzeFile(file, 'excel')
  }

  @Post('xml')
  @UseInterceptors(FileInterceptor('file'))
  async uploadXml(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded')
    }
    return this.dataService.analyzeFile(file, 'xml')
  }
}
