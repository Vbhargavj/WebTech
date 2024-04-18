const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

// URL of the website you want to scrape
const url = 'https://www.speedtest.net';

// Function to fetch the HTML content of the website
async function getHTML(url) {
  try {
    const response = await axios.get(url);
    // Write HTML content to a file using streams
    const writerStream = fs.createWriteStream('speedtest.html');
    writerStream.write(response.data, 'utf8');
    writerStream.end();
    console.log('HTML content has been written to speedtest.html');
    return response.data;
  } catch (error) {
    console.error('Error fetching the HTML:', error);
    return null;
  }
}

// Function to extract data from the HTML using Cheerio
function extractData(html) {
  const $ = cheerio.load(html);
  
  // Example: Extracting the titles of all <h1> tags
  const titles = [];
  $('a').each((index, element) => {
    titles.push($(element).text());
  });

  return titles;
}

// Main function to run the scraper
async function main() {
  const html = await getHTML(url);
  if (html) {
    const data = extractData(html);
    console.log('Scraped data:', data);
  } else {
    console.log('Failed to fetch HTML. Check the URL and try again.');
  }
}

// Run the main function
main();
