import { spawnSync } from 'child_process';
import { NextResponse } from 'next/server';
import { chromium } from 'playwright';

export const dynamic = 'force-dynamic';
// PLAYWRIGHT_BROWSERS_PATH=$HOME/pw-browsers
export async function GET() {
  // spawnSync('ls', [
  //   '-la',
  //   `${process.cwd()}/node_modules/playwright-core/`,
  // ]).output?.forEach((line) => {
  //   console.log(line?.toString());
  // });

  const browser = await chromium.launch({
    executablePath:
      process.cwd() +
      '/node_modules/.pnpm/playwright-core@1.44.1/node_modules/playwright-core/.local-browsers/chromium-1117',
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
