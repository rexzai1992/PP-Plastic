import type {
  ContactFormValues,
  QuoteCartItem,
  QuoteCustomerDetails,
  QuoteRequestFormValues,
} from "@/types/quote";
import type { Product } from "@/types/product";
import {
  formatDateLabel,
  normalizeOptionalValue,
  SITE_NAME_FULL,
  WHATSAPP_NUMBER,
} from "@/lib/utils";

export function generateWhatsAppLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function normalizeCustomerDetails(details?: Partial<QuoteCustomerDetails>) {
  return {
    name: normalizeOptionalValue(details?.name, "Not provided"),
    companyName: normalizeOptionalValue(details?.companyName, "Not provided"),
    phoneNumber: normalizeOptionalValue(details?.phoneNumber, "Not provided"),
    email: normalizeOptionalValue(details?.email, "Not provided"),
    deliveryArea: normalizeOptionalValue(details?.deliveryArea, "Not provided"),
    requiredDate: formatDateLabel(details?.requiredDate ?? ""),
    orderType: normalizeOptionalValue(details?.orderType, "Not selected"),
    extraMessage: normalizeOptionalValue(details?.extraMessage, "None"),
    generalReferenceImageUrl: normalizeOptionalValue(
      details?.generalReferenceImageUrl,
      "Not provided",
    ),
  };
}

export function generateQuoteCartMessage(
  customerDetails: Partial<QuoteCustomerDetails>,
  quoteItems: QuoteCartItem[],
) {
  if (!quoteItems.length) {
    return `Hi, I would like to ask about ${SITE_NAME_FULL} products.`;
  }

  const normalizedDetails = normalizeCustomerDetails(customerDetails);

  const itemLines = quoteItems
    .map((item, index) =>
      [
        `${index + 1}. ${item.productName}`,
        `Category: ${item.category}`,
        `Material: ${item.material}`,
        `Size: ${normalizeOptionalValue(item.selectedSize)}`,
        `Thickness: ${normalizeOptionalValue(item.selectedThickness)}`,
        `Color: ${normalizeOptionalValue(item.selectedColor)}`,
        `Quantity: ${item.quantity || 0}`,
        `Notes: ${normalizeOptionalValue(item.notes, "None")}`,
        `Reference Image: ${normalizeOptionalValue(
          item.referenceImageUrl,
          "Not provided",
        )}`,
      ].join("\n"),
    )
    .join("\n\n");

  return [
    "Hi, I want to request a quotation/order.",
    "",
    "Customer Details:",
    `Name: ${normalizedDetails.name}`,
    `Company: ${normalizedDetails.companyName}`,
    `Phone: ${normalizedDetails.phoneNumber}`,
    `Email: ${normalizedDetails.email}`,
    `Delivery Area: ${normalizedDetails.deliveryArea}`,
    `Required Date: ${normalizedDetails.requiredDate}`,
    `Order Type: ${normalizedDetails.orderType}`,
    "",
    "Order Items:",
    "",
    itemLines,
    "",
    `Extra Message: ${normalizedDetails.extraMessage}`,
    `General Reference Image: ${normalizedDetails.generalReferenceImageUrl}`,
    "",
    "Please send me the price, stock availability, and delivery fee.",
  ].join("\n");
}

export function generateSingleProductMessage(
  product: Product,
  options?: {
    size?: string;
    thickness?: string;
    color?: string;
    quantity?: number;
    notes?: string;
    referenceImageUrl?: string;
  },
) {
  return [
    "Hi, I would like to request a quotation for this product.",
    "",
    `Product: ${product.name}`,
    `Category: ${product.category}`,
    `Material: ${product.material}`,
    `Size: ${normalizeOptionalValue(options?.size)}`,
    `Thickness: ${normalizeOptionalValue(options?.thickness)}`,
    `Color: ${normalizeOptionalValue(options?.color)}`,
    `Quantity: ${options?.quantity ?? 0}`,
    `Notes: ${normalizeOptionalValue(options?.notes, "None")}`,
    `Reference Image: ${normalizeOptionalValue(
      options?.referenceImageUrl,
      "Not provided",
    )}`,
    "",
    "Please share price, availability, and lead time.",
  ].join("\n");
}

export function generateRequestQuoteMessage(values: QuoteRequestFormValues) {
  return [
    "Hi, I need help choosing plastic packaging for my business.",
    "",
    `Name: ${normalizeOptionalValue(values.name, "Not provided")}`,
    `Company: ${normalizeOptionalValue(values.company, "Not provided")}`,
    `Phone: ${normalizeOptionalValue(values.phone, "Not provided")}`,
    `Email: ${normalizeOptionalValue(values.email, "Not provided")}`,
    `Product Usage: ${normalizeOptionalValue(values.productUsage, "Not provided")}`,
    `Estimated Size: ${normalizeOptionalValue(values.estimatedSize, "Not provided")}`,
    `Estimated Quantity: ${normalizeOptionalValue(
      values.estimatedQuantity,
      "Not provided",
    )}`,
    `Material Preference: ${normalizeOptionalValue(
      values.materialPreference,
      "Not provided",
    )}`,
    `Delivery Area: ${normalizeOptionalValue(values.deliveryArea, "Not provided")}`,
    `Required Date: ${formatDateLabel(values.requiredDate)}`,
    `Reference Image: ${normalizeOptionalValue(
      values.referenceImageUrl,
      "Not provided",
    )}`,
    `Notes: ${normalizeOptionalValue(values.notes, "None")}`,
  ].join("\n");
}

export function generateContactMessage(values: ContactFormValues) {
  return [
    `Hi, I would like to contact ${SITE_NAME_FULL}.`,
    "",
    `Name: ${normalizeOptionalValue(values.name, "Not provided")}`,
    `Company: ${normalizeOptionalValue(values.company, "Not provided")}`,
    `Phone: ${normalizeOptionalValue(values.phone, "Not provided")}`,
    `Email: ${normalizeOptionalValue(values.email, "Not provided")}`,
    `Message: ${normalizeOptionalValue(values.message, "None")}`,
  ].join("\n");
}
