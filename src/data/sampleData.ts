import type {
  CompanyInfo,
  JournalEntry,
  IncomeStatementData,
  BalanceSheetData,
} from '@/types/accounting'

export const COMPANY: CompanyInfo = {
  nameThai: 'บริษัท ยูฟันด์ จำกัด',
  nameEng: 'UFund Co., Ltd.',
  taxId: '0105567012345',
  address: '123 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพมหานคร 10110',
  tel: '02-123-4567',
}

export const SAMPLE_JOURNAL_ENTRIES: JournalEntry[] = [
  {
    id: 'JV-6801',
    date: new Date(2025, 0, 2),
    reference: 'JV-6801',
    description: 'รับชำระค่าบริการจากลูกค้า',
    lines: [
      { accountCode: '1101', accountName: 'เงินสด', debit: 107000, credit: 0 },
      { accountCode: '4200', accountName: 'รายได้จากการให้บริการ', debit: 0, credit: 100000 },
      { accountCode: '2150', accountName: 'ภาษีมูลค่าเพิ่มรอนำส่ง', debit: 0, credit: 7000 },
    ],
  },
  {
    id: 'JV-6802',
    date: new Date(2025, 0, 5),
    reference: 'JV-6802',
    description: 'จ่ายค่าเช่าสำนักงาน เดือนมกราคม 2568',
    lines: [
      { accountCode: '5302', accountName: 'ค่าเช่า', debit: 30000, credit: 0 },
      { accountCode: '1101', accountName: 'เงินสด', debit: 0, credit: 30000 },
    ],
  },
  {
    id: 'JV-6803',
    date: new Date(2025, 0, 10),
    reference: 'JV-6803',
    description: 'ซื้อสินค้าเพื่อขาย เป็นเงินเชื่อ',
    lines: [
      { accountCode: '1130', accountName: 'สินค้าคงเหลือ', debit: 200000, credit: 0 },
      { accountCode: '1160', accountName: 'ภาษีมูลค่าเพิ่มรอเรียกคืน', debit: 14000, credit: 0 },
      { accountCode: '2110', accountName: 'เจ้าหนี้การค้า', debit: 0, credit: 214000 },
    ],
  },
  {
    id: 'JV-6804',
    date: new Date(2025, 0, 15),
    reference: 'JV-6804',
    description: 'ขายสินค้าเป็นเงินสด',
    lines: [
      { accountCode: '1101', accountName: 'เงินสด', debit: 321000, credit: 0 },
      { accountCode: '4100', accountName: 'รายได้จากการขาย', debit: 0, credit: 300000 },
      { accountCode: '2150', accountName: 'ภาษีมูลค่าเพิ่มรอนำส่ง', debit: 0, credit: 21000 },
    ],
  },
  {
    id: 'JV-6805',
    date: new Date(2025, 0, 15),
    reference: 'JV-6805',
    description: 'บันทึกต้นทุนขาย',
    lines: [
      { accountCode: '5101', accountName: 'ต้นทุนสินค้า', debit: 150000, credit: 0 },
      { accountCode: '1130', accountName: 'สินค้าคงเหลือ', debit: 0, credit: 150000 },
    ],
  },
  {
    id: 'JV-6806',
    date: new Date(2025, 0, 20),
    reference: 'JV-6806',
    description: 'จ่ายเงินเดือนพนักงาน เดือนมกราคม 2568',
    lines: [
      { accountCode: '5301', accountName: 'เงินเดือนผู้บริหารและพนักงาน', debit: 85000, credit: 0 },
      { accountCode: '1102', accountName: 'เงินฝากธนาคาร', debit: 0, credit: 85000 },
    ],
  },
  {
    id: 'JV-6807',
    date: new Date(2025, 0, 25),
    reference: 'JV-6807',
    description: 'ชำระหนี้เจ้าหนี้การค้า',
    lines: [
      { accountCode: '2110', accountName: 'เจ้าหนี้การค้า', debit: 214000, credit: 0 },
      { accountCode: '1102', accountName: 'เงินฝากธนาคาร', debit: 0, credit: 214000 },
    ],
  },
  {
    id: 'JV-6808',
    date: new Date(2025, 0, 31),
    reference: 'JV-6808',
    description: 'บันทึกค่าเสื่อมราคาประจำเดือน',
    lines: [
      { accountCode: '5306', accountName: 'ค่าเสื่อมราคา', debit: 12500, credit: 0 },
      { accountCode: '1241', accountName: 'ค่าเสื่อมราคาสะสม - อุปกรณ์สำนักงาน', debit: 0, credit: 12500 },
    ],
  },
]

export const SAMPLE_INCOME_STATEMENT: IncomeStatementData = {
  companyName: COMPANY.nameThai,
  periodFrom: new Date(2025, 0, 1),
  periodTo: new Date(2025, 11, 31),
  revenues: [
    { accountCode: '4100', accountNameThai: 'รายได้จากการขาย', amount: 3600000 },
    { accountCode: '4101', accountNameThai: 'หัก: ส่วนลดจ่าย', amount: -45000, indent: 1 },
    { accountCode: '4102', accountNameThai: 'หัก: สินค้าส่งคืน', amount: -30000, indent: 1 },
    { accountCode: '', accountNameThai: 'รายได้จากการขายสุทธิ', amount: 3525000, isSubtotal: true, isBold: true },
    { accountCode: '4200', accountNameThai: 'รายได้จากการให้บริการ', amount: 1200000 },
    { accountCode: '', accountNameThai: 'รายได้รวม', amount: 4725000, isTotal: true, isBold: true },
  ],
  costOfGoods: [
    { accountCode: '5101', accountNameThai: 'ต้นทุนสินค้า', amount: 1800000 },
    { accountCode: '5102', accountNameThai: 'ค่าขนส่งเข้า', amount: 45000 },
    { accountCode: '', accountNameThai: 'ต้นทุนขายรวม', amount: 1845000, isSubtotal: true, isBold: true },
    { accountCode: '', accountNameThai: 'กำไรขั้นต้น', amount: 2880000, isTotal: true, isBold: true },
  ],
  operatingExpenses: [
    { accountCode: '5200', accountNameThai: 'ค่าใช้จ่ายในการขาย', amount: 0, isBold: true },
    { accountCode: '5201', accountNameThai: 'เงินเดือนพนักงานขาย', amount: 420000, indent: 1 },
    { accountCode: '5202', accountNameThai: 'ค่าโฆษณา', amount: 180000, indent: 1 },
    { accountCode: '5203', accountNameThai: 'ค่าขนส่งออก', amount: 60000, indent: 1 },
    { accountCode: '', accountNameThai: 'รวมค่าใช้จ่ายในการขาย', amount: 660000, isSubtotal: true },
    { accountCode: '5300', accountNameThai: 'ค่าใช้จ่ายในการบริหาร', amount: 0, isBold: true },
    { accountCode: '5301', accountNameThai: 'เงินเดือนผู้บริหารและพนักงาน', amount: 1020000, indent: 1 },
    { accountCode: '5302', accountNameThai: 'ค่าเช่า', amount: 360000, indent: 1 },
    { accountCode: '5303', accountNameThai: 'ค่าไฟฟ้า', amount: 72000, indent: 1 },
    { accountCode: '5304', accountNameThai: 'ค่าโทรศัพท์', amount: 36000, indent: 1 },
    { accountCode: '5306', accountNameThai: 'ค่าเสื่อมราคา', amount: 150000, indent: 1 },
    { accountCode: '5308', accountNameThai: 'ค่าใช้จ่ายในการบริหารอื่น', amount: 48000, indent: 1 },
    { accountCode: '', accountNameThai: 'รวมค่าใช้จ่ายในการบริหาร', amount: 1686000, isSubtotal: true },
    { accountCode: '', accountNameThai: 'รวมค่าใช้จ่ายดำเนินงาน', amount: 2346000, isTotal: true, isBold: true },
    { accountCode: '', accountNameThai: 'กำไรจากการดำเนินงาน', amount: 534000, isTotal: true, isBold: true },
  ],
  otherIncome: [
    { accountCode: '4300', accountNameThai: 'รายได้ดอกเบี้ย', amount: 24000 },
    { accountCode: '4900', accountNameThai: 'รายได้อื่น', amount: 12000 },
    { accountCode: '', accountNameThai: 'รวมรายได้อื่น', amount: 36000, isSubtotal: true },
  ],
  otherExpenses: [
    { accountCode: '5401', accountNameThai: 'ดอกเบี้ยจ่าย', amount: 48000 },
    { accountCode: '', accountNameThai: 'รวมค่าใช้จ่ายอื่น', amount: 48000, isSubtotal: true },
    { accountCode: '', accountNameThai: 'กำไรก่อนภาษีเงินได้', amount: 522000, isTotal: true, isBold: true },
    { accountCode: '5500', accountNameThai: 'ภาษีเงินได้นิติบุคคล (20%)', amount: 104400 },
    { accountCode: '', accountNameThai: 'กำไรสุทธิ', amount: 417600, isTotal: true, isBold: true },
  ],
}

export const SAMPLE_BALANCE_SHEET: BalanceSheetData = {
  companyName: COMPANY.nameThai,
  date: new Date(2025, 11, 31),
  currentAssets: [
    { accountCode: '1101', accountNameThai: 'เงินสด', amount: 285000 },
    { accountCode: '1102', accountNameThai: 'เงินฝากธนาคาร', amount: 1250000 },
    { accountCode: '1110', accountNameThai: 'ลูกหนี้การค้า', amount: 480000 },
    { accountCode: '1111', accountNameThai: 'หัก: ค่าเผื่อหนี้สงสัยจะสูญ', amount: -24000, indent: 1 },
    { accountCode: '1130', accountNameThai: 'สินค้าคงเหลือ', amount: 620000 },
    { accountCode: '1150', accountNameThai: 'ค่าใช้จ่ายจ่ายล่วงหน้า', amount: 36000 },
    { accountCode: '', accountNameThai: 'รวมสินทรัพย์หมุนเวียน', amount: 2647000, isSubtotal: true, isBold: true },
  ],
  nonCurrentAssets: [
    { accountCode: '1220', accountNameThai: 'ที่ดิน', amount: 2000000 },
    { accountCode: '1230', accountNameThai: 'อาคาร', amount: 3500000 },
    { accountCode: '1231', accountNameThai: 'หัก: ค่าเสื่อมราคาสะสม - อาคาร', amount: -700000, indent: 1 },
    { accountCode: '1240', accountNameThai: 'อุปกรณ์สำนักงาน', amount: 750000 },
    { accountCode: '1241', accountNameThai: 'หัก: ค่าเสื่อมราคาสะสม - อุปกรณ์สำนักงาน', amount: -300000, indent: 1 },
    { accountCode: '1250', accountNameThai: 'ยานพาหนะ', amount: 1200000 },
    { accountCode: '1251', accountNameThai: 'หัก: ค่าเสื่อมราคาสะสม - ยานพาหนะ', amount: -480000, indent: 1 },
    { accountCode: '', accountNameThai: 'รวมสินทรัพย์ไม่หมุนเวียน', amount: 5970000, isSubtotal: true, isBold: true },
    { accountCode: '', accountNameThai: 'รวมสินทรัพย์', amount: 8617000, isTotal: true, isBold: true },
  ],
  currentLiabilities: [
    { accountCode: '2110', accountNameThai: 'เจ้าหนี้การค้า', amount: 380000 },
    { accountCode: '2131', accountNameThai: 'เงินเดือนค้างจ่าย', amount: 85000 },
    { accountCode: '2150', accountNameThai: 'ภาษีมูลค่าเพิ่มรอนำส่ง', amount: 42000 },
    { accountCode: '2160', accountNameThai: 'ภาษีเงินได้นิติบุคคลค้างจ่าย', amount: 104400 },
    { accountCode: '2170', accountNameThai: 'เงินกู้ยืมระยะสั้น', amount: 500000 },
    { accountCode: '', accountNameThai: 'รวมหนี้สินหมุนเวียน', amount: 1111400, isSubtotal: true, isBold: true },
  ],
  nonCurrentLiabilities: [
    { accountCode: '2210', accountNameThai: 'เงินกู้ยืมระยะยาว', amount: 2000000 },
    { accountCode: '2230', accountNameThai: 'ภาระผูกพันผลประโยชน์พนักงาน', amount: 188000 },
    { accountCode: '', accountNameThai: 'รวมหนี้สินไม่หมุนเวียน', amount: 2188000, isSubtotal: true, isBold: true },
    { accountCode: '', accountNameThai: 'รวมหนี้สิน', amount: 3299400, isTotal: true, isBold: true },
  ],
  equity: [
    { accountCode: '3100', accountNameThai: 'ทุนจดทะเบียนและชำระแล้ว (หุ้นสามัญ 5,000,000 หุ้น มูลค่าหุ้นละ 1 บาท)', amount: 5000000 },
    { accountCode: '3200', accountNameThai: 'ส่วนเกินมูลค่าหุ้น', amount: 0 },
    { accountCode: '3320', accountNameThai: 'กำไรสะสมยังไม่ได้จัดสรร (ต้นงวด)', amount: -99600 },
    { accountCode: '3400', accountNameThai: 'กำไรสุทธิประจำปี', amount: 417600 },
    { accountCode: '', accountNameThai: 'รวมส่วนของผู้ถือหุ้น', amount: 5318000, isTotal: true, isBold: true },
    { accountCode: '', accountNameThai: 'รวมหนี้สินและส่วนของผู้ถือหุ้น', amount: 8617400, isTotal: true, isBold: true },
  ],
}
