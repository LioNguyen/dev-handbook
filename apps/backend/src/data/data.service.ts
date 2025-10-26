import { Injectable, InternalServerErrorException } from '@nestjs/common'
import axios from 'axios'
import FormData from 'form-data'
import * as fs from 'fs'
import type { ExcelAnalysisResult, XMLAnalysisResult } from 'shared'

@Injectable()
export class DataService {
  private readonly pythonApiUrl =
    process.env.PYTHON_API_URL || 'http://localhost:8000'

  async analyzeFile(
    file: Express.Multer.File,
    type: 'excel' | 'xml'
  ): Promise<ExcelAnalysisResult | XMLAnalysisResult> {
    try {
      const formData = new FormData()
      formData.append('file', fs.createReadStream(file.path))

      const response = await axios.post(
        `${this.pythonApiUrl}/analyze/${type}`,
        formData,
        {
          headers: formData.getHeaders(),
        }
      )

      // Clean up uploaded file
      fs.unlinkSync(file.path)

      return response.data
    } catch (error) {
      console.error('Error analyzing file:', error)
      throw new InternalServerErrorException('Failed to analyze file')
    }
  }
}
