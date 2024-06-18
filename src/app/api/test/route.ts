import { NextResponse } from "next/server";
import { chromium } from "playwright";

export async function GET() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://vercel.com/');


  const title = await page.title();
  
  // Teardown
  await context.close();
  await browser.close();

  return NextResponse.json({ title });
}