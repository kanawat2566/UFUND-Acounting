import { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import type { BalanceSheetData, BalanceSheetLine } from '@/types/accounting'
import { ReportHeader } from '@/components/layout/ReportHeader'
import { PrintButton } from '@/components/layout/PrintButton'
import { formatBaht, formatThaiDateFull } from '@/utils/thaiFormatter'

interface BalanceSheetProps {
  data: BalanceSheetData
}

function BSRow({ line }: { line: BalanceSheetLine }) {
  const indent = line.indent ?? 0

  if (line.isTotal) {
    return (
      <tr className="border-t border-gray-900">
        <td className="py-1.5 w-16" />
        <td className={`py-1.5 font-bold text-gray-900`} style={{ paddingLeft: `${indent * 20}px` }}>
          {line.accountNameThai}
        </td>
        <td className="py-1.5 text-right tabular-nums font-bold text-gray-900 border-b-2 border-double border-gray-900 w-32">
          {formatBaht(Math.abs(line.amount))}
        </td>
      </tr>
    )
  }

  if (line.isSubtotal) {
    return (
      <tr className="border-t border-gray-400">
        <td className="py-1" />
        <td className="py-1 font-semibold text-gray-800" style={{ paddingLeft: `${indent * 20}px` }}>
          {line.accountNameThai}
        </td>
        <td className="py-1 text-right tabular-nums font-semibold text-gray-800 w-32">
          {formatBaht(Math.abs(line.amount))}
        </td>
      </tr>
    )
  }

  return (
    <tr className="hover:bg-gray-50">
      <td className="py-1 text-center text-xs text-gray-400">{line.accountCode}</td>
      <td className="py-1 text-gray-700" style={{ paddingLeft: `${indent * 20}px` }}>
        {line.accountNameThai}
      </td>
      <td className="py-1 text-right tabular-nums text-gray-800 w-32">
        {line.amount !== 0 ? formatBaht(Math.abs(line.amount)) : ''}
      </td>
    </tr>
  )
}

function SectionTitle({ title, className = '' }: { title: string; className?: string }) {
  return (
    <tr>
      <td colSpan={3} className={`pt-4 pb-1 font-bold text-gray-900 border-b border-gray-400 ${className}`}>
        {title}
      </td>
    </tr>
  )
}

export function BalanceSheet({ data }: BalanceSheetProps) {
  const printRef = useRef<HTMLDivElement>(null)
  const handlePrint = useReactToPrint({ contentRef: printRef })
  const asOf = formatThaiDateFull(data.date)

  return (
    <div className="space-y-4">
      <PrintButton onClick={handlePrint} />

      <div ref={printRef} className="bg-white p-8 print:p-4 font-thai text-sm">
        <ReportHeader
          companyName={data.companyName}
          reportTitle="งบแสดงฐานะการเงิน"
          subtitle={`ณ วันที่ ${asOf}`}
        />

        {/* แสดงแบบ 2 คอลัมน์: สินทรัพย์ | หนี้สิน + ทุน */}
        <div className="grid grid-cols-2 gap-8">
          {/* ===== คอลัมน์ซ้าย: สินทรัพย์ ===== */}
          <div>
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-900">
                  <th className="w-16 text-center py-2 text-xs text-gray-900">รหัส</th>
                  <th className="text-left py-2 text-gray-900">สินทรัพย์ (Assets)</th>
                  <th className="w-32 text-right py-2 text-gray-900">บาท</th>
                </tr>
              </thead>
              <tbody>
                <SectionTitle title="สินทรัพย์หมุนเวียน" />
                {data.currentAssets.map((line, i) => <BSRow key={i} line={line} />)}
                <SectionTitle title="สินทรัพย์ไม่หมุนเวียน" className="mt-2" />
                {data.nonCurrentAssets.map((line, i) => <BSRow key={i} line={line} />)}
              </tbody>
            </table>
          </div>

          {/* ===== คอลัมน์ขวา: หนี้สิน + ส่วนของผู้ถือหุ้น ===== */}
          <div>
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-900">
                  <th className="w-16 text-center py-2 text-xs text-gray-900">รหัส</th>
                  <th className="text-left py-2 text-gray-900">หนี้สินและส่วนของผู้ถือหุ้น</th>
                  <th className="w-32 text-right py-2 text-gray-900">บาท</th>
                </tr>
              </thead>
              <tbody>
                <SectionTitle title="หนี้สินหมุนเวียน" />
                {data.currentLiabilities.map((line, i) => <BSRow key={i} line={line} />)}
                <SectionTitle title="หนี้สินไม่หมุนเวียน" />
                {data.nonCurrentLiabilities.map((line, i) => <BSRow key={i} line={line} />)}
                <SectionTitle title="ส่วนของผู้ถือหุ้น" />
                {data.equity.map((line, i) => <BSRow key={i} line={line} />)}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-6 text-xs text-gray-500 text-center">
          หน่วย: บาท | จัดทำตามมาตรฐานการรายงานทางการเงิน (TFRS)
        </p>

        <div className="mt-10 grid grid-cols-3 gap-8 text-center text-sm text-gray-700">
          <div><div className="border-t border-gray-400 pt-2">ผู้จัดทำ</div></div>
          <div><div className="border-t border-gray-400 pt-2">ผู้ตรวจสอบ</div></div>
          <div><div className="border-t border-gray-400 pt-2">กรรมการผู้จัดการ</div></div>
        </div>
      </div>
    </div>
  )
}
