/**
 * Maximum allowed file size (10MB)
 */
export const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

/**
 * Validate if a file name has a valid file type extension
 * @param filename - The file name to validate
 * @param allowedTypes - Array of allowed file extensions (without dots)
 * @returns true if the file type is allowed, false otherwise
 */
export const isValidFileType = (
  filename: string,
  allowedTypes: string[]
): boolean => {
  const extension = filename.split('.').pop()?.toLowerCase()
  return extension ? allowedTypes.includes(extension) : false
}

/**
 * Validate if a file size is within the allowed limit
 * @param size - The file size in bytes
 * @returns true if the file size is valid, false otherwise
 */
export const validateFileSize = (size: number): boolean => {
  return size <= MAX_FILE_SIZE
}
