import { defineConfig, devices } from "@playwright/test"

import { BASELINE_URL, HUGO_URL } from "./pages"

// Two sites are served side by side:
// - the production Gatsby build (tests/.baseline, see `just baseline`),
// - the Hugo build (public).
//
// The 'baseline' project only exists to record the reference screenshots.
// The 'hugo' project runs every spec against the Hugo build.

export default defineConfig({
  testDir: ".",
  outputDir: "results",
  snapshotPathTemplate: "{testDir}/snapshots/{arg}{ext}",

  fullyParallel: true,
  retries: 1, // Web fonts come from the network: a slow load can shift a page.
  reporter: [["list"], ["html", { outputFolder: "report", open: "never" }]],

  expect: {
    toHaveScreenshot: {
      animations: "disabled",
      // Loosen while porting styles: VISUAL_TOLERANCE=0.05 just test
      maxDiffPixelRatio: Number(process.env.VISUAL_TOLERANCE ?? 0.001)
    }
  },

  projects: [
    {
      name: "baseline",
      testMatch: ["visual.spec.js", "interactions.spec.js"],
      use: { baseURL: BASELINE_URL }
    },
    {
      name: "hugo",
      use: { baseURL: HUGO_URL }
    },

    // Behavior of the tooltips in the other browser engines
    // (`just test-browsers`; needs `npx playwright install firefox webkit`).
    {
      name: "firefox",
      testMatch: "tooltips.spec.js",
      use: { ...devices["Desktop Firefox"], baseURL: HUGO_URL }
    },
    {
      name: "webkit",
      testMatch: "tooltips.spec.js",
      use: { ...devices["Desktop Safari"], baseURL: HUGO_URL }
    }
  ],

  webServer: [
    {
      command: "node serve.mjs .baseline 8001",
      url: BASELINE_URL,
      reuseExistingServer: true
    },
    {
      command: "node serve.mjs ../public 8000",
      url: HUGO_URL,
      reuseExistingServer: true
    }
  ]
})
