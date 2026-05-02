# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**UFund Accounting** — ระบบรายงานบัญชีแบบไทย (Thai Accounting Report System)

A React + TypeScript web application that renders print-ready Thai accounting reports following Thai GAAP (TFRS) conventions. Reports use Buddhist Era (พ.ศ.) dates, Thai Baht currency, and the standard 5-category Thai chart of accounts.

## Commands

```bash
npm install        # Install dependencies
npm run dev        # Dev server at http://localhost:5173
npm run build      # Type-check + Vite production build (output: dist/)
npm run type-check # tsc --noEmit (no build artifact)
npm run lint       # ESLint over src/**/*.{ts,tsx}
npm run preview    # Preview the production build locally
```

## Architecture

### Tech Stack
- **Vite** + **React 18** + **TypeScript** (strict mode)
- **Tailwind CSS** with custom `font-thai` utility and `brand-*` color scale
- **react-to-print** for browser print/PDF generation

### Key Conventions

**Path alias**: `@/` maps to `src/` (configured in `tsconfig.json` and `vite.config.ts`).

**Thai date formatting**: All dates must use Buddhist Era. Use helpers in `src/utils/thaiFormatter.ts`:
- `formatThaiDateFull(date)` → `"1 มกราคม 2568"`
- `formatThaiDateShort(date)` → `"01/01/68"`
- `formatThaiPeriod(from, to)` → full period string

**Currency**: Always use `formatBaht(amount)` from `thaiFormatter.ts`. Returns `"-"` for zero by default; pass `showZero=true` for totals. Never display negative amounts with a minus sign — wrap them in parentheses via `formatBahtSigned`.

**Chart of accounts numbering**:
| Range | Type |
|-------|------|
| 1xxx  | สินทรัพย์ (Assets) |
| 2xxx  | หนี้สิน (Liabilities) |
| 3xxx  | ส่วนของผู้ถือหุ้น (Equity) |
| 4xxx  | รายได้ (Revenue) |
| 5xxx  | ค่าใช้จ่าย (Expenses) |

Full account definitions live in `src/data/chartOfAccounts.ts`.

### Data Flow

All report components are purely presentational — they receive typed props and call `useReactToPrint` internally for printing. No state management library is used; the top-level `App.tsx` holds the active-report selection state and passes sample data down as props.

```
App.tsx
  ├─ sidebar nav (report selector)
  └─ active report component
       ├─ ReportHeader (company name + title + period)
       ├─ PrintButton  (calls useReactToPrint)
       └─ <table> with Thai-formatted data
```

**Building ledger/trial data at runtime**: The ledger and trial balance are computed from raw `JournalEntry[]` via:
- `buildLedgerAccounts(entries)` in `GeneralLedger.tsx`
- `buildTrialBalanceRows(entries)` in `TrialBalance.tsx`

### Report Components

| File | Thai name | Description |
|------|-----------|-------------|
| `GeneralJournal.tsx` | สมุดรายวันทั่วไป | Chronological journal entries with debit/credit columns |
| `GeneralLedger.tsx` | บัญชีแยกประเภท | Per-account T-ledger with running balance |
| `TrialBalance.tsx` | งบทดลอง | Aggregated debit/credit balances with balance check |
| `IncomeStatement.tsx` | งบกำไรขาดทุนเบ็ดเสร็จ | P&L with sections: revenue → COGS → operating → other → tax |
| `BalanceSheet.tsx` | งบแสดงฐานะการเงิน | Two-column layout (Assets | Liabilities + Equity) per Thai standard |

### Print / PDF

Each report wraps its content in a `ref` passed to `useReactToPrint`. Print styles in `src/index.css` target `@page { size: A4; }` and apply `display: table-header-group` so `<thead>` repeats on every printed page. The `.print:hidden` utility hides the sidebar and print button.

### TypeScript Types

Core types are in `src/types/accounting.ts`. Key interfaces:
- `JournalEntry` / `JournalLine` — raw double-entry records
- `LedgerAccount` / `LedgerEntry` — computed per-account view
- `IncomeStatementData` / `BalanceSheetData` — pre-structured report data
- `BalanceSheetLine` / `IncomeStatementLine` — row descriptors with `isSubtotal`, `isTotal`, `isBold`, and `indent` flags that control row rendering style

### Replacing Sample Data

`src/data/sampleData.ts` exports `COMPANY`, `SAMPLE_JOURNAL_ENTRIES`, `SAMPLE_INCOME_STATEMENT`, and `SAMPLE_BALANCE_SHEET`. Replace these with API calls or a real data layer while keeping the same shape as the exported types.
