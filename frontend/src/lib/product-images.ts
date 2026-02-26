const USE_REAL_IMAGES = false;

const realImages: Record<string, string> = {
  "category-electrozi": "/images/products/electrozi-default.jpg",
  "category-sarma": "/images/products/sarma-default.jpg",
  "category-echipamente": "/images/products/echipamente-default.jpg",
  "category-accesorii": "/images/products/accesorii-default.jpg",

};

const categoryPrompts: Record<string, string> = {
  electrozi: "professional product photo of welding electrodes rods bundle, orange coating, steel core, industrial, studio lighting, white background, e-commerce style, sharp focus, 4k quality",

  sarma: "professional product photo of copper welding wire spool, MIG welding consumable, metallic copper color, industrial equipment, studio lighting, white background, e-commerce photography, 4k",

  echipamente: "professional product photo of orange MIG welding machine, digital display, industrial equipment, modern design, studio lighting, white background, e-commerce style, 4k quality",

  accesorii: "professional product photo of black welding helmet with auto-darkening visor, protective equipment, industrial safety gear, studio lighting, white background, e-commerce, 4k",

  default: "professional product photo of welding equipment and tools, industrial, orange and black colors, studio lighting, white background, e-commerce style, 4k quality",
};

const productPrompts: Record<string, string> = {
  "electrozi-bazici": "professional product photo of basic welding electrodes E7018, blue coating, bundle of rods, industrial, white background, studio lighting, 4k",
  "electrozi-rutilici": "professional product photo of rutile welding electrodes E6013, red-orange coating, steel rods bundle, white background, e-commerce, 4k",
  "electrozi-inox": "professional product photo of stainless steel welding electrodes, silver metallic, industrial consumables, white background, studio lighting, 4k",

  "sarma-mig": "professional product photo of MIG welding wire spool 15kg, copper colored, plastic spool, industrial, white background, e-commerce, 4k",
  "sarma-flux": "professional product photo of flux core welding wire spool, silver wire, industrial consumable, white background, studio lighting, 4k",
  "sarma-tig": "professional product photo of TIG welding filler rods, straight metal rods bundle, silver color, white background, e-commerce style, 4k",

  "aparat-mig": "professional product photo of MIG MAG welding machine, orange color, digital display showing amperage, industrial equipment, white background, 4k",
  "aparat-tig": "professional product photo of TIG welding machine, professional grade, digital controls, orange and black, white background, e-commerce, 4k",
  "aparat-mma": "professional product photo of MMA stick welding machine inverter, compact design, orange color, white background, studio lighting, 4k",
  "plasma": "professional product photo of plasma cutting machine, industrial cutter, orange and black, digital display, white background, 4k",

  "masca-sudura": "professional product photo of auto-darkening welding helmet, black with flames design, protective visor, white background, e-commerce, 4k",
  "manusi-sudura": "professional product photo of leather welding gloves, heat resistant, brown leather, protective gear, white background, studio lighting, 4k",
  "sort-sudura": "professional product photo of leather welding apron, protective workwear, brown leather, industrial safety, white background, 4k",
  "ochelari-sudura": "professional product photo of welding safety goggles, flip-up dark lenses, protective eyewear, white background, e-commerce, 4k",
  "clesti-sudura": "professional product photo of welding electrode holder clamp, copper and steel, industrial tool, white background, studio lighting, 4k",
  "cabluri-sudura": "professional product photo of welding cables set, black rubber insulation, copper connectors, industrial, white background, 4k",
};

function generateAIImageUrl(prompt: string, seed?: number): string {
  const encodedPrompt = encodeURIComponent(prompt);
  const seedParam = seed ? `&seed=${seed}` : "";
  return `https://image.pollinations.ai/prompt/${encodedPrompt}?width=800&height=800&nologo=true${seedParam}`;
}

export function getProductImageUrl(
  productId?: number,
  productName?: string,
  categoryName?: string
): string {
  if (USE_REAL_IMAGES) {
    if (productId && realImages[`product-${productId}`]) {
      return realImages[`product-${productId}`];
    }
    const categoryKey = `category-${categoryName?.toLowerCase()}`;
    if (categoryName && realImages[categoryKey]) {
      return realImages[categoryKey];
    }
  }

  const prompt = findBestPrompt(productName, categoryName);
  return generateAIImageUrl(prompt, productId);
}

function findBestPrompt(productName?: string, categoryName?: string): string {
  const nameLower = productName?.toLowerCase() || "";
  const categoryLower = categoryName?.toLowerCase() || "";

  for (const [key, prompt] of Object.entries(productPrompts)) {
    const keywords = key.split("-");
    if (keywords.some(kw => nameLower.includes(kw))) {
      return prompt;
    }
  }

  if (categoryLower.includes("electro")) return categoryPrompts.electrozi;
  if (categoryLower.includes("sarm") || categoryLower.includes("sârm")) return categoryPrompts.sarma;
  if (categoryLower.includes("echip")) return categoryPrompts.echipamente;
  if (categoryLower.includes("acces")) return categoryPrompts.accesorii;

  return categoryPrompts.default;
}

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

  return generateAIImageUrl(prompt, categoryName.length * 100);
}

export function preloadProductImages(products: Array<{ id: number; name: string; category?: { name: string } }>) {
  if (typeof window === "undefined") return;

  products.forEach((product) => {
    const img = new Image();
    img.src = getProductImageUrl(product.id, product.name, product.category?.name);
  });
}

export const imageConfig = {
  useRealImages: USE_REAL_IMAGES,
};
