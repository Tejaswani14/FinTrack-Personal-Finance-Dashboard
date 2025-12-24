"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Transaction {
  id: string
  amount: number
  category: string
  type: "income" | "expense"
  description: string
  date: string
  notes?: string
}

export interface Budget {
  category: string
  limit: number
  spent: number
}

interface FinanceStore {
  transactions: Transaction[]
  budgets: Budget[]
  currency: string
  theme: "light" | "dark"
  addTransaction: (transaction: Omit<Transaction, "id">) => void
  updateTransaction: (id: string, transaction: Partial<Transaction>) => void
  deleteTransaction: (id: string) => void
  setBudget: (category: string, limit: number) => void
  setCurrency: (currency: string) => void
  setTheme: (theme: "light" | "dark") => void
  getTotalIncome: () => number
  getTotalExpenses: () => number
  getTotalSavings: () => number
  getCurrentBalance: () => number
}

export const useFinanceStore = create<FinanceStore>()(
  persist(
    (set, get) => ({
      transactions: [
        {
          id: "1",
          amount: 5000,
          category: "Salary",
          type: "income",
          description: "Monthly Salary",
          date: "2024-12-01",
        },
        {
          id: "2",
          amount: 1200,
          category: "Rent",
          type: "expense",
          description: "Apartment Rent",
          date: "2024-12-02",
        },
        {
          id: "3",
          amount: 450,
          category: "Food",
          type: "expense",
          description: "Groceries",
          date: "2024-12-05",
        },
        {
          id: "4",
          amount: 200,
          category: "Shopping",
          type: "expense",
          description: "Clothes",
          date: "2024-12-10",
        },
        {
          id: "5",
          amount: 150,
          category: "Bills",
          type: "expense",
          description: "Electricity Bill",
          date: "2024-12-12",
        },
      ],
      budgets: [
        { category: "Food", limit: 500, spent: 450 },
        { category: "Shopping", limit: 300, spent: 200 },
        { category: "Bills", limit: 200, spent: 150 },
        { category: "Travel", limit: 400, spent: 0 },
      ],
      currency: "USD",
      theme: "dark",
      addTransaction: (transaction) =>
        set((state) => {
          const newTransaction = {
            ...transaction,
            id: Date.now().toString(),
          }

          const updatedBudgets = state.budgets.map((budget) => {
            if (budget.category === newTransaction.category && newTransaction.type === "expense") {
              return {
                ...budget,
                spent: budget.spent + newTransaction.amount,
              }
            }
            return budget
          })

          return {
            transactions: [newTransaction, ...state.transactions],
            budgets: updatedBudgets,
          }
        }),
      updateTransaction: (id, updatedTransaction) =>
        set((state) => {
          const oldTransaction = state.transactions.find((t) => t.id === id)
          const updatedBudgets = [...state.budgets]

          if (oldTransaction?.type === "expense") {
            const oldBudgetIndex = updatedBudgets.findIndex((b) => b.category === oldTransaction.category)
            if (oldBudgetIndex !== -1) {
              updatedBudgets[oldBudgetIndex].spent -= oldTransaction.amount
            }
          }

          const newTransaction = { ...oldTransaction, ...updatedTransaction }
          if (newTransaction.type === "expense" && updatedTransaction.amount !== undefined) {
            const newBudgetIndex = updatedBudgets.findIndex((b) => b.category === newTransaction.category)
            if (newBudgetIndex !== -1) {
              updatedBudgets[newBudgetIndex].spent += updatedTransaction.amount || 0
            }
          }

          return {
            transactions: state.transactions.map((t) => (t.id === id ? { ...t, ...updatedTransaction } : t)),
            budgets: updatedBudgets,
          }
        }),
      deleteTransaction: (id) =>
        set((state) => {
          const transaction = state.transactions.find((t) => t.id === id)
          const updatedBudgets = state.budgets.map((budget) => {
            if (budget.category === transaction?.category && transaction?.type === "expense") {
              return {
                ...budget,
                spent: Math.max(0, budget.spent - transaction.amount),
              }
            }
            return budget
          })

          return {
            transactions: state.transactions.filter((t) => t.id !== id),
            budgets: updatedBudgets,
          }
        }),
      setBudget: (category, limit) =>
        set((state) => {
          const existingBudget = state.budgets.find((b) => b.category === category)
          if (existingBudget) {
            return {
              budgets: state.budgets.map((b) => (b.category === category ? { ...b, limit } : b)),
            }
          }
          return {
            budgets: [...state.budgets, { category, limit, spent: 0 }],
          }
        }),
      setCurrency: (currency) => set({ currency }),
      setTheme: (theme) => set({ theme }),
      getTotalIncome: () => {
        const { transactions } = get()
        return transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)
      },
      getTotalExpenses: () => {
        const { transactions } = get()
        return transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)
      },
      getTotalSavings: () => {
        const { getTotalIncome, getTotalExpenses } = get()
        return getTotalIncome() - getTotalExpenses()
      },
      getCurrentBalance: () => {
        const { getTotalIncome, getTotalExpenses } = get()
        return getTotalIncome() - getTotalExpenses()
      },
    }),
    {
      name: "fintrack-storage",
    },
  ),
)
