import type { ProductConfig } from "./types";

const imageCache: Record<string, string> = {};

export async function preloadImages(paths: string[]) {
  await Promise.all(
    paths.map(async (path) => {
      if (imageCache[path]) return;
      try {
        const resp = await fetch(path);
        const blob = await resp.blob();
        const dataUrl = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(blob);
        });
        imageCache[path] = dataUrl;
      } catch {
        // Image not found - skip
      }
    })
  );
}

export function img(path: string): string {
  return imageCache[path] || path;
}

export function getImagePathsForProduct(product: ProductConfig): string[] {
  const base = product.screenshotBase;
  const paths = [
    product.mockupPath ?? "/mockup.png",
    product.iconPath,
    ...product.slides.iphone.map((_: unknown, i: number) => `${base}/sc${i + 1}.png`),
  ];
  if (product.slides.android) {
    // Android uses the same screenshot files as iPhone for this product
    product.slides.android.forEach((_: unknown, i: number) => {
      const p = `${base}/sc${i + 1}.png`;
      if (!paths.includes(p)) paths.push(p);
    });
  }
  return paths;
}
