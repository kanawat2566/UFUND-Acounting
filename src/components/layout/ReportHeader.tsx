interface ReportHeaderProps {
  companyName: string
  reportTitle: string
  subtitle: string
}

export function ReportHeader({ companyName, reportTitle, subtitle }: ReportHeaderProps) {
  return (
    <div className="text-center mb-6 print:mb-4">
      <h1 className="text-xl font-bold text-gray-900">{companyName}</h1>
      <h2 className="text-lg font-semibold text-gray-800 mt-1">{reportTitle}</h2>
      <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
    </div>
  )
}
