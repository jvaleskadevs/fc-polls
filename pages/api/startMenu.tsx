import type { NextApiRequest, NextApiResponse } from 'next';
import { join } from 'path';
import * as fs from "fs";

const fontPath = join(process.cwd(), 'Roboto-Regular.ttf')
let fontData = fs.readFileSync(fontPath)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {        
        // Return an HTML response
        res.setHeader('Content-Type', 'text/html');
        res.status(200).send(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>Menu</title>
              <meta property="og:title" content="Menu">
              <meta property="og:image" content="https://fc-polls-delta.vercel.app/api/image">
              <meta property="fc:frame" content="vNext">
              <meta property="fc:frame:image" content="https://fc-polls-delta.vercel.app/api/image">
              <meta property="fc:frame:post_url" content="https://fc-polls-delta.vercel.app/api/startMenu">
              <meta property="fc:frame:button:1" content="Option 0">
              <meta property="fc:frame:button:2" content="Option 1">
              <meta property="fc:frame:button:3" content="Option 2">
            </head>
            <body>
              <p>this is a farcaster frame made with 💜️ by J. Valeska</p>
            </body>
          </html>
        `);   
    } catch (error) {
        console.error(error);
        res.status(500).send('Error generating image');
    }
}
