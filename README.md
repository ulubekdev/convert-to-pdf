# NodeJS PDF Converter
![image](https://pbs.twimg.com/media/Eo58dcHXUAEwyy3?format=jpg&name=medium)

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




