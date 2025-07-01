import { atom } from 'jotai'

const today = new Date()

export const currentMonthAtom = atom(today.getMonth() + 1)
export const currentYearAtom = atom(today.getFullYear())
