import express from "npm:express@4.18.2";
import puppeteer from 'https://deno.land/x/puppeteer@16.2.0/mod.ts'

const app = express();
app.use(express.json());
const port = 3000;

app.post("/search", async (req, res) => {
  // const browser = await puppeteer.launch();
  // const page = await browser.newPage();
  // await page.goto("https://www.supermarket23.com/es/productos/");
  // const html = await page.content();
  // console.log(html);
  // await browser.close();

  const { searchText } = req.body;
  res.send(searchText);
});

app.listen(port, () => {
  console.log(`Search listening to the port ${port}`);
});
