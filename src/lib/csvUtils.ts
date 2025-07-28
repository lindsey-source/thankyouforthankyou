// CSV utility functions for guest and gift template functionality

export interface GuestGiftData {
  guestName: string;
  emailAddress: string;
  giftDescription: string;
  thankYouMessage?: string;
}

// Generate CSV template for download
export const generateCSVTemplate = (): void => {
  const headers = ['Guest Name', 'Email Address', 'Gift Description', 'Thank You Message (Optional)'];
  const sampleData = [
    ['John Smith', 'john@email.com', 'Beautiful flowers for the wedding', 'Thank you for the gorgeous flowers!'],
    ['Sarah Johnson', 'sarah@email.com', 'Kitchen mixer set', 'The mixer will be perfect for our new home!'],
    ['Mike Wilson', 'mike@email.com', 'Gift card to favorite restaurant', 'What a thoughtful gift - we cant wait to try it!']
  ];
  
  const csvContent = [headers, ...sampleData]
    .map(row => row.map(field => `"${field}"`).join(','))
    .join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', 'thank-you-template.csv');
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Parse uploaded CSV file
export const parseCSVFile = (file: File): Promise<GuestGiftData[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const lines = text.split('\n').filter(line => line.trim() !== '');
        
        if (lines.length < 2) {
          reject(new Error('CSV file must have at least a header row and one data row'));
          return;
        }
        
        // Skip header row
        const dataLines = lines.slice(1);
        const parsedData: GuestGiftData[] = [];
        
        dataLines.forEach((line, index) => {
          // Simple CSV parsing - handles quoted fields
          const fields = parseCSVLine(line);
          
          if (fields.length < 3) {
            console.warn(`Row ${index + 2} has insufficient data, skipping`);
            return;
          }
          
          parsedData.push({
            guestName: fields[0]?.trim() || '',
            emailAddress: fields[1]?.trim() || '',
            giftDescription: fields[2]?.trim() || '',
            thankYouMessage: fields[3]?.trim() || ''
          });
        });
        
        resolve(parsedData);
      } catch (error) {
        reject(new Error('Failed to parse CSV file'));
      }
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
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
export const validateGuestData = (data: GuestGiftData[]): { valid: GuestGiftData[], invalid: { row: number, errors: string[] }[] } => {
  const valid: GuestGiftData[] = [];
  const invalid: { row: number, errors: string[] }[] = [];
  
  data.forEach((guest, index) => {
    const errors: string[] = [];
    
    if (!guest.guestName.trim()) {
      errors.push('Guest name is required');
    }
    
    if (!guest.emailAddress.trim()) {
      errors.push('Email address is required');
    } else if (!isValidEmail(guest.emailAddress)) {
      errors.push('Invalid email format');
    }
    
    if (!guest.giftDescription.trim()) {
      errors.push('Gift description is required');
    }
    
    if (errors.length > 0) {
      invalid.push({ row: index + 2, errors }); // +2 for header and 0-based index
    } else {
      valid.push(guest);
    }
  });
  
  return { valid, invalid };
};

// Simple email validation
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};