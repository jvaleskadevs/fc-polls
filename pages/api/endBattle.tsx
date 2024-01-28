import type { NextApiRequest, NextApiResponse } from 'next';
import sharp from 'sharp';
import {kv} from "@vercel/kv";
import satori from "satori";
import { join } from 'path';
import * as fs from "fs";

const fontPath = join(process.cwd(), 'Roboto-Regular.ttf')
let fontData = fs.readFileSync(fontPath)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const menuOptions: String[] = ["c", "f", "m"];

        const svg = await satori(
            <div style={{
                justifyContent: 'flex-start',
                alignItems: 'center',
                display: 'flex',
                width: '100%',
                height: '100%',
                backgroundColor: 'indigo',
                padding: 48,
                lineHeight: 1.2,
                fontSize: 20,
            }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    paddingBottom: 20,
                }}>
                    <h2 style={{textAlign: 'center', color: 'white'}}>Choose an option:</h2>
                    {
                        menuOptions.map((opt, index) => {
                            return (
                                <div style={{
                                    backgroundColor: 'lightgray',
                                    color: '#000',
                                    padding: 10,
                                    marginBottom: 10,
                                    borderRadius: 4,
                                    width: "100%",
                                    whiteSpace: 'nowrap',
                                    overflow: 'visible',
                                }}>{opt}</div>
                            )
                        })
                    }
                    <h3 style={{fontSize: 20, color: 'lightgray'}}>bla bla bla: afrba33kk3</h3>
                </div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 60
                }}>
                  <h3 style={{fontSize: 20, color: 'lightgray'}}>bla bla bla: afrba33kk3</h3>
                  <h3 style={{fontSize: 20, color: 'lightgray'}}>bla bla bla: afrba33kk3</h3>
                  <h3 style={{fontSize: 20, color: 'lightgray'}}>bla bla bla: afrba33kk3</h3>
                  <h3 style={{fontSize: 20, color: 'lightgray'}}>bla bla bla: afrba33kk3</h3>
                </div>
            </div>
            ,
            {
                width: 600, height: 400, fonts: [{
                    data: fontData,
                    name: 'Roboto',
                    style: 'normal',
                    weight: 400
                }]
            })

        // Convert SVG to PNG using Sharp
        const pngBuffer = await sharp(Buffer.from(svg))
            .toFormat('png')
            .toBuffer();

        // Set the content type to PNG and send the response
        res.setHeader('Content-Type', 'image/png');
        res.setHeader('Cache-Control', 'max-age=10');
        res.send(pngBuffer);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error generating image');
    }
}
