import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/['’&]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export function flightSlug(airline: string, fromCode: string, toCode: string, flightClass: string): string {
  return `${airline}-${fromCode}-${toCode}-${flightClass}`
    .toLowerCase()
    .replace(/\s+/g, '-')
}
