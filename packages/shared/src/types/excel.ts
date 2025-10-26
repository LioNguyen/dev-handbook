/**
 * Result structure returned from Excel file analysis
 */
export interface ExcelAnalysisResult {
  /** List of column names in the Excel file */
  columns: string[]
  /** Total number of rows in the Excel file */
  rows: number
  /** Shape of the data [rows, columns] */
  shape: [number, number]
  /** Data types for each column */
  dtypes: Record<string, string>
}
