import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const converPriceToVN = (price: number, unit?: string) =>
  !!price ? price.toLocaleString("vi-VN") + (unit ? unit : "") : "";
