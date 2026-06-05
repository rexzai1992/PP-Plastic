export type OrderType =
  | "Quotation only"
  | "Ready to order"
  | "Need recommendation";

export interface UploadedReference {
  url: string;
  key: string;
  name: string;
}

export interface QuoteCartItem {
  id: string;
  productId: string;
  slug: string;
  productName: string;
  category: string;
  material: string;
  image: string;
  selectedSize: string;
  selectedThickness: string;
  selectedColor: string;
  quantity: number;
  notes: string;
  referenceImageUrl?: string;
  referenceImageKey?: string;
  referenceImageName?: string;
}

export interface QuoteCustomerDetails {
  name: string;
  companyName: string;
  phoneNumber: string;
  email: string;
  deliveryArea: string;
  requiredDate: string;
  orderType: OrderType;
  extraMessage: string;
  generalReferenceImageUrl?: string;
  generalReferenceImageKey?: string;
  generalReferenceImageName?: string;
}

export interface QuoteRequestFormValues {
  name: string;
  company: string;
  phone: string;
  email: string;
  productUsage: string;
  estimatedSize: string;
  estimatedQuantity: string;
  materialPreference: string;
  deliveryArea: string;
  requiredDate: string;
  notes: string;
  referenceImageUrl?: string;
  referenceImageKey?: string;
  referenceImageName?: string;
}

export interface ContactFormValues {
  name: string;
  company: string;
  phone: string;
  email: string;
  message: string;
}
