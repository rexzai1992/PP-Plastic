import type { Category } from "@/types/category";

const categorySeeds = [
  {
    id: "plastic-bags",
    slug: "plastic-bags",
    name: "Plastic Bags",
    description:
      "Plastic bags for retail, food packaging, and general business use.",
  },
  {
    id: "t-shirt-bags",
    slug: "t-shirt-bags",
    name: "T-Shirt Bags",
    description: "Common carry bags for convenience stores, markets, and retail counters.",
  },
  {
    id: "garbage-bags",
    slug: "garbage-bags",
    name: "Garbage Bags",
    description: "Waste collection bags for janitorial, household, and industrial use.",
  },
  {
    id: "plastic-rolls",
    slug: "plastic-rolls",
    name: "Plastic Rolls",
    description: "Flexible plastic roll supply for packing, wrapping, and converting.",
  },
  {
    id: "stretch-film",
    slug: "stretch-film",
    name: "Stretch Film",
    description: "Stretch wrap products for palletizing, warehousing, and transport.",
  },
  {
    id: "shrink-film",
    slug: "shrink-film",
    name: "Shrink Film",
    description: "Shrink packaging materials for bundling and product protection.",
  },
  {
    id: "bubble-wrap",
    slug: "bubble-wrap",
    name: "Bubble Wrap",
    description: "Protective cushioning rolls for shipping, moving, and storage.",
  },
  {
    id: "food-packaging",
    slug: "food-packaging",
    name: "Food Packaging",
    description: "Food-safe packaging options for takeaway, bakery, and frozen products.",
  },
  {
    id: "industrial-plastic",
    slug: "industrial-plastic",
    name: "Industrial Plastic",
    description: "Heavy-duty liners, covers, and specialty plastics for factories and logistics.",
  },
  {
    id: "courier-bags",
    slug: "courier-bags",
    name: "Courier Bags",
    description: "Secure mailing bags for e-commerce, warehousing, and fulfilment.",
  },
  {
    id: "zip-lock-bags",
    slug: "zip-lock-bags",
    name: "Zip Lock Bags",
    description: "Reusable seal bags for storage, small parts, and food packing.",
  },
  {
    id: "custom-printed-plastic",
    slug: "custom-printed-plastic",
    name: "Custom Printed Plastic",
    description: "Printed plastic packaging for branding, promotions, and retail presentation.",
  },
];

// Replace this catalogue seed data with a database query when admin-managed categories are added.
export const categories: Category[] = categorySeeds.map((category) => ({
  ...category,
  imageKey: `categories/${category.slug}.webp`,
  image: `/categories/${category.slug}.webp`,
}));
