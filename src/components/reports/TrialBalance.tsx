import { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import type { TrialBalanceRow } from '@/types/accounting'
import { ReportHeader } from '@/components/layout/ReportHeader'
import { PrintButton } from '@/components/layout/PrintButton'
import { formatBaht } from '@/utils/thaiFormatter'
import { COMPANY } from '@/data/sampleData'

interface TrialBalanceProps {
  rows: TrialBalanceRow[]
  asOfLabel: string
}

/** สร้าง Trial Balance จาก journal entries */
export function buildTrialBalanceRows(
  entries: import('@/types/accounting').JournalEntry[]
): TrialBalanceRow[] {
  const map = new Map<string, { name: string; debit: number; credit: number }>()

  for (const entry of entries) {
    for (const line of entry.lines) {
      const existing = map.get(line.accountCode) ?? {
        name: line.accountName,
        debit: 0,
        credit: 0,
      }
      existing.debit += line.debit
      existing.credit += line.credit
      map.set(line.accountCode, existing)
    }
  }

  return Array.from(map.entries())
    .map(([code, val]) => ({
      accountCode: code,
      accountNameThai: val.name,
      debitBalance: val.debit > val.credit ? val.debit - val.credit : 0,
      creditBalance: val.credit > val.debit ? val.credit - val.debit : 0,
    }))
    .sort((a, b) => a.accountCode.localeCompare(b.accountCode))
}

export function TrialBalance({ rows, asOfLabel }: TrialBalanceProps) {
  const printRef = useRef<HTMLDivElement>(null)
  const handlePrint = useReactToPrint({ contentRef: printRef })

  const totalDebit = rows.reduce((s, r) => s + r.debitBalance, 0)
  const totalCredit = rows.reduce((s, r) => s + r.creditBalance, 0)
  const isBalanced = Math.abs(totalDebit - totalCredit) < 0.01

  return (
    <div className="space-y-4">
      <PrintButton onClick={handlePrint} />

      <div ref={printRef} className="bg-white p-8 print:p-4 font-thai text-sm">
        <ReportHeader
          companyName={COMPANY.nameThai}
          reportTitle="งบทดลอง"
          subtitle={`ณ วันที่ ${asOfLabel}`}
        />

        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-900">
              <th className="text-center py-2 w-20 text-gray-900">รหัสบัญชี</th>
              <th className="text-left py-2 text-gray-900">ชื่อบัญชี</th>
              <th className="text-right py-2 w-36 text-gray-900">เดบิต (บาท)</th>
              <th className="text-right py-2 w-36 text-gray-900">เครดิต (บาท)</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(row => (
              <tr key={row.accountCode} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-1.5 text-center text-gray-600">{row.accountCode}</td>
                <td className="py-1.5 text-gray-800">{row.accountNameThai}</td>
                <td className="py-1.5 text-right tabular-nums text-gray-800">
                  {row.debitBalance > 0 ? formatBaht(row.debitBalance) : ''}
                </td>
                <td className="py-1.5 text-right tabular-nums text-gray-800">
                  {row.creditBalance > 0 ? formatBaht(row.creditBalance) : ''}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-gray-900 font-bold bg-gray-50">
              <td colSpan={2} className="py-2 text-right text-gray-900">รวมทั้งสิ้น</td>
              <td className="py-2 text-right tabular-nums text-gray-900 border-double border-b-4 border-gray-900">
                {formatBaht(totalDebit, true)}
              </td>
              <td className="py-2 text-right tabular-nums text-gray-900 border-double border-b-4 border-gray-900">
                {formatBaht(totalCredit, true)}
              </td>
            </tr>
          </tfoot>
        </table>

        {/* สถานะ balance */}
        <div className={`mt-4 text-center text-sm font-medium ${isBalanced ? 'text-green-700' : 'text-red-700'}`}>
          {isBalanced
            ? '✓ งบทดลองสมดุล (Trial Balance is balanced)'
            : `✗ งบทดลองไม่สมดุล ผลต่าง ${formatBaht(Math.abs(totalDebit - totalCredit), true)} บาท`}
        </div>
      </div>
    </div>
  )
}
