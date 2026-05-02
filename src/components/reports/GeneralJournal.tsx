import { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import type { JournalEntry } from '@/types/accounting'
import { ReportHeader } from '@/components/layout/ReportHeader'
import { PrintButton } from '@/components/layout/PrintButton'
import { formatThaiDateShort, formatBaht } from '@/utils/thaiFormatter'
import { COMPANY } from '@/data/sampleData'

interface GeneralJournalProps {
  entries: JournalEntry[]
  periodLabel: string
}

export function GeneralJournal({ entries, periodLabel }: GeneralJournalProps) {
  const printRef = useRef<HTMLDivElement>(null)
  const handlePrint = useReactToPrint({ content: () => printRef.current })

  const totalDebit = entries.flatMap(e => e.lines).reduce((s, l) => s + l.debit, 0)
  const totalCredit = entries.flatMap(e => e.lines).reduce((s, l) => s + l.credit, 0)

  return (
    <div className="space-y-4">
      <PrintButton onClick={handlePrint} />

      <div ref={printRef} className="bg-white p-8 print:p-4 font-thai text-sm">
        <ReportHeader
          companyName={COMPANY.nameThai}
          reportTitle="สมุดรายวันทั่วไป"
          subtitle={`สำหรับงวด ${periodLabel}`}
        />

        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-900">
              <th className="text-center py-2 w-20 text-gray-900">วันที่</th>
              <th className="text-center py-2 w-20 text-gray-900">เลขที่</th>
              <th className="text-left py-2 text-gray-900">รายการ / รหัสบัญชี</th>
              <th className="text-right py-2 w-32 text-gray-900">เดบิต (บาท)</th>
              <th className="text-right py-2 w-32 text-gray-900">เครดิต (บาท)</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, ei) => (
              <>
                {/* แถวคำอธิบาย */}
                <tr key={`desc-${entry.id}`} className={ei > 0 ? 'border-t border-gray-200' : ''}>
                  <td className="py-1 text-center text-gray-700 align-top">
                    {formatThaiDateShort(entry.date)}
                  </td>
                  <td className="py-1 text-center text-gray-700 align-top">{entry.reference}</td>
                  <td className="py-1 text-gray-900 font-medium" colSpan={3}>
                    {entry.description}
                  </td>
                </tr>
                {/* แถวรายการบัญชี */}
                {entry.lines.map((line, li) => (
                  <tr key={`line-${entry.id}-${li}`}>
                    <td className="py-0.5" />
                    <td className="py-0.5" />
                    <td className="py-0.5">
                      <span className={line.credit > 0 ? 'pl-8 text-gray-700' : 'text-gray-700'}>
                        {line.credit > 0 && (
                          <span className="text-gray-400 mr-2">↳</span>
                        )}
                        {line.accountCode} {line.accountName}
                      </span>
                    </td>
                    <td className="py-0.5 text-right tabular-nums text-gray-800">
                      {line.debit > 0 ? formatBaht(line.debit) : ''}
                    </td>
                    <td className="py-0.5 text-right tabular-nums text-gray-800">
                      {line.credit > 0 ? formatBaht(line.credit) : ''}
                    </td>
                  </tr>
                ))}
              </>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-gray-900 font-bold">
              <td colSpan={3} className="py-2 text-right text-gray-900">รวมทั้งสิ้น</td>
              <td className="py-2 text-right tabular-nums text-gray-900 border-t border-b border-gray-900">
                {formatBaht(totalDebit, true)}
              </td>
              <td className="py-2 text-right tabular-nums text-gray-900 border-t border-b border-gray-900">
                {formatBaht(totalCredit, true)}
              </td>
            </tr>
          </tfoot>
        </table>

        {/* ลายเซ็น */}
        <div className="mt-12 grid grid-cols-3 gap-8 text-center text-sm text-gray-700">
          <div>
            <div className="border-t border-gray-400 pt-2">ผู้จัดทำ</div>
            <div className="mt-4 text-gray-500">วันที่ .........................</div>
          </div>
          <div>
            <div className="border-t border-gray-400 pt-2">ผู้ตรวจสอบ</div>
            <div className="mt-4 text-gray-500">วันที่ .........................</div>
          </div>
          <div>
            <div className="border-t border-gray-400 pt-2">ผู้อนุมัติ</div>
            <div className="mt-4 text-gray-500">วันที่ .........................</div>
          </div>
        </div>
      </div>
    </div>
  )
}
