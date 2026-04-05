import { HONE } from "./hone";
import { AMFO } from "./amfo";
import { LICHTA } from "./lichta";
import type { ProductConfig } from "@/lib/types";

/**
 * All products registered in the generator.
 * To add a new app: create src/products/{id}/index.ts and import it here.
 * The toolbar product selector appears automatically when length > 1.
 */
export const PRODUCTS: ProductConfig[] = [HONE, AMFO, LICHTA];
