import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 从文章标题中提取主关键词（冒号之前的部分）
 * 例如："Heartopia PC Download: Complete Guide 2026" -> "Heartopia PC Download"
 * 如果标题中没有冒号，返回完整标题
 */
export function extractPrimaryKeyword(title: unknown): string {
  if (typeof title !== 'string') {
    return ''
  }

  const normalizedTitle = title.trim()
  if (!normalizedTitle) {
    return ''
  }

  const dashIndex = normalizedTitle.indexOf(' - ')
  if (dashIndex !== -1) {
    return normalizedTitle.substring(0, dashIndex).trim()
  }

  const lastColonIndex = normalizedTitle.lastIndexOf(':')
  const firstColonIndex = normalizedTitle.indexOf(':')
  if (lastColonIndex !== -1 && lastColonIndex !== firstColonIndex) {
    return normalizedTitle.substring(0, lastColonIndex).trim()
  }

  return normalizedTitle
}
