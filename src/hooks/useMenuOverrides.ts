/**
 * useMenuOverrides — persists admin overrides (sold-out, signature) in localStorage.
 *
 * The menu data in menu.ts is the base state. Admin overrides layer on top.
 * Both the admin panel and the customer menu read from this hook.
 *
 * Shape stored: { [itemId]: { isSoldOut?: boolean, isSignature?: boolean } }
 */
import { useState, useCallback } from 'react'
import { menuItems, type MenuItem } from '@/data/menu'

const STORAGE_KEY = 'cafe_menu_overrides'

type Overrides = Record<string, { isSoldOut?: boolean; isSignature?: boolean }>

function loadOverrides(): Overrides {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function saveOverrides(overrides: Overrides) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides))
}

export function useMenuOverrides() {
  const [overrides, setOverrides] = useState<Overrides>(loadOverrides)

  const applyOverrides = useCallback((items: MenuItem[]): MenuItem[] => {
    return items.map(item => ({
      ...item,
      ...(overrides[item.id] ?? {}),
    }))
  }, [overrides])

  const toggleSoldOut = useCallback((id: string) => {
    setOverrides(prev => {
      const current = prev[id] ?? {}
      const base = menuItems.find(m => m.id === id)
      const baseSoldOut = base?.isSoldOut ?? false
      const currentSoldOut = current.isSoldOut ?? baseSoldOut
      const next = { ...prev, [id]: { ...current, isSoldOut: !currentSoldOut } }
      saveOverrides(next)
      return next
    })
  }, [])

  const toggleSignature = useCallback((id: string) => {
    setOverrides(prev => {
      const current = prev[id] ?? {}
      const base = menuItems.find(m => m.id === id)
      const baseSig = base?.isSignature ?? false
      const currentSig = current.isSignature ?? baseSig
      const next = { ...prev, [id]: { ...current, isSignature: !currentSig } }
      saveOverrides(next)
      return next
    })
  }, [])

  const resetAll = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setOverrides({})
  }, [])

  // Resolved menu items with overrides applied
  const resolvedItems = applyOverrides(menuItems)

  return { overrides, resolvedItems, applyOverrides, toggleSoldOut, toggleSignature, resetAll }
}
