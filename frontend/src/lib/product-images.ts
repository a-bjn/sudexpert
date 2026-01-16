// Product Image Management System
// Easy to swap between AI-generated placeholders and real product images

/**
 * Image Configuration
 * Set USE_REAL_IMAGES to true when you have real product photos
 * Then update the realImages object with your actual image URLs
 */
const USE_REAL_IMAGES = false;

// =============================================================================
// REAL IMAGES - Update these URLs when you have actual product photos
// =============================================================================
const realImages: Record<string, string> = {
  // Category default images
  "category-electrozi": "/images/products/electrozi-default.jpg",
  "category-sarma": "/images/products/sarma-default.jpg",
  "category-echipamente": "/images/products/echipamente-default.jpg",
  "category-accesorii": "/images/products/accesorii-default.jpg",

  // Individual product images (by product ID)
  // "product-1": "/images/products/product-1.jpg",
  // "product-2": "/images/products/product-2.jpg",
  // Add more as needed...
};

// =============================================================================
// AI-GENERATED IMAGES (Pollinations.ai - Free, no API key)
// =============================================================================

// Base prompts for each category - optimized for product photography
const categoryPrompts: Record<string, string> = {
  electrozi: "professional product photo of welding electrodes rods bundle, orange coating, steel core, industrial, studio lighting, white background, e-commerce style, sharp focus, 4k quality",

  sarma: "professional product photo of copper welding wire spool, MIG welding consumable, metallic copper color, industrial equipment, studio lighting, white background, e-commerce photography, 4k",

  echipamente: "professional product photo of orange MIG welding machine, digital display, industrial equipment, modern design, studio lighting, white background, e-commerce style, 4k quality",

  accesorii: "professional product photo of black welding helmet with auto-darkening visor, protective equipment, industrial safety gear, studio lighting, white background, e-commerce, 4k",

  default: "professional product photo of welding equipment and tools, industrial, orange and black colors, studio lighting, white background, e-commerce style, 4k quality",
};

// Specific product prompts (for more variety)
const productPrompts: Record<string, string> = {
  // Electrozi varieties
  "electrozi-bazici": "professional product photo of basic welding electrodes E7018, blue coating, bundle of rods, industrial, white background, studio lighting, 4k",
  "electrozi-rutilici": "professional product photo of rutile welding electrodes E6013, red-orange coating, steel rods bundle, white background, e-commerce, 4k",
  "electrozi-inox": "professional product photo of stainless steel welding electrodes, silver metallic, industrial consumables, white background, studio lighting, 4k",

  // Sarma varieties
  "sarma-mig": "professional product photo of MIG welding wire spool 15kg, copper colored, plastic spool, industrial, white background, e-commerce, 4k",
  "sarma-flux": "professional product photo of flux core welding wire spool, silver wire, industrial consumable, white background, studio lighting, 4k",
  "sarma-tig": "professional product photo of TIG welding filler rods, straight metal rods bundle, silver color, white background, e-commerce style, 4k",

  // Echipamente varieties
  "aparat-mig": "professional product photo of MIG MAG welding machine, orange color, digital display showing amperage, industrial equipment, white background, 4k",
  "aparat-tig": "professional product photo of TIG welding machine, professional grade, digital controls, orange and black, white background, e-commerce, 4k",
  "aparat-mma": "professional product photo of MMA stick welding machine inverter, compact design, orange color, white background, studio lighting, 4k",
  "plasma": "professional product photo of plasma cutting machine, industrial cutter, orange and black, digital display, white background, 4k",

  // Accesorii varieties
  "masca-sudura": "professional product photo of auto-darkening welding helmet, black with flames design, protective visor, white background, e-commerce, 4k",
  "manusi-sudura": "professional product photo of leather welding gloves, heat resistant, brown leather, protective gear, white background, studio lighting, 4k",
  "sort-sudura": "professional product photo of leather welding apron, protective workwear, brown leather, industrial safety, white background, 4k",
  "ochelari-sudura": "professional product photo of welding safety goggles, flip-up dark lenses, protective eyewear, white background, e-commerce, 4k",
  "clesti-sudura": "professional product photo of welding electrode holder clamp, copper and steel, industrial tool, white background, studio lighting, 4k",
  "cabluri-sudura": "professional product photo of welding cables set, black rubber insulation, copper connectors, industrial, white background, 4k",
};

/**
 * Generate Pollinations.ai image URL
 * This service is free and generates images on-the-fly
 */
function generateAIImageUrl(prompt: string, seed?: number): string {
  const encodedPrompt = encodeURIComponent(prompt);
  const seedParam = seed ? `&seed=${seed}` : "";
  // Using specific dimensions for product cards (square)
  return `https://image.pollinations.ai/prompt/${encodedPrompt}?width=800&height=800&nologo=true${seedParam}`;
}

/**
 * Get image URL for a product
 * @param productId - The product's unique ID
 * @param productName - The product's name (used to match prompts)
 * @param categoryName - The product's category name
 * @returns Image URL (real or AI-generated)
 */
export function getProductImageUrl(
  productId?: number,
  productName?: string,
  categoryName?: string
): string {
  // If using real images, try to find a match
  if (USE_REAL_IMAGES) {
    // First try product-specific image
    if (productId && realImages[`product-${productId}`]) {
      return realImages[`product-${productId}`];
    }
    // Then try category default
    const categoryKey = `category-${categoryName?.toLowerCase()}`;
    if (categoryName && realImages[categoryKey]) {
      return realImages[categoryKey];
    }
  }

  // Generate AI image URL
  const prompt = findBestPrompt(productName, categoryName);
  // Use productId as seed for consistency (same product = same image)
  return generateAIImageUrl(prompt, productId);
}

/**
 * Find the best matching prompt for a product
 */
function findBestPrompt(productName?: string, categoryName?: string): string {
  const nameLower = productName?.toLowerCase() || "";
  const categoryLower = categoryName?.toLowerCase() || "";

  // Try to match specific product prompts by keywords in name
  for (const [key, prompt] of Object.entries(productPrompts)) {
    const keywords = key.split("-");
    if (keywords.some(kw => nameLower.includes(kw))) {
      return prompt;
    }
  }

  // Fall back to category prompt
  if (categoryLower.includes("electro")) return categoryPrompts.electrozi;
  if (categoryLower.includes("sarm") || categoryLower.includes("sârm")) return categoryPrompts.sarma;
  if (categoryLower.includes("echip")) return categoryPrompts.echipamente;
  if (categoryLower.includes("acces")) return categoryPrompts.accesorii;

  return categoryPrompts.default;
}

/**
 * Get category thumbnail image
 */
export function getCategoryImageUrl(categoryName: string): string {
  if (USE_REAL_IMAGES && realImages[`category-${categoryName.toLowerCase()}`]) {
    return realImages[`category-${categoryName.toLowerCase()}`];
  }

  const categoryLower = categoryName.toLowerCase();
  let prompt = categoryPrompts.default;

  if (categoryLower.includes("electro")) prompt = categoryPrompts.electrozi;
  else if (categoryLower.includes("sarm") || categoryLower.includes("sârm")) prompt = categoryPrompts.sarma;
  else if (categoryLower.includes("echip")) prompt = categoryPrompts.echipamente;
  else if (categoryLower.includes("acces")) prompt = categoryPrompts.accesorii;

  return generateAIImageUrl(prompt, categoryName.length * 100); // Consistent seed per category
}

/**
 * Preload images for better UX
 */
export function preloadProductImages(products: Array<{ id: number; name: string; category?: { name: string } }>) {
  if (typeof window === "undefined") return;

  products.forEach((product) => {
    const img = new Image();
    img.src = getProductImageUrl(product.id, product.name, product.category?.name);
  });
}

// =============================================================================
// CONFIGURATION HELPERS
// =============================================================================

/**
 * Enable real images mode
 * Call this when you're ready to switch to real product photos
 */
export const imageConfig = {
  useRealImages: USE_REAL_IMAGES,

  // Instructions for adding real images:
  // 1. Place images in /public/images/products/
  // 2. Update the realImages object above with the correct paths
  // 3. Set USE_REAL_IMAGES to true
  // 4. Rebuild the project
};
