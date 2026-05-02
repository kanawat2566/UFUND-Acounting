import { useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print'
import type { LeasingTransaction, LeasingStage } from '@/data/leasingData'
import {
  LEASING_VENDOR_OTHER,
  LEASING_VENDOR_COM7,
  VENDOR_DIFF_NOTES,
} from '@/data/leasingData'
import { PrintButton } from '@/components/layout/PrintButton'
import { formatBaht } from '@/utils/thaiFormatter'
import { COMPANY } from '@/data/sampleData'

// ───────────────────────────────────────────
// Badge: ระบบที่ใช้งาน
// ───────────────────────────────────────────
function SystemBadge({ system }: { system: LeasingStage['system'] }) {
  const style =
    system === 'Itos'   ? 'bg-blue-100 text-blue-800' :
    system === 'FO365'  ? 'bg-purple-100 text-purple-800' :
                          'bg-green-100 text-green-800'
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${style}`}>
      {system}
    </span>
  )
}

// ───────────────────────────────────────────
// ตาราง journal lines สำหรับแต่ละ stage
// ───────────────────────────────────────────
function StageTable({ stage, index }: { stage: LeasingStage; index: number }) {
  const totalDebit  = stage.lines.reduce((s, l) => s + l.debit,  0)
  const totalCredit = stage.lines.reduce((s, l) => s + l.credit, 0)
  const balanced    = Math.abs(totalDebit - totalCredit) < 0.01

  return (
    <div className="print:break-inside-avoid">
      {/* Stage header */}
      <div className="flex items-center gap-3 mb-2">
        <span className="flex-shrink-0 w-7 h-7 rounded-full bg-brand-600 text-white text-sm font-bold flex items-center justify-center print:bg-gray-800">
          {index + 1}
        </span>
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-gray-900">{stage.titleThai}</span>
            <span className="text-gray-400 text-xs hidden sm:inline">({stage.titleEng})</span>
            <SystemBadge system={stage.system} />
          </div>
          <p className="text-xs text-gray-500 mt-0.5">{stage.description}</p>
        </div>
      </div>

      {/* Warning box */}
      {stage.warning && (
        <div className="mb-2 flex items-start gap-2 bg-amber-50 border border-amber-300 rounded-lg px-3 py-2 text-xs text-amber-800">
          <span className="mt-0.5">⚠️</span>
          <span>{stage.warning}</span>
        </div>
      )}

      {/* Journal table */}
      <table className="w-full border-collapse text-sm mb-6">
        <thead>
          <tr className="bg-gray-100 border-b border-gray-300">
            <th className="text-center py-1.5 w-24 text-gray-700 font-semibold">รหัสบัญชี</th>
            <th className="text-left py-1.5 pl-2 text-gray-700 font-semibold">ชื่อบัญชี</th>
            <th className="text-right py-1.5 w-32 text-gray-700 font-semibold">Debit (บาท)</th>
            <th className="text-right py-1.5 w-32 text-gray-700 font-semibold">Credit (บาท)</th>
            <th className="text-left py-1.5 pl-2 w-48 text-gray-700 font-semibold print:hidden">หมายเหตุ</th>
          </tr>
        </thead>
        <tbody>
          {stage.lines.map((line, li) => (
            <tr
              key={li}
              className={`border-b border-gray-100 ${
                line.accountCode === '2111204' || line.accountCode === '2111203'
                  ? 'bg-orange-50'
                  : 'hover:bg-gray-50'
              }`}
            >
              <td className="py-1.5 text-center font-mono text-xs text-gray-600">
                {line.accountCode}
              </td>
              <td className={`py-1.5 pl-2 ${line.credit > 0 ? 'pl-8' : ''} ${
                line.accountCode === '2111204' || line.accountCode === '2111203'
                  ? 'text-orange-700 font-semibold'
                  : 'text-gray-800'
              }`}>
                {line.credit > 0 && (
                  <span className="text-gray-400 mr-1">↳</span>
                )}
                {line.accountName}
              </td>
              <td className="py-1.5 text-right tabular-nums text-gray-800 pr-2">
                {line.debit  > 0 ? formatBaht(line.debit)  : ''}
              </td>
              <td className="py-1.5 text-right tabular-nums text-gray-800 pr-2">
                {line.credit > 0 ? formatBaht(line.credit) : ''}
              </td>
              <td className="py-1.5 pl-2 text-xs text-gray-500 print:hidden">
                {line.note && (
                  <span className="inline-block bg-gray-100 px-2 py-0.5 rounded text-gray-600">
                    {line.note}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-t-2 border-gray-400 bg-gray-50 font-semibold">
            <td colSpan={2} className="py-1.5 text-right text-gray-700 pr-2">รวม</td>
            <td className="py-1.5 text-right tabular-nums text-gray-900 pr-2 border-b-2 border-double border-gray-400">
              {formatBaht(totalDebit, true)}
            </td>
            <td className="py-1.5 text-right tabular-nums text-gray-900 pr-2 border-b-2 border-double border-gray-400">
              {formatBaht(totalCredit, true)}
            </td>
            <td className="print:hidden" />
          </tr>
        </tfoot>
      </table>

      {/* Balance indicator */}
      <div className={`-mt-4 mb-4 text-right text-xs font-medium ${balanced ? 'text-green-600' : 'text-red-600'}`}>
        {balanced ? '✓ สมดุล' : `✗ ไม่สมดุล ผลต่าง ${formatBaht(Math.abs(totalDebit - totalCredit), true)}`}
      </div>
    </div>
  )
}

// ───────────────────────────────────────────
// Single vendor transaction
// ───────────────────────────────────────────
function VendorSection({ tx }: { tx: LeasingTransaction }) {
  const isOther = tx.vendorType === 'other'
  return (
    <div className={`rounded-xl border-2 p-6 mb-8 print:border print:rounded-none print:mb-4 ${
      isOther ? 'border-blue-200 bg-blue-50/30' : 'border-amber-200 bg-amber-50/30'
    }`}>
      {/* Vendor badge */}
      <div className="flex items-center gap-3 mb-5">
        <span className={`px-3 py-1 rounded-full text-sm font-bold ${
          isOther ? 'bg-blue-600 text-white' : 'bg-amber-500 text-white'
        }`}>
          {tx.vendorLabel}
        </span>
        <span className="text-xs text-gray-500">สัญญาเลขที่: {tx.contractNo}</span>
        {!isOther && (
          <span className="ml-auto text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-medium">
            Related Party — ใช้รหัส 2111203
          </span>
        )}
      </div>

      {tx.stages.map((stage, i) => (
        <StageTable key={stage.stageKey} stage={stage} index={i} />
      ))}
    </div>
  )
}

// ───────────────────────────────────────────
// Difference comparison table
// ───────────────────────────────────────────
function DiffTable() {
  return (
    <div className="mt-8 print:break-inside-avoid">
      <h3 className="font-bold text-gray-800 mb-3 border-b border-gray-300 pb-1">
        สรุปความแตกต่าง: Vendor อื่นๆ vs Vendor COM7
      </h3>
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left py-2 px-3 border border-gray-300 w-1/4">หัวข้อ</th>
            <th className="text-left py-2 px-3 border border-gray-300 w-[37.5%]">Vendor อื่นๆ</th>
            <th className="text-left py-2 px-3 border border-gray-300 w-[37.5%]">Vendor COM7</th>
          </tr>
        </thead>
        <tbody>
          {VENDOR_DIFF_NOTES.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="py-2 px-3 border border-gray-200 font-medium text-gray-700">{row.topic}</td>
              <td className="py-2 px-3 border border-gray-200 text-blue-800">{row.other}</td>
              <td className="py-2 px-3 border border-gray-200 text-amber-800">{row.com7}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ───────────────────────────────────────────
// Main export
// ───────────────────────────────────────────
export function LeasingJournal() {
  const printRef = useRef<HTMLDivElement>(null)
  const handlePrint = useReactToPrint({ contentRef: printRef })
  const [activeVendor, setActiveVendor] = useState<'both' | 'other' | 'com7'>('both')

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex items-center gap-3 print:hidden">
        <span className="text-sm font-medium text-gray-700">แสดง:</span>
        {(['both', 'other', 'com7'] as const).map(v => (
          <button
            key={v}
            onClick={() => setActiveVendor(v)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              activeVendor === v
                ? 'bg-brand-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {v === 'both' ? 'ทั้งหมด' : v === 'other' ? 'Vendor อื่นๆ' : 'Vendor COM7'}
          </button>
        ))}
        <div className="ml-auto">
          <PrintButton onClick={handlePrint} />
        </div>
      </div>

      <div ref={printRef} className="bg-white p-6 print:p-4 font-thai text-sm">
        {/* Print header */}
        <div className="text-center mb-6 print:mb-4">
          <h1 className="text-xl font-bold text-gray-900">{COMPANY.nameThai}</h1>
          <h2 className="text-lg font-semibold text-gray-800 mt-1">
            รายการบัญชี — สัญญาเช่าทางการเงิน (Leasing)
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Financial Lease Accounting Workflow
          </p>
        </div>

        {/* Flow diagram */}
        <div className="flex items-center justify-center gap-1 mb-6 print:hidden">
          {[
            { label: '1. Booking',      color: 'bg-blue-500' },
            { label: '2. รับดาวน์',    color: 'bg-teal-500' },
            { label: '3. API → FO365', color: 'bg-purple-500' },
            { label: '4. จ่าย Vendor', color: 'bg-gray-600' },
          ].map((step, i, arr) => (
            <div key={i} className="flex items-center">
              <span className={`${step.color} text-white text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap`}>
                {step.label}
              </span>
              {i < arr.length - 1 && <span className="text-gray-400 mx-1">→</span>}
            </div>
          ))}
          <span className="ml-3 text-xs text-amber-700 bg-amber-50 border border-amber-200 px-2 py-1 rounded">
            ⚠️ ขั้น 4 ไม่ผ่าน Itos GL
          </span>
        </div>

        {/* Vendor sections */}
        {(activeVendor === 'both' || activeVendor === 'other') && (
          <VendorSection tx={LEASING_VENDOR_OTHER} />
        )}
        {(activeVendor === 'both' || activeVendor === 'com7') && (
          <VendorSection tx={LEASING_VENDOR_COM7} />
        )}

        {/* Diff table */}
        {activeVendor === 'both' && <DiffTable />}

        {/* Footer note */}
        <p className="mt-6 text-xs text-gray-400 text-center border-t border-gray-200 pt-4">
          บัญชีที่เน้นสีส้ม = Trade Payables - Leasing (2111203 / 2111204) |
          ระบบ Itos ← → FO365 |
          มาตรฐาน TFRS 16
        </p>
      </div>
    </div>
  )
}
