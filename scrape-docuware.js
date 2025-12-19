// scrape-docuware.js
// Scrapes content from start.docuware.com to build chatbot knowledge base

const https = require('https');
const fs = require('fs');

// Function to fetch a URL
function fetchURL(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve(data);
      });
      
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Function to extract text from HTML (simple version)
function extractText(html) {
  // Remove script and style tags
  html = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
  html = html.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
  
  // Remove HTML tags
  html = html.replace(/<[^>]+>/g, ' ');
  
  // Decode HTML entities
  html = html.replace(/&nbsp;/g, ' ');
  html = html.replace(/&amp;/g, '&');
  html = html.replace(/&lt;/g, '<');
  html = html.replace(/&gt;/g, '>');
  html = html.replace(/&quot;/g, '"');
  
  // Clean up whitespace
  html = html.replace(/\s+/g, ' ');
  html = html.trim();
  
  return html;
}

// Main scraping function
async function scrapeDocuWare() {
  console.log('🔍 Starting DocuWare content scraping...\n');
  
  const baseURL = 'https://start.docuware.com';
  const pages = [
    '/',
    '/features',
    '/solutions',
    '/pricing',
    '/resources'
  ];
  
  const scrapedContent = {
    source: 'start.docuware.com',
    scrapedAt: new Date().toISOString(),
    pages: []
  };
  
  for (const page of pages) {
    try {
      const url = `${baseURL}${page}`;
      console.log(`📄 Fetching: ${url}`);
      
      const html = await fetchURL(url);
      const text = extractText(html);
      
      // Only keep first 3000 characters per page (adjust as needed)
      const truncatedText = text.substring(0, 3000);
      
      scrapedContent.pages.push({
        url: url,
        path: page,
        content: truncatedText,
        length: text.length
      });
      
      console.log(`✅ Success: ${text.length} characters extracted\n`);
      
      // Be polite - wait 1 second between requests
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      console.log(`❌ Error fetching ${page}: ${error.message}\n`);
    }
  }
  
  // Save to file
  const outputFile = 'docuware-content.json';
  fs.writeFileSync(outputFile, JSON.stringify(scrapedContent, null, 2));
  console.log(`\n💾 Content saved to: ${outputFile}`);
  
  // Also create a simplified text version for easy reading
  let textOutput = '# DocuWare Content Summary\n\n';
  scrapedContent.pages.forEach(page => {
    textOutput += `## ${page.path}\n`;
    textOutput += `URL: ${page.url}\n`;
    textOutput += `${page.content.substring(0, 500)}...\n\n`;
  });
  
  fs.writeFileSync('docuware-content.txt', textOutput);
  console.log(`📄 Summary saved to: docuware-content.txt`);
  
  console.log('\n✅ Scraping complete!');
  console.log(`📊 Total pages scraped: ${scrapedContent.pages.length}`);
  console.log(`📝 Total content length: ${scrapedContent.pages.reduce((sum, p) => sum + p.length, 0)} characters`);
}

// Run the scraper
scrapeDocuWare().catch(console.error);

/*
 * USAGE:
 * 
 * 1. Save this file as: scrape-docuware.js
 * 2. Run it: node scrape-docuware.js
 * 3. It will create two files:
 *    - docuware-content.json (full structured data)
 *    - docuware-content.txt (readable summary)
 * 4. Use the content to build your chatbot's system prompt
 * 
 * NOTES:
 * - This is a simple scraper using Node's built-in https module
 * - For more advanced scraping, consider using:
 *   - cheerio (for better HTML parsing)
 *   - puppeteer (for JavaScript-heavy sites)
 *   - axios (for easier HTTP requests)
 * 
 * To install those dependencies:
 *   npm install cheerio puppeteer axios
 * 
 * ADVANCED VERSION:
 * If the site has lots of JavaScript, you might need puppeteer.
 * Let me know if you need that version!
 */
