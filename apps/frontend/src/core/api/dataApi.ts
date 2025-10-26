import type { ExcelAnalysisResult, XMLAnalysisResult } from 'shared'

/**
 * Upload and analyze an Excel file
 * @param file - The Excel file to upload
 * @returns Analysis results including columns, rows, shape, and data types
 */
export const uploadExcelFile = async (
  file: File
): Promise<ExcelAnalysisResult> => {
  const formData = new FormData()
  formData.append('file', file)

  const response = await fetch('/api/data/excel', {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    throw new Error('Failed to upload Excel file')
  }

  return response.json()
}

/**
 * Upload and analyze an XML file
 * @param file - The XML file to upload
 * @returns Analysis results including root element, child count, and all elements
 */
export const uploadXMLFile = async (file: File): Promise<XMLAnalysisResult> => {
  const formData = new FormData()
  formData.append('file', file)

  const response = await fetch('/api/data/xml', {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    throw new Error('Failed to upload XML file')
  }

  return response.json()
}
