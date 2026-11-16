import { defineConfig, devices } from "@playwright/test"

import { SITE_URL } from "./pages"

// The site is built by `just build` (see the justfile), then served here.

export default defineConfig({
  testDir: ".",
  outputDir: "results",
  snapshotPathTemplate: "{testDir}/snapshots/{arg}{ext}",

  fullyParallel: true,
  retries: 1, // Web fonts come from the network: a slow load can shift a page.
  reporter: [["list"], ["html", { outputFolder: "report", open: "never" }]],

  use: { baseURL: SITE_URL },

  expect: {
    toHaveScreenshot: {
      animations: "disabled",
      maxDiffPixelRatio: Number(process.env.VISUAL_TOLERANCE ?? 0.001)
    }
  },

  projects: [
    { name: "chromium" },

    // Behavior of the tooltips in the other browser engines
    // (`just test-browsers`; needs `node_modules/.bin/playwright install firefox webkit`).
    {
      name: "firefox",
      testMatch: "tooltips.spec.js",
      use: { ...devices["Desktop Firefox"] }
    },
    {
      name: "webkit",
      testMatch: "tooltips.spec.js",
      use: { ...devices["Desktop Safari"] }
    }
  ],

  webServer: {
    command: "node serve.mjs ../public 8000",
    url: SITE_URL,
    reuseExistingServer: true
  }
})
