/**
 * ข้อมูลตัวอย่างการลงบัญชี Leasing
 * อ้างอิงจากเอกสาร Vendor อื่นๆ และ Vendor COM7
 */

export type LeasingVendorType = 'other' | 'com7'

export interface LeasingLine {
  accountCode: string
  accountName: string
  debit: number
  credit: number
  note?: string
}

export interface LeasingStage {
  stageKey: string
  titleThai: string
  titleEng: string
  description: string
  system: 'Itos' | 'FO365' | 'Both'
  lines: LeasingLine[]
  warning?: string
}

export interface LeasingTransaction {
  vendorType: LeasingVendorType
  vendorLabel: string
  contractNo: string
  stages: LeasingStage[]
}

// ============================================================
// Vendor อื่นๆ  (non-COM7)
// ============================================================
export const LEASING_VENDOR_OTHER: LeasingTransaction = {
  vendorType: 'other',
  vendorLabel: 'Vendor อื่นๆ',
  contractNo: 'LS-6801-001',
  stages: [
    {
      stageKey: 'booking',
      titleThai: 'บันทึก Booking สัญญาเช่าซื้อ',
      titleEng: 'Lease Booking Entry',
      description: 'บันทึกเมื่อตั้งสัญญา Leasing ครั้งแรกในระบบ Itos',
      system: 'Itos',
      lines: [
        { accountCode: '1199107', accountName: 'Deposit - Down Payment',         debit: 16_636, credit: 0 },
        { accountCode: '1131101', accountName: 'AR under Financial Lease',        debit: 32_518, credit: 0 },
        { accountCode: '1191002', accountName: 'Input VAT Undue',                 debit:  3_199, credit: 0 },
        { accountCode: '2111106', accountName: 'Unearned Revenue',                debit:      0, credit: 3_453, note: 'Booking' },
        { accountCode: '2111204', accountName: 'Trade Payables - Leasing',        debit:      0, credit: 48_900, note: 'Ledger' },
      ],
    },
    {
      stageKey: 'downpayment',
      titleThai: 'รับเงินดาวน์ (Down Payment)',
      titleEng: 'Receive Down Payment',
      description: 'บันทึกเมื่อได้รับเงินดาวน์จากลูกค้า ล้าง Deposit และตั้ง Output VAT',
      system: 'Itos',
      lines: [
        { accountCode: '2111204', accountName: 'Trade Payables - Leasing',        debit: 17_800, credit: 0,      note: 'รับเงินดาวน์' },
        { accountCode: '1199107', accountName: 'Deposit - Down Payment',           debit:      0, credit: 16_636 },
        { accountCode: '2191001', accountName: 'Output VAT',                       debit:      0, credit:  1_164 },
      ],
    },
    {
      stageKey: 'api_fo365',
      titleThai: 'ตั้ง API ส่งเข้า FO365 (AP Card)',
      titleEng: 'API Posting to FO365 Vendor Card',
      description: 'ระบบ Itos ส่ง API เข้า FO365 เพื่อตั้งเจ้าหนี้ในการ์ด Vendor — บัญชี 2111204 จะเหลือ 0',
      system: 'FO365',
      lines: [
        { accountCode: '2111204', accountName: 'Trade Payables - Leasing',        debit: 31_100, credit: 0,      note: 'Ledger บัญชีจะเหลือ = 0' },
        { accountCode: 'V000400', accountName: 'Vendor (AP Card)',                 debit:      0, credit: 31_100, note: 'เข้าการ์ดเจ้าหนี้' },
      ],
    },
    {
      stageKey: 'payment',
      titleThai: 'ทำจ่าย Vendor ใน FO365',
      titleEng: 'Vendor Payment in FO365',
      description: 'บันทึกการจ่ายเงินให้ Vendor ผ่านธนาคาร — รายการนี้ Itos ไม่มีใน GL',
      system: 'FO365',
      warning: 'จังหวะนี้ Itos ไม่มีรายการใน GL ต้องตรวจสอบที่ FO365 เท่านั้น',
      lines: [
        { accountCode: 'V000400',  accountName: 'Vendor (AP Card)',                debit: 31_100, credit: 0 },
        { accountCode: '1112001',  accountName: 'Bank - Current Account',          debit:      0, credit: 31_100 },
      ],
    },
  ],
}

// ============================================================
// Vendor COM7  (กิจการที่เกี่ยวข้อง)
// ============================================================
export const LEASING_VENDOR_COM7: LeasingTransaction = {
  vendorType: 'com7',
  vendorLabel: 'Vendor COM7',
  contractNo: 'LS-6801-C7-001',
  stages: [
    {
      stageKey: 'booking',
      titleThai: 'บันทึก Booking สัญญาเช่าซื้อ (COM7)',
      titleEng: 'Lease Booking Entry – COM7',
      description: 'ใช้บัญชี 2111203 แทน 2111204 เนื่องจาก COM7 เป็นกิจการที่เกี่ยวข้อง (Related Party)',
      system: 'Itos',
      lines: [
        { accountCode: '1131101', accountName: 'AR under Financial Lease',             debit: 32_518, credit: 0 },
        { accountCode: '1191002', accountName: 'Input VAT Undue',                      debit:  3_199, credit: 0 },
        { accountCode: '2111106', accountName: 'Unearned Revenue',                     debit:      0, credit:  3_453 },
        {
          accountCode: '2111203',
          accountName: 'Trade Payables - Related (Leasing)',
          debit: 0,
          credit: 32_264,
          note: 'เปลี่ยนรหัสบัญชี ผูกกับสัญญาเฉพาะที่ซื้อกับ COM7',
        },
      ],
    },
  ],
}

/** สรุปความแตกต่างระหว่าง Vendor อื่นๆ และ COM7 */
export const VENDOR_DIFF_NOTES = [
  {
    topic: 'รหัสบัญชีเจ้าหนี้',
    other: '2111204 Trade Payables - Leasing',
    com7:  '2111203 Trade Payables - Related (Leasing)',
  },
  {
    topic: 'เงินมัดจำ / Deposit',
    other: 'มี 1199107 Deposit - Down Payment',
    com7:  'ไม่มีรายการ Deposit',
  },
  {
    topic: 'ยอด Trade Payable ตอน Booking',
    other: '48,900 บาท (รวม Deposit)',
    com7:  '32,264 บาท',
  },
  {
    topic: 'ขั้นตอนหลัง Booking',
    other: 'มี 4 ขั้น: Booking → รับดาวน์ → API FO365 → จ่าย',
    com7:  'แสดงเฉพาะ Booking (flow ต่อจากนี้เหมือน Vendor อื่นๆ)',
  },
]
