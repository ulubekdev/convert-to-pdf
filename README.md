# nodejs-convert-file-server
![Screenshot](https://github.com/andreysaf/nodejs-convert-file-server/blob/master/files/screen.png?raw=true "Screenshot")

Convert from MS Office, images to PDF, get thumbnails for file previews, optimize files for quick rendering.

## Installation

Clone the repo and run:

#### `npm start`

The server will be listening on port 9000. `http://localhost:9000`

## Test

To test the proper functionality of the file server, you can run:

#### `npm test`

## API Calls

### List file directory

The endpoint returns all files present in the files directory in JSON format.

##### HTTP Request
`GET http://localhost:9000/files`

### Get file

The endpoint returns the requested file.

##### HTTP Request
`GET http://localhost:9000/files/:filename`

### Convert to PDF

The endpoint converts the file to a PDF. Conversion is possible for the following file formats: DOC, DOCX, PPTX, PPT, XLSX, PNG, JPEG, JPG, TIFF, TXT. Uses [PDFTron Node.js API](https://www.pdftron.com/documentation/samples/node/js/ConvertTest?platforms=nodejs).

##### HTTP Request
`GET http://localhost:9000/convert/:filename`

### Convert to PDF from HTML

The endpoint converts the HTML to a PDF. There are several settings available to get the best results. Uses [PDFTron Node.js API for HTML2PDF](https://www.pdftron.com/documentation/samples/node/js/HTML2PDFTest?platforms=nodejs).

##### HTTP Request
`GET http://localhost:9000/convertHTML/:filename-:pathToHTML`

##### Example
Converts an HTML form to a PDF
`http://localhost:9000/convertHTML/myhtml-index.html`





