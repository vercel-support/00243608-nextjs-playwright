import { NextResponse } from 'next/server';
import { chromium as playwright } from 'playwright-core';
import chromium from '@sparticuz/chromium';

export const dynamic = 'force-dynamic';

export async function GET() {
  const browser = await playwright.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath(),
  });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://vercel.com/');

  const title = await page.title();

  // Teardown
  await context.close();
  await browser.close();

  return NextResponse.json({ title });
}
