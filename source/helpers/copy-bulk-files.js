/* eslint-disable global-require, no-console */

import copyFile from './copy-file';

/**
 *  @Helper
 *  @Input:
 *    - files: An array of file meta objects
 *    - src: path to source folder
 *    - dest: path to destination folder
 *    - pattern: file name format to be save as, presently support
 *      - hash: content hash
 *      - date: current date
 *      - origin: the original file name
 *  @Output:
 *    - files are copy to dest folder
 *    - return the number of files copied
 */
export default function (files, src, dest, pattern) {
  return files.reduce((count, file, index) => {
    try {
      /**
       *  @Helper: copy-file.js
       *  Copy single file with index to number file if using the 'date' file name pattern
       */
      copyFile(file, src, dest, pattern, index);
      return count + 1;
    } catch (e) {
      if (e.code !== 'EEXIST') return count;
    }
    return count;
  }, 0);
}
