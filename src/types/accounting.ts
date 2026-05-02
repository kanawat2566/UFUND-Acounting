export type AccountType = 'asset' | 'liability' | 'equity' | 'revenue' | 'expense'
export type NormalBalance = 'debit' | 'credit'

export interface Account {
  code: string
  nameThai: string
  nameEng: string
  type: AccountType
  normalBalance: NormalBalance
  parentCode?: string
  isHeader?: boolean
}

export interface JournalLine {
  accountCode: string
  accountName: string
  debit: number
  credit: number
  description?: string
}

export interface JournalEntry {
  id: string
  date: Date
  reference: string
  description: string
  lines: JournalLine[]
}

export interface LedgerEntry {
  date: Date
  reference: string
  journalId: string
  description: string
  debit: number
  credit: number
  balance: number
  balanceSide: NormalBalance
}

export interface LedgerAccount {
  accountCode: string
  accountNameThai: string
  normalBalance: NormalBalance
  openingBalance: number
  entries: LedgerEntry[]
}

export interface TrialBalanceRow {
  accountCode: string
  accountNameThai: string
  debitBalance: number
  creditBalance: number
}

export interface IncomeStatementLine {
  accountCode: string
  accountNameThai: string
  amount: number
  indent?: number
  isSubtotal?: boolean
  isTotal?: boolean
  isBold?: boolean
}

export interface IncomeStatementData {
  companyName: string
  periodFrom: Date
  periodTo: Date
  revenues: IncomeStatementLine[]
  costOfGoods: IncomeStatementLine[]
  operatingExpenses: IncomeStatementLine[]
  otherIncome: IncomeStatementLine[]
  otherExpenses: IncomeStatementLine[]
}

export interface BalanceSheetLine {
  accountCode: string
  accountNameThai: string
  amount: number
  indent?: number
  isSubtotal?: boolean
  isTotal?: boolean
  isBold?: boolean
}

export interface BalanceSheetData {
  companyName: string
  date: Date
  currentAssets: BalanceSheetLine[]
  nonCurrentAssets: BalanceSheetLine[]
  currentLiabilities: BalanceSheetLine[]
  nonCurrentLiabilities: BalanceSheetLine[]
  equity: BalanceSheetLine[]
}

export interface CompanyInfo {
  nameThai: string
  nameEng: string
  taxId: string
  address: string
  tel: string
}
