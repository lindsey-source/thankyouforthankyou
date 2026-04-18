// Guest list parsing utilities — supports CSV and Excel (.xlsx, .xls)
import * as XLSX from 'xlsx';

export interface GuestGiftData {
  guestName: string;
  emailAddress: string;
  giftDescription: string;
  giftAmount: string;
  relationship: string;
  personalNote: string;
  send: boolean;
}

// Generate CSV template for download
export const generateCSVTemplate = (): void => {
  const headers = [
    'Guest Name',
    'Email Address',
    'Gift Description',
    'Gift Amount',
    'Relationship',
    'Personal Note',
    'Send? (YES/NO)',
  ];
  const sampleData = [
    ['John Smith', 'john@email.com', 'Beautiful flowers', '75', 'Cousin', 'Loved the bouquet — thank you!', 'YES'],
    ['Sarah Johnson', 'sarah@email.com', 'Kitchen mixer', '150', 'Friend', 'The mixer is perfect for our new home.', 'YES'],
    ['Mike Wilson', 'mike@email.com', 'Restaurant gift card', '100', 'Colleague', 'Cannot wait to try it out!', 'NO'],
  ];

  const csvContent = [headers, ...sampleData]
    .map(row => row.map(field => `"${field}"`).join(','))
    .join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', 'guest-list-template.csv');
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Parse YES/NO/true/1 etc. into boolean. Empty defaults to YES (send).
const parseSendFlag = (raw: string): boolean => {
  const v = (raw || '').trim().toLowerCase();
  if (!v) return true;
  return ['yes', 'y', 'true', '1', 'send'].includes(v);
};

// Convert raw row arrays (from CSV or XLSX) into GuestGiftData
const rowsToGuestData = (rows: string[][]): GuestGiftData[] => {
  if (rows.length < 2) {
    throw new Error('File must have at least a header row and one data row');
  }
  const dataRows = rows.slice(1);
  const out: GuestGiftData[] = [];
  dataRows.forEach((fields, index) => {
    if (fields.length < 3 || !fields.some((f) => (f || '').toString().trim())) {
      console.warn(`Row ${index + 2} has insufficient data, skipping`);
      return;
    }
    out.push({
      guestName: (fields[0] || '').toString().trim(),
      emailAddress: (fields[1] || '').toString().trim(),
      giftDescription: (fields[2] || '').toString().trim(),
      giftAmount: (fields[3] || '').toString().trim(),
      relationship: (fields[4] || '').toString().trim(),
      personalNote: (fields[5] || '').toString().trim(),
      send: parseSendFlag((fields[6] || '').toString()),
    });
  });
  return out;
};

// Parse uploaded file — auto-detects CSV vs Excel by extension
export const parseCSVFile = (file: File): Promise<GuestGiftData[]> => {
  const name = file.name.toLowerCase();
  const isExcel = name.endsWith('.xlsx') || name.endsWith('.xls');

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        if (isExcel) {
          const data = e.target?.result;
          const wb = XLSX.read(data, { type: 'array' });
          const sheet = wb.Sheets[wb.SheetNames[0]];
          const rows = XLSX.utils.sheet_to_json<any[]>(sheet, {
            header: 1,
            defval: '',
            blankrows: false,
          }) as any[][];
          resolve(rowsToGuestData(rows.map((r) => r.map((c) => (c == null ? '' : String(c))))));
        } else {
          const text = e.target?.result as string;
          const lines = text.split('\n').filter((line) => line.trim() !== '');
          const rows = lines.map(parseCSVLine);
          resolve(rowsToGuestData(rows));
        }
      } catch (error: any) {
        reject(new Error(error?.message || 'Failed to parse file'));
      }
    };

    reader.onerror = () => reject(new Error('Failed to read file'));

    if (isExcel) reader.readAsArrayBuffer(file);
    else reader.readAsText(file);
  });
};

// Simple CSV line parser that handles quoted fields
const parseCSVLine = (line: string): string[] => {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }

  result.push(current);
  return result;
};

// Validate guest data
export const validateGuestData = (
  data: GuestGiftData[]
): { valid: GuestGiftData[]; invalid: { row: number; errors: string[] }[] } => {
  const valid: GuestGiftData[] = [];
  const invalid: { row: number; errors: string[] }[] = [];

  data.forEach((guest, index) => {
    const errors: string[] = [];

    if (!guest.guestName.trim()) errors.push('Guest name is required');

    if (!guest.emailAddress.trim()) {
      errors.push('Email address is required');
    } else if (!isValidEmail(guest.emailAddress)) {
      errors.push('Invalid email format');
    }

    if (!guest.giftDescription.trim()) errors.push('Gift description is required');

    if (guest.giftAmount && isNaN(Number(guest.giftAmount.replace(/[$,]/g, '')))) {
      errors.push('Gift amount must be a number');
    }

    if (errors.length > 0) {
      invalid.push({ row: index + 2, errors });
    } else {
      valid.push(guest);
    }
  });

  return { valid, invalid };
};

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
