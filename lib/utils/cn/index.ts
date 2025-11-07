// lib/utils/cn.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines clsx for conditional classes and tailwind-merge for conflict resolution
 *
 * Why both?
 * - clsx: Handles conditionals elegantly ({ 'class': condition })
 * - twMerge: Resolves Tailwind conflicts (px-2 + px-4 = px-4)
 *
 * Alternative (if you want to drop clsx):
 * export function cn(...inputs: ClassValue[]) {
 *   return twMerge(inputs.filter(Boolean).join(' '));
 * }
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Usage examples:
// cn('base-class', condition && 'conditional-class')
// cn('px-2', { 'px-4': override }) // → 'px-4'
// cn('bg-blue-500', isPrimary && 'bg-red-500') // → 'bg-red-500'
