const fs = require('fs');
const zlib = require('zlib');

// Input file path
const inputFilePath = 'input.txt';

// Output file path
const outputFilePath = 'output.txt.gz';

// Create a readable stream to read data from the input file
const readStream = fs.createReadStream(inputFilePath);

// Create a writable stream to write compressed data to the output file
const writeStream = fs.createWriteStream(outputFilePath);

// Create a gzip transform stream to compress data
const gzip = zlib.createGzip();

// Pipe the data from the input file through the gzip stream to the output file
readStream.pipe(gzip).pipe(writeStream);

// Handle events
readStream.on('error', (err) => {
    console.error('Error reading input file:', err);
});

writeStream.on('finish', () => {
    console.log('Compression complete. Compressed file saved to:', outputFilePath);
});

writeStream.on('error', (err) => {
    console.error('Error writing compressed data to output file:', err);
});
