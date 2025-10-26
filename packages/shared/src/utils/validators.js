"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFileSize = exports.isValidFileType = exports.MAX_FILE_SIZE = void 0;
exports.MAX_FILE_SIZE = 10 * 1024 * 1024;
const isValidFileType = (filename, allowedTypes) => {
    const extension = filename.split('.').pop()?.toLowerCase();
    return extension ? allowedTypes.includes(extension) : false;
};
exports.isValidFileType = isValidFileType;
const validateFileSize = (size) => {
    return size <= exports.MAX_FILE_SIZE;
};
exports.validateFileSize = validateFileSize;
//# sourceMappingURL=validators.js.map