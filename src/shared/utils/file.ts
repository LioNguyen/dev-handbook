/**
 * Types for download utility functions
 */
interface DownloadOptions {
  fileName?: string;
  fileType?: string;
  encoding?: string;
}

/**
 * Download file from API response
 * @param content - File content from API
 * @param options - Download options (fileName, fileType, encoding)
 */
const downloadFile = (content: string | Blob, options: DownloadOptions = {}): void => {
  try {
    const { fileName = "file_download.txt", fileType = "text/plain" } = options;

    const blob = content instanceof Blob ? content : new Blob([content], { type: fileType });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error downloading file:", error);
    throw new Error("Failed to download file");
  }
};

export { downloadFile };
