const fs = require('fs');
const http = require('http');
const https = require('https');
const { URL } = require('url');

function downloadFile(url, outputPath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;

    const request = protocol.get(url, (response) => {
      let data = '';

      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        fs.writeFile(outputPath, data, (err) => {
          if (err) {
            console.error(`Error writing to file ${outputPath}: ${err.message}`);
            reject(err);
          } else {
            console.log(`Wrote to ${outputPath}`);
            resolve();
          }
        });
      });
    });

    request.on('error', (err) => {
      console.error(`Error downloading ${url}: ${err.message}`);
      reject(err);
    });
  });
}

function processUrls(filename) {
  const urls = fs.readFileSync(filename, 'utf-8').split('\n').filter(Boolean);

  const downloadPromises = urls.map((url) => {
    const { hostname } = new URL(url);
    const outputPath = `${hostname}.txt`;

    return downloadFile(url, outputPath).catch(() => {
      // Handle errors while continuing to the next URL
    });
  });

  return Promise.all(downloadPromises);
}

const args = process.argv.slice(2);

if (args.length !== 1) {
  console.error('Usage: node urls.js FILENAME');
  process.exit(1);
}

const filename = args[0];

try {
  fs.accessSync(filename, fs.constants.R_OK);
} catch (err) {
  console.error(`Error reading file ${filename}: ${err.message}`);
  process.exit(1);
}

processUrls(filename).catch(() => {
  // Handle any uncaught errors
});
