import { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import type { JournalEntry, LedgerAccount } from '@/types/accounting'
import { ReportHeader } from '@/components/layout/ReportHeader'
import { PrintButton } from '@/components/layout/PrintButton'
import { formatThaiDateShort, formatBaht } from '@/utils/thaiFormatter'
import { COMPANY, SAMPLE_JOURNAL_ENTRIES } from '@/data/sampleData'
import { getAccountByCode } from '@/data/chartOfAccounts'

/** สร้าง ledger accounts จาก journal entries */
export function buildLedgerAccounts(entries: JournalEntry[]): LedgerAccount[] {
  const accountMap = new Map<string, { name: string; lines: Array<{ entry: JournalEntry; debit: number; credit: number }> }>()

  for (const entry of entries) {
    for (const line of entry.lines) {
      const existing = accountMap.get(line.accountCode) ?? { name: line.accountName, lines: [] }
      existing.lines.push({ entry, debit: line.debit, credit: line.credit })
      accountMap.set(line.accountCode, existing)
    }
  }

  return Array.from(accountMap.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([code, val]) => {
      const accountDef = getAccountByCode(code)
      const normalBalance = accountDef?.normalBalance ?? 'debit'

      let runningBalance = 0
      const ledgerEntries = val.lines.map(({ entry, debit, credit }) => {
        runningBalance += debit - credit
        return {
          date: entry.date,
          reference: entry.reference,
          journalId: entry.id,
          description: entry.description,
          debit,
          credit,
          balance: Math.abs(runningBalance),
          balanceSide: (runningBalance >= 0 ? 'debit' : 'credit') as 'debit' | 'credit',
        }
      })

      return {
        accountCode: code,
        accountNameThai: val.name,
        normalBalance,
        openingBalance: 0,
        entries: ledgerEntries,
      }
    })
}

interface GeneralLedgerProps {
  entries?: JournalEntry[]
  periodLabel: string
}

export function GeneralLedger({ entries = SAMPLE_JOURNAL_ENTRIES, periodLabel }: GeneralLedgerProps) {
  const printRef = useRef<HTMLDivElement>(null)
  const handlePrint = useReactToPrint({ content: () => printRef.current })

  const ledgerAccounts = buildLedgerAccounts(entries)

  return (
    <div className="space-y-4">
      <PrintButton onClick={handlePrint} />

      <div ref={printRef} className="bg-white p-8 print:p-4 font-thai text-sm space-y-8">
        <ReportHeader
          companyName={COMPANY.nameThai}
          reportTitle="บัญชีแยกประเภทรวม (General Ledger)"
          subtitle={`สำหรับงวด ${periodLabel}`}
        />

        {ledgerAccounts.map(acct => {
          const totalDebit = acct.entries.reduce((s, e) => s + e.debit, 0)
          const totalCredit = acct.entries.reduce((s, e) => s + e.credit, 0)
          const closing = Math.abs(totalDebit - totalCredit)
          const closingSide = totalDebit >= totalCredit ? 'เดบิต' : 'เครดิต'

          return (
            <div key={acct.accountCode} className="print:break-inside-avoid">
              {/* หัวบัญชี T */}
              <div className="flex items-baseline gap-3 mb-1 border-b-2 border-gray-800 pb-1">
                <span className="font-bold text-gray-900 text-base">{acct.accountCode}</span>
                <span className="font-bold text-gray-900 text-base">{acct.accountNameThai}</span>
                <span className="text-xs text-gray-500 ml-auto">ยอดคงเหลือปกติ: {acct.normalBalance === 'debit' ? 'เดบิต' : 'เครดิต'}</span>
              </div>

              <table className="w-full border-collapse text-xs">
                <thead>
                  <tr className="border-b border-gray-400 text-gray-700">
                    <th className="text-center py-1 w-20">วันที่</th>
                    <th className="text-left py-1">รายการ</th>
                    <th className="text-center py-1 w-20">เลขที่</th>
                    <th className="text-right py-1 w-28">เดบิต</th>
                    <th className="text-right py-1 w-28">เครดิต</th>
                    <th className="text-right py-1 w-28">คงเหลือ</th>
                    <th className="text-center py-1 w-12">ด้าน</th>
                  </tr>
                </thead>
                <tbody>
                  {acct.entries.map((entry, i) => (
                    <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-1 text-center text-gray-600">{formatThaiDateShort(entry.date)}</td>
                      <td className="py-1 text-gray-700">{entry.description}</td>
                      <td className="py-1 text-center text-gray-500">{entry.reference}</td>
                      <td className="py-1 text-right tabular-nums text-gray-800">
                        {entry.debit > 0 ? formatBaht(entry.debit) : ''}
                      </td>
                      <td className="py-1 text-right tabular-nums text-gray-800">
                        {entry.credit > 0 ? formatBaht(entry.credit) : ''}
                      </td>
                      <td className="py-1 text-right tabular-nums text-gray-800">{formatBaht(entry.balance)}</td>
                      <td className="py-1 text-center text-gray-500 text-xs">
                        {entry.balanceSide === 'debit' ? 'ดร.' : 'คร.'}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-gray-800 font-semibold bg-gray-50">
                    <td colSpan={3} className="py-1.5 text-right text-gray-800">รวม / ยอดคงเหลือ</td>
                    <td className="py-1.5 text-right tabular-nums text-gray-900 border-b-2 border-double border-gray-800">
                      {formatBaht(totalDebit, true)}
                    </td>
                    <td className="py-1.5 text-right tabular-nums text-gray-900 border-b-2 border-double border-gray-800">
                      {formatBaht(totalCredit, true)}
                    </td>
                    <td className="py-1.5 text-right tabular-nums text-gray-900">
                      {formatBaht(closing, true)}
                    </td>
                    <td className="py-1.5 text-center text-gray-700 text-xs">{closingSide}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )
        })}
      </div>
    </div>
  )
}
