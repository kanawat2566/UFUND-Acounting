import { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import type { IncomeStatementData, IncomeStatementLine } from '@/types/accounting'
import { ReportHeader } from '@/components/layout/ReportHeader'
import { PrintButton } from '@/components/layout/PrintButton'
import { formatBaht, formatThaiPeriod } from '@/utils/thaiFormatter'

interface IncomeStatementProps {
  data: IncomeStatementData
}

function ISRow({ line }: { line: IncomeStatementLine }) {
  const indent = line.indent ?? 0

  if (line.isTotal) {
    return (
      <tr className="border-t border-gray-900">
        <td className="py-1.5 w-20" />
        <td className={`py-1.5 font-bold text-gray-900`} style={{ paddingLeft: `${indent * 24 + 8}px` }}>
          {line.accountNameThai}
        </td>
        <td className="py-1.5 text-right tabular-nums font-bold text-gray-900 border-b-2 border-double border-gray-900 w-36">
          {line.amount !== 0 ? formatBaht(line.amount) : ''}
        </td>
      </tr>
    )
  }

  if (line.isSubtotal) {
    return (
      <tr className="border-t border-gray-400">
        <td className="py-1" />
        <td className={`py-1 font-semibold text-gray-800`} style={{ paddingLeft: `${indent * 24 + 8}px` }}>
          {line.accountNameThai}
        </td>
        <td className="py-1 text-right tabular-nums font-semibold text-gray-800 w-36">
          {line.amount !== 0 ? formatBaht(line.amount) : ''}
        </td>
      </tr>
    )
  }

  if (line.isBold && line.amount === 0) {
    return (
      <tr className="bg-gray-50">
        <td className="py-1 text-center text-xs text-gray-400">{line.accountCode}</td>
        <td className="py-1 font-semibold text-gray-700 pl-2">{line.accountNameThai}</td>
        <td />
      </tr>
    )
  }

  return (
    <tr className="hover:bg-gray-50">
      <td className="py-1 text-center text-xs text-gray-400">{line.accountCode}</td>
      <td className="py-1 text-gray-700" style={{ paddingLeft: `${indent * 24 + 8}px` }}>
        {line.accountNameThai}
      </td>
      <td className="py-1 text-right tabular-nums text-gray-800 w-36">
        {line.amount !== 0 ? formatBaht(line.amount) : ''}
      </td>
    </tr>
  )
}

function SectionDivider({ title }: { title: string }) {
  return (
    <tr>
      <td colSpan={3} className="pt-4 pb-1 font-bold text-gray-900 text-sm border-b border-gray-300 uppercase tracking-wide">
        {title}
      </td>
    </tr>
  )
}

export function IncomeStatement({ data }: IncomeStatementProps) {
  const printRef = useRef<HTMLDivElement>(null)
  const handlePrint = useReactToPrint({ contentRef: printRef })

  return (
    <div className="space-y-4">
      <PrintButton onClick={handlePrint} />

      <div ref={printRef} className="bg-white p-8 print:p-4 font-thai text-sm">
        <ReportHeader
          companyName={data.companyName}
          reportTitle="งบกำไรขาดทุนเบ็ดเสร็จ"
          subtitle={`สำหรับงวด ${formatThaiPeriod(data.periodFrom, data.periodTo)}`}
        />

        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-900">
              <th className="w-20 text-center py-2 text-gray-900 text-xs">รหัส</th>
              <th className="text-left py-2 text-gray-900">รายการ</th>
              <th className="w-36 text-right py-2 text-gray-900">จำนวนเงิน (บาท)</th>
            </tr>
          </thead>
          <tbody>
            <SectionDivider title="รายได้" />
            {data.revenues.map((line, i) => <ISRow key={i} line={line} />)}

            <SectionDivider title="ต้นทุนขายและกำไรขั้นต้น" />
            {data.costOfGoods.map((line, i) => <ISRow key={i} line={line} />)}

            <SectionDivider title="ค่าใช้จ่ายดำเนินงาน" />
            {data.operatingExpenses.map((line, i) => <ISRow key={i} line={line} />)}

            <SectionDivider title="รายได้อื่นและค่าใช้จ่ายอื่น" />
            {data.otherIncome.map((line, i) => <ISRow key={i} line={line} />)}
            {data.otherExpenses.map((line, i) => <ISRow key={i} line={line} />)}
          </tbody>
        </table>

        <p className="mt-8 text-xs text-gray-500 text-center">
          หน่วย: บาท | ภาษีมูลค่าเพิ่ม 7% | ภาษีเงินได้นิติบุคคล 20%
        </p>

        {/* ลายเซ็น */}
        <div className="mt-10 grid grid-cols-3 gap-8 text-center text-sm text-gray-700">
          <div><div className="border-t border-gray-400 pt-2">ผู้จัดทำ</div></div>
          <div><div className="border-t border-gray-400 pt-2">ผู้ตรวจสอบ</div></div>
          <div><div className="border-t border-gray-400 pt-2">กรรมการผู้จัดการ</div></div>
        </div>
      </div>
    </div>
  )
}
