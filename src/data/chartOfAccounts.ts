import type { Account } from '@/types/accounting'

/** ผังบัญชีมาตรฐานไทย (Thai Standard Chart of Accounts) */
export const CHART_OF_ACCOUNTS: Account[] = [
  // ============================================================
  // หมวด 1 สินทรัพย์ (Assets)
  // ============================================================
  { code: '1000', nameThai: 'สินทรัพย์', nameEng: 'Assets', type: 'asset', normalBalance: 'debit', isHeader: true },

  // สินทรัพย์หมุนเวียน
  { code: '1100', nameThai: 'สินทรัพย์หมุนเวียน', nameEng: 'Current Assets', type: 'asset', normalBalance: 'debit', isHeader: true },
  { code: '1101', nameThai: 'เงินสด', nameEng: 'Cash', type: 'asset', normalBalance: 'debit', parentCode: '1100' },
  { code: '1102', nameThai: 'เงินฝากธนาคาร', nameEng: 'Bank Deposits', type: 'asset', normalBalance: 'debit', parentCode: '1100' },
  { code: '1112001', nameThai: 'เงินฝากธนาคาร - บัญชีกระแสรายวัน', nameEng: 'Bank - Current Account', type: 'asset', normalBalance: 'debit', parentCode: '1100' },
  { code: '1103', nameThai: 'เงินลงทุนระยะสั้น', nameEng: 'Short-term Investments', type: 'asset', normalBalance: 'debit', parentCode: '1100' },
  { code: '1110', nameThai: 'ลูกหนี้การค้า', nameEng: 'Accounts Receivable', type: 'asset', normalBalance: 'debit', parentCode: '1100' },
  { code: '1131101', nameThai: 'ลูกหนี้ตามสัญญาเช่าทางการเงิน', nameEng: 'AR under Financial Lease', type: 'asset', normalBalance: 'debit', parentCode: '1100' },
  { code: '1191002', nameThai: 'ภาษีซื้อยังไม่ถึงกำหนด', nameEng: 'Input VAT Undue', type: 'asset', normalBalance: 'debit', parentCode: '1100' },
  { code: '1199107', nameThai: 'เงินมัดจำ - เงินดาวน์', nameEng: 'Deposit - Down Payment', type: 'asset', normalBalance: 'debit', parentCode: '1100' },
  { code: '1111', nameThai: 'ค่าเผื่อหนี้สงสัยจะสูญ', nameEng: 'Allowance for Doubtful Accounts', type: 'asset', normalBalance: 'credit', parentCode: '1100' },
  { code: '1120', nameThai: 'ตั๋วเงินรับ', nameEng: 'Notes Receivable', type: 'asset', normalBalance: 'debit', parentCode: '1100' },
  { code: '1130', nameThai: 'สินค้าคงเหลือ', nameEng: 'Inventory', type: 'asset', normalBalance: 'debit', parentCode: '1100' },
  { code: '1140', nameThai: 'วัสดุสิ้นเปลือง', nameEng: 'Supplies', type: 'asset', normalBalance: 'debit', parentCode: '1100' },
  { code: '1150', nameThai: 'ค่าใช้จ่ายจ่ายล่วงหน้า', nameEng: 'Prepaid Expenses', type: 'asset', normalBalance: 'debit', parentCode: '1100' },
  { code: '1160', nameThai: 'ภาษีมูลค่าเพิ่มรอเรียกคืน', nameEng: 'VAT Receivable', type: 'asset', normalBalance: 'debit', parentCode: '1100' },
  { code: '1170', nameThai: 'ลูกหนี้อื่น', nameEng: 'Other Receivables', type: 'asset', normalBalance: 'debit', parentCode: '1100' },

  // สินทรัพย์ไม่หมุนเวียน
  { code: '1200', nameThai: 'สินทรัพย์ไม่หมุนเวียน', nameEng: 'Non-Current Assets', type: 'asset', normalBalance: 'debit', isHeader: true },
  { code: '1210', nameThai: 'เงินลงทุนระยะยาว', nameEng: 'Long-term Investments', type: 'asset', normalBalance: 'debit', parentCode: '1200' },
  { code: '1220', nameThai: 'ที่ดิน', nameEng: 'Land', type: 'asset', normalBalance: 'debit', parentCode: '1200' },
  { code: '1230', nameThai: 'อาคาร', nameEng: 'Buildings', type: 'asset', normalBalance: 'debit', parentCode: '1200' },
  { code: '1231', nameThai: 'ค่าเสื่อมราคาสะสม - อาคาร', nameEng: 'Accumulated Depreciation - Buildings', type: 'asset', normalBalance: 'credit', parentCode: '1200' },
  { code: '1240', nameThai: 'อุปกรณ์สำนักงาน', nameEng: 'Office Equipment', type: 'asset', normalBalance: 'debit', parentCode: '1200' },
  { code: '1241', nameThai: 'ค่าเสื่อมราคาสะสม - อุปกรณ์สำนักงาน', nameEng: 'Accumulated Depreciation - Office Equipment', type: 'asset', normalBalance: 'credit', parentCode: '1200' },
  { code: '1250', nameThai: 'ยานพาหนะ', nameEng: 'Vehicles', type: 'asset', normalBalance: 'debit', parentCode: '1200' },
  { code: '1251', nameThai: 'ค่าเสื่อมราคาสะสม - ยานพาหนะ', nameEng: 'Accumulated Depreciation - Vehicles', type: 'asset', normalBalance: 'credit', parentCode: '1200' },
  { code: '1260', nameThai: 'สินทรัพย์ไม่มีตัวตน', nameEng: 'Intangible Assets', type: 'asset', normalBalance: 'debit', parentCode: '1200' },

  // ============================================================
  // หมวด 2 หนี้สิน (Liabilities)
  // ============================================================
  { code: '2000', nameThai: 'หนี้สิน', nameEng: 'Liabilities', type: 'liability', normalBalance: 'credit', isHeader: true },

  // หนี้สินหมุนเวียน
  { code: '2100', nameThai: 'หนี้สินหมุนเวียน', nameEng: 'Current Liabilities', type: 'liability', normalBalance: 'credit', isHeader: true },
  { code: '2101', nameThai: 'เงินเบิกเกินบัญชี', nameEng: 'Bank Overdraft', type: 'liability', normalBalance: 'credit', parentCode: '2100' },
  { code: '2110', nameThai: 'เจ้าหนี้การค้า', nameEng: 'Accounts Payable', type: 'liability', normalBalance: 'credit', parentCode: '2100' },
  { code: '2111106', nameThai: 'รายได้รับล่วงหน้า (Leasing)', nameEng: 'Unearned Revenue (Leasing)', type: 'liability', normalBalance: 'credit', parentCode: '2100' },
  { code: '2111203', nameThai: 'เจ้าหนี้การค้า - กิจการที่เกี่ยวข้อง (Leasing)', nameEng: 'Trade Payables - Related (Leasing)', type: 'liability', normalBalance: 'credit', parentCode: '2100' },
  { code: '2111204', nameThai: 'เจ้าหนี้การค้า - Leasing', nameEng: 'Trade Payables - Leasing', type: 'liability', normalBalance: 'credit', parentCode: '2100' },
  { code: '2191001', nameThai: 'ภาษีขายยังไม่ถึงกำหนด', nameEng: 'Output VAT Undue', type: 'liability', normalBalance: 'credit', parentCode: '2100' },
  { code: 'V000400', nameThai: 'เจ้าหนี้ Vendor (การ์ดเจ้าหนี้)', nameEng: 'Vendor AP Card', type: 'liability', normalBalance: 'credit', parentCode: '2100' },
  { code: '2120', nameThai: 'ตั๋วเงินจ่าย', nameEng: 'Notes Payable', type: 'liability', normalBalance: 'credit', parentCode: '2100' },
  { code: '2130', nameThai: 'ค่าใช้จ่ายค้างจ่าย', nameEng: 'Accrued Expenses', type: 'liability', normalBalance: 'credit', parentCode: '2100' },
  { code: '2131', nameThai: 'เงินเดือนค้างจ่าย', nameEng: 'Accrued Salaries', type: 'liability', normalBalance: 'credit', parentCode: '2100' },
  { code: '2132', nameThai: 'ดอกเบี้ยค้างจ่าย', nameEng: 'Accrued Interest', type: 'liability', normalBalance: 'credit', parentCode: '2100' },
  { code: '2140', nameThai: 'รายได้รับล่วงหน้า', nameEng: 'Unearned Revenue', type: 'liability', normalBalance: 'credit', parentCode: '2100' },
  { code: '2150', nameThai: 'ภาษีมูลค่าเพิ่มรอนำส่ง', nameEng: 'VAT Payable', type: 'liability', normalBalance: 'credit', parentCode: '2100' },
  { code: '2160', nameThai: 'ภาษีเงินได้นิติบุคคลค้างจ่าย', nameEng: 'Income Tax Payable', type: 'liability', normalBalance: 'credit', parentCode: '2100' },
  { code: '2170', nameThai: 'เงินกู้ยืมระยะสั้น', nameEng: 'Short-term Loans', type: 'liability', normalBalance: 'credit', parentCode: '2100' },
  { code: '2180', nameThai: 'เจ้าหนี้อื่น', nameEng: 'Other Payables', type: 'liability', normalBalance: 'credit', parentCode: '2100' },

  // หนี้สินไม่หมุนเวียน
  { code: '2200', nameThai: 'หนี้สินไม่หมุนเวียน', nameEng: 'Non-Current Liabilities', type: 'liability', normalBalance: 'credit', isHeader: true },
  { code: '2210', nameThai: 'เงินกู้ยืมระยะยาว', nameEng: 'Long-term Loans', type: 'liability', normalBalance: 'credit', parentCode: '2200' },
  { code: '2220', nameThai: 'หุ้นกู้', nameEng: 'Debentures', type: 'liability', normalBalance: 'credit', parentCode: '2200' },
  { code: '2230', nameThai: 'ภาระผูกพันผลประโยชน์พนักงาน', nameEng: 'Employee Benefit Obligations', type: 'liability', normalBalance: 'credit', parentCode: '2200' },

  // ============================================================
  // หมวด 3 ส่วนของเจ้าของ (Equity)
  // ============================================================
  { code: '3000', nameThai: 'ส่วนของผู้ถือหุ้น', nameEng: 'Shareholders\' Equity', type: 'equity', normalBalance: 'credit', isHeader: true },
  { code: '3100', nameThai: 'ทุนจดทะเบียน', nameEng: 'Registered Capital', type: 'equity', normalBalance: 'credit', parentCode: '3000' },
  { code: '3200', nameThai: 'ส่วนเกินมูลค่าหุ้น', nameEng: 'Share Premium', type: 'equity', normalBalance: 'credit', parentCode: '3000' },
  { code: '3300', nameThai: 'กำไรสะสม', nameEng: 'Retained Earnings', type: 'equity', normalBalance: 'credit', parentCode: '3000' },
  { code: '3310', nameThai: 'กำไรสะสมจัดสรรแล้ว', nameEng: 'Appropriated Retained Earnings', type: 'equity', normalBalance: 'credit', parentCode: '3000' },
  { code: '3320', nameThai: 'กำไรสะสมยังไม่ได้จัดสรร', nameEng: 'Unappropriated Retained Earnings', type: 'equity', normalBalance: 'credit', parentCode: '3000' },
  { code: '3400', nameThai: 'กำไร(ขาดทุน)สุทธิประจำปี', nameEng: 'Net Profit (Loss)', type: 'equity', normalBalance: 'credit', parentCode: '3000' },

  // ============================================================
  // หมวด 4 รายได้ (Revenue)
  // ============================================================
  { code: '4000', nameThai: 'รายได้', nameEng: 'Revenue', type: 'revenue', normalBalance: 'credit', isHeader: true },
  { code: '4100', nameThai: 'รายได้จากการขาย', nameEng: 'Sales Revenue', type: 'revenue', normalBalance: 'credit', parentCode: '4000' },
  { code: '4101', nameThai: 'ส่วนลดจ่าย', nameEng: 'Sales Discounts', type: 'revenue', normalBalance: 'debit', parentCode: '4000' },
  { code: '4102', nameThai: 'สินค้าส่งคืน', nameEng: 'Sales Returns', type: 'revenue', normalBalance: 'debit', parentCode: '4000' },
  { code: '4200', nameThai: 'รายได้จากการให้บริการ', nameEng: 'Service Revenue', type: 'revenue', normalBalance: 'credit', parentCode: '4000' },
  { code: '4300', nameThai: 'รายได้จากดอกเบี้ย', nameEng: 'Interest Income', type: 'revenue', normalBalance: 'credit', parentCode: '4000' },
  { code: '4400', nameThai: 'รายได้จากเงินปันผล', nameEng: 'Dividend Income', type: 'revenue', normalBalance: 'credit', parentCode: '4000' },
  { code: '4500', nameThai: 'กำไรจากการขายสินทรัพย์', nameEng: 'Gain on Asset Disposal', type: 'revenue', normalBalance: 'credit', parentCode: '4000' },
  { code: '4900', nameThai: 'รายได้อื่น', nameEng: 'Other Income', type: 'revenue', normalBalance: 'credit', parentCode: '4000' },

  // ============================================================
  // หมวด 5 ค่าใช้จ่าย (Expenses)
  // ============================================================
  { code: '5000', nameThai: 'ค่าใช้จ่าย', nameEng: 'Expenses', type: 'expense', normalBalance: 'debit', isHeader: true },

  // ต้นทุนขาย
  { code: '5100', nameThai: 'ต้นทุนขาย', nameEng: 'Cost of Goods Sold', type: 'expense', normalBalance: 'debit', parentCode: '5000' },
  { code: '5101', nameThai: 'ต้นทุนสินค้า', nameEng: 'Cost of Merchandise', type: 'expense', normalBalance: 'debit', parentCode: '5100' },
  { code: '5102', nameThai: 'ค่าขนส่งเข้า', nameEng: 'Freight-in', type: 'expense', normalBalance: 'debit', parentCode: '5100' },

  // ค่าใช้จ่ายในการขาย
  { code: '5200', nameThai: 'ค่าใช้จ่ายในการขาย', nameEng: 'Selling Expenses', type: 'expense', normalBalance: 'debit', parentCode: '5000' },
  { code: '5201', nameThai: 'เงินเดือนพนักงานขาย', nameEng: 'Sales Staff Salaries', type: 'expense', normalBalance: 'debit', parentCode: '5200' },
  { code: '5202', nameThai: 'ค่าโฆษณา', nameEng: 'Advertising Expenses', type: 'expense', normalBalance: 'debit', parentCode: '5200' },
  { code: '5203', nameThai: 'ค่าขนส่งออก', nameEng: 'Freight-out', type: 'expense', normalBalance: 'debit', parentCode: '5200' },
  { code: '5204', nameThai: 'ค่าใช้จ่ายในการขายอื่น', nameEng: 'Other Selling Expenses', type: 'expense', normalBalance: 'debit', parentCode: '5200' },

  // ค่าใช้จ่ายในการบริหาร
  { code: '5300', nameThai: 'ค่าใช้จ่ายในการบริหาร', nameEng: 'Administrative Expenses', type: 'expense', normalBalance: 'debit', parentCode: '5000' },
  { code: '5301', nameThai: 'เงินเดือนผู้บริหารและพนักงาน', nameEng: 'Management & Staff Salaries', type: 'expense', normalBalance: 'debit', parentCode: '5300' },
  { code: '5302', nameThai: 'ค่าเช่า', nameEng: 'Rent Expense', type: 'expense', normalBalance: 'debit', parentCode: '5300' },
  { code: '5303', nameThai: 'ค่าไฟฟ้า', nameEng: 'Electricity Expense', type: 'expense', normalBalance: 'debit', parentCode: '5300' },
  { code: '5304', nameThai: 'ค่าโทรศัพท์', nameEng: 'Telephone Expense', type: 'expense', normalBalance: 'debit', parentCode: '5300' },
  { code: '5305', nameThai: 'ค่าวัสดุสำนักงาน', nameEng: 'Office Supplies Expense', type: 'expense', normalBalance: 'debit', parentCode: '5300' },
  { code: '5306', nameThai: 'ค่าเสื่อมราคา', nameEng: 'Depreciation Expense', type: 'expense', normalBalance: 'debit', parentCode: '5300' },
  { code: '5307', nameThai: 'หนี้สูญ', nameEng: 'Bad Debt Expense', type: 'expense', normalBalance: 'debit', parentCode: '5300' },
  { code: '5308', nameThai: 'ค่าใช้จ่ายในการบริหารอื่น', nameEng: 'Other Administrative Expenses', type: 'expense', normalBalance: 'debit', parentCode: '5300' },

  // ค่าใช้จ่ายทางการเงิน
  { code: '5400', nameThai: 'ค่าใช้จ่ายทางการเงิน', nameEng: 'Financial Expenses', type: 'expense', normalBalance: 'debit', parentCode: '5000' },
  { code: '5401', nameThai: 'ดอกเบี้ยจ่าย', nameEng: 'Interest Expense', type: 'expense', normalBalance: 'debit', parentCode: '5400' },
  { code: '5402', nameThai: 'ขาดทุนจากอัตราแลกเปลี่ยน', nameEng: 'Foreign Exchange Loss', type: 'expense', normalBalance: 'debit', parentCode: '5400' },

  // ภาษีเงินได้
  { code: '5500', nameThai: 'ภาษีเงินได้นิติบุคคล', nameEng: 'Corporate Income Tax', type: 'expense', normalBalance: 'debit', parentCode: '5000' },
]

export function getAccountByCode(code: string): Account | undefined {
  return CHART_OF_ACCOUNTS.find(a => a.code === code)
}

export function getAccountsByType(type: Account['type']): Account[] {
  return CHART_OF_ACCOUNTS.filter(a => a.type === type && !a.isHeader)
}
