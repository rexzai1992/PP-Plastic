export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  material: string;
  description: string;
  images: string[];
  imageKey: string;
  sizes: string[];
  thickness: string[];
  colors: string[];
  usage: string[];
  moq: string;
  packaging: string;
  leadTime: string;
  customSize: boolean;
  customPrint: boolean;
  popular: boolean;
  featured: boolean;
  foodGrade: boolean;
  industrialUse: boolean;
}
