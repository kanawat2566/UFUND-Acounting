import { useState } from 'react'
import { GeneralJournal } from '@/components/reports/GeneralJournal'
import { GeneralLedger } from '@/components/reports/GeneralLedger'
import { TrialBalance, buildTrialBalanceRows } from '@/components/reports/TrialBalance'
import { IncomeStatement } from '@/components/reports/IncomeStatement'
import { BalanceSheet } from '@/components/reports/BalanceSheet'
import { LeasingJournal } from '@/components/reports/LeasingJournal'
import {
  COMPANY,
  SAMPLE_JOURNAL_ENTRIES,
  SAMPLE_INCOME_STATEMENT,
  SAMPLE_BALANCE_SHEET,
} from '@/data/sampleData'
import { formatThaiPeriod, formatThaiDateFull } from '@/utils/thaiFormatter'

type ReportKey = 'journal' | 'ledger' | 'trial' | 'income' | 'balance' | 'leasing'

interface NavItem {
  key: ReportKey
  labelThai: string
  labelEng: string
  icon: string
}

const NAV_ITEMS: NavItem[] = [
  { key: 'journal',  labelThai: 'สมุดรายวัน',         labelEng: 'General Journal',    icon: '📋' },
  { key: 'ledger',   labelThai: 'บัญชีแยกประเภท',     labelEng: 'General Ledger',     icon: '📒' },
  { key: 'trial',    labelThai: 'งบทดลอง',             labelEng: 'Trial Balance',       icon: '⚖️' },
  { key: 'income',   labelThai: 'งบกำไรขาดทุน',       labelEng: 'Income Statement',   icon: '📈' },
  { key: 'balance',  labelThai: 'งบดุล',               labelEng: 'Balance Sheet',       icon: '🏦' },
  { key: 'leasing',  labelThai: 'Leasing (เช่าซื้อ)', labelEng: 'Financial Lease',    icon: '🔑' },
]

const PERIOD_FROM = new Date(2025, 0, 1)
const PERIOD_TO   = new Date(2025, 0, 31)
const periodLabel = formatThaiPeriod(PERIOD_FROM, PERIOD_TO)
const asOfLabel   = formatThaiDateFull(SAMPLE_BALANCE_SHEET.date)

export default function App() {
  const [active, setActive] = useState<ReportKey>('journal')

  const trialRows = buildTrialBalanceRows(SAMPLE_JOURNAL_ENTRIES)

  return (
    <div className="min-h-screen bg-gray-100 font-thai">
      {/* Top bar */}
      <header className="bg-brand-900 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold leading-tight">{COMPANY.nameThai}</h1>
            <p className="text-xs text-brand-100">{COMPANY.nameEng} | เลขที่ผู้เสียภาษี {COMPANY.taxId}</p>
          </div>
          <div className="text-right text-xs text-brand-100">
            <p>{COMPANY.address}</p>
            <p>โทร. {COMPANY.tel}</p>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6">
        {/* Sidebar navigation */}
        <aside className="w-52 flex-shrink-0 print:hidden">
          <nav className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-4 py-3 bg-brand-600 text-white">
              <p className="font-semibold text-sm">รายงานบัญชี</p>
              <p className="text-xs text-brand-100">Accounting Reports</p>
            </div>
            <ul className="divide-y divide-gray-100">
              {NAV_ITEMS.map(item => (
                <li key={item.key}>
                  <button
                    onClick={() => setActive(item.key)}
                    className={`w-full text-left px-4 py-3 text-sm transition-colors flex items-start gap-3
                      ${active === item.key
                        ? 'bg-brand-50 text-brand-700 font-semibold border-l-4 border-brand-600'
                        : 'text-gray-700 hover:bg-gray-50'
                      }`}
                  >
                    <span className="text-base">{item.icon}</span>
                    <span>
                      <span className="block">{item.labelThai}</span>
                      <span className="block text-xs text-gray-400">{item.labelEng}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* ผังบัญชีมาตรฐาน link */}
          <div className="mt-4 bg-white rounded-xl shadow-sm p-4">
            <p className="text-xs font-semibold text-gray-700 mb-2">ผังบัญชีมาตรฐาน</p>
            <div className="space-y-1 text-xs text-gray-600">
              <div className="flex justify-between"><span>1xxx</span><span>สินทรัพย์</span></div>
              <div className="flex justify-between"><span>2xxx</span><span>หนี้สิน</span></div>
              <div className="flex justify-between"><span>3xxx</span><span>ส่วนของผู้ถือหุ้น</span></div>
              <div className="flex justify-between"><span>4xxx</span><span>รายได้</span></div>
              <div className="flex justify-between"><span>5xxx</span><span>ค่าใช้จ่าย</span></div>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">
          <div className="bg-white rounded-xl shadow-sm p-6">
            {active === 'journal' && (
              <GeneralJournal
                entries={SAMPLE_JOURNAL_ENTRIES}
                periodLabel={periodLabel}
              />
            )}
            {active === 'ledger' && (
              <GeneralLedger
                entries={SAMPLE_JOURNAL_ENTRIES}
                periodLabel={periodLabel}
              />
            )}
            {active === 'trial' && (
              <TrialBalance
                rows={trialRows}
                asOfLabel={asOfLabel}
              />
            )}
            {active === 'income' && (
              <IncomeStatement data={SAMPLE_INCOME_STATEMENT} />
            )}
            {active === 'balance' && (
              <BalanceSheet data={SAMPLE_BALANCE_SHEET} />
            )}
            {active === 'leasing' && (
              <LeasingJournal />
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
