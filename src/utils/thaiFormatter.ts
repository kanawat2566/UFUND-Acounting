const THAI_MONTHS = [
  'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน',
  'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม',
  'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม',
]

const THAI_MONTHS_SHORT = [
  'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.',
  'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.',
  'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.',
]

/** แปลงปี ค.ศ. → พ.ศ. */
export function toBuddhistYear(date: Date): number {
  return date.getFullYear() + 543
}

/** รูปแบบวันที่เต็ม: 1 มกราคม 2568 */
export function formatThaiDateFull(date: Date): string {
  const d = date.getDate()
  const m = THAI_MONTHS[date.getMonth()]
  const y = toBuddhistYear(date)
  return `${d} ${m} ${y}`
}

/** รูปแบบวันที่สั้น: 01/01/68 */
export function formatThaiDateShort(date: Date): string {
  const d = String(date.getDate()).padStart(2, '0')
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const y = String(toBuddhistYear(date)).slice(2)
  return `${d}/${m}/${y}`
}

/** รูปแบบวันที่กลาง: 01 ม.ค. 2568 */
export function formatThaiDateMedium(date: Date): string {
  const d = String(date.getDate()).padStart(2, '0')
  const m = THAI_MONTHS_SHORT[date.getMonth()]
  const y = toBuddhistYear(date)
  return `${d} ${m} ${y}`
}

/** รูปแบบช่วงเวลา: 1 มกราคม 2568 ถึง 31 ธันวาคม 2568 */
export function formatThaiPeriod(from: Date, to: Date): string {
  return `${formatThaiDateFull(from)} ถึง ${formatThaiDateFull(to)}`
}

/** แสดงเฉพาะเดือนและปี: มกราคม 2568 */
export function formatThaiMonthYear(date: Date): string {
  return `${THAI_MONTHS[date.getMonth()]} ${toBuddhistYear(date)}`
}

/** จัดรูปแบบตัวเลขเป็นสกุลเงินบาท */
export function formatBaht(amount: number, showZero = false): string {
  if (amount === 0 && !showZero) return '-'
  return new Intl.NumberFormat('th-TH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(amount))
}

/** จัดรูปแบบตัวเลขบาทพร้อมเครื่องหมาย */
export function formatBahtSigned(amount: number): string {
  if (amount === 0) return '-'
  const formatted = new Intl.NumberFormat('th-TH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(amount))
  return amount < 0 ? `(${formatted})` : formatted
}

/** แสดงยอดคงเหลือพร้อมด้าน ดร./คร. */
export function formatBalance(amount: number, side: 'debit' | 'credit'): string {
  if (amount === 0) return '-'
  const formatted = formatBaht(amount)
  return `${formatted} ${side === 'debit' ? 'ดร.' : 'คร.'}`
}
