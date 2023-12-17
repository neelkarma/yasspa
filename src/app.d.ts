// See https://kit.svelte.dev/docs/types#app

import type { LocalAPIClient } from "$lib/server/sbhs";

// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      sbhs: LocalAPIClient;
    }
    // interface PageData {}
    // interface Platform {}
  }
}

export {};
