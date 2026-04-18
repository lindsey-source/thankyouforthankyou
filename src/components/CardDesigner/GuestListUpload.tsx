import React, { useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Switch } from '@/components/ui/switch';
import { Download, Upload, Plus, Trash2, AlertTriangle, CheckCircle, Users, UserPlus } from 'lucide-react';
import { toast } from 'sonner';
import { parseCSVFile, validateGuestData, generateCSVTemplate } from '@/lib/csvUtils';
import { useCardWizard, type GuestEntry } from '@/contexts/CardWizardContext';

const newGuest = (): GuestEntry => ({
  id: crypto.randomUUID(),
  guestName: '',
  emailAddress: '',
  giftDescription: '',
  giftAmount: '',
  relationship: '',
  personalNote: '',
  send: true,
});

type QuickAddField = 'guestName' | 'emailAddress' | 'giftDescription';

export const GuestListUpload: React.FC = () => {
  const { cardData, updateCardData } = useCardWizard();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [invalidRows, setInvalidRows] = useState<{ row: number; errors: string[] }[]>([]);

  const [quickAdd, setQuickAdd] = useState({
    guestName: '',
    emailAddress: '',
    giftDescription: '',
    personalNote: '',
  });
  const [touched, setTouched] = useState<Record<QuickAddField, boolean>>({
    guestName: false,
    emailAddress: false,
    giftDescription: false,
  });

  const guests = cardData.guests || [];
  const setGuests = (next: GuestEntry[]) => updateCardData({ guests: next });
  const sendCount = guests.filter((g) => g.send).length;

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(quickAdd.emailAddress.trim());
  const errors: Record<QuickAddField, string | null> = {
    guestName: quickAdd.guestName.trim() ? null : 'Name is required',
    emailAddress: !quickAdd.emailAddress.trim()
      ? 'Email is required'
      : emailValid
        ? null
        : 'Enter a valid email',
    giftDescription: quickAdd.giftDescription.trim() ? null : 'Gift is required',
  };
  const canSubmit = !errors.guestName && !errors.emailAddress && !errors.giftDescription;

  const handleQuickAdd = () => {
    setTouched({ guestName: true, emailAddress: true, giftDescription: true });
    if (!canSubmit) return;
    const entry: GuestEntry = {
      id: crypto.randomUUID(),
      guestName: quickAdd.guestName.trim(),
      emailAddress: quickAdd.emailAddress.trim(),
      giftDescription: quickAdd.giftDescription.trim(),
      giftAmount: '',
      relationship: '',
      personalNote: quickAdd.personalNote.trim(),
      send: true,
    };
    setGuests([...guests, entry]);
    setQuickAdd({ guestName: '', emailAddress: '', giftDescription: '', personalNote: '' });
    setTouched({ guestName: false, emailAddress: false, giftDescription: false });
    toast.success(`${entry.guestName} added.`);
  };

  const handleDownloadTemplate = () => {
    generateCSVTemplate();
    toast.success('Template downloaded — fill it in while opening gifts.');
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const name = file.name.toLowerCase();
    if (!name.endsWith('.csv') && !name.endsWith('.xlsx') && !name.endsWith('.xls')) {
      toast.error('Please upload a .csv or .xlsx file');
      return;
    }

    setIsProcessing(true);
    try {
      const parsed = await parseCSVFile(file);
      const { valid, invalid } = validateGuestData(parsed);

      const merged = [
        ...guests,
        ...valid.map((g) => ({
          id: crypto.randomUUID(),
          guestName: g.guestName,
          emailAddress: g.emailAddress,
          giftDescription: g.giftDescription,
          giftAmount: g.giftAmount,
          relationship: g.relationship,
          personalNote: g.personalNote,
          send: g.send,
        })),
      ];

      setGuests(merged);
      setInvalidRows(invalid);

      if (valid.length > 0) {
        toast.success(`Added ${valid.length} guest${valid.length === 1 ? '' : 's'}.`);
      }
      if (invalid.length > 0) {
        toast.warning(`${invalid.length} row${invalid.length === 1 ? '' : 's'} need attention.`);
      }
    } catch (err: any) {
      toast.error(err?.message || 'Failed to parse CSV');
    } finally {
      setIsProcessing(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleAddRow = () => setGuests([...guests, newGuest()]);

  const handleUpdateGuest = (id: string, field: keyof GuestEntry, value: string | boolean) => {
    setGuests(guests.map((g) => (g.id === id ? { ...g, [field]: value } : g)));
  };

  const handleDeleteGuest = (id: string) => {
    setGuests(guests.filter((g) => g.id !== id));
  };

  const handleClearAll = () => {
    setGuests([]);
    setInvalidRows([]);
    toast.success('Guest list cleared.');
  };

  return (
    <Card className="bg-white/95 backdrop-blur-sm">
      <CardContent className="p-6 space-y-5">
        <div>
          <Label className="text-xl font-bold mb-1 flex items-center gap-2">
            <Users className="w-5 h-5" />
            Guest List
          </Label>
          <p className="text-sm text-muted-foreground">
            Fill in the template as you open gifts, then upload below — we'll generate a
            personalised thank-you card for each person. Review and tweak before sending.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleDownloadTemplate}
            className="flex-1 gap-2"
          >
            <Download className="w-4 h-4" />
            📥 Download Guest List Template
          </Button>

          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,.xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,text/csv"
            onChange={handleFileUpload}
            className="hidden"
          />
          <Button
            type="button"
            variant="hero"
            onClick={() => fileInputRef.current?.click()}
            disabled={isProcessing}
            className="flex-1 gap-2"
          >
            <Upload className="w-4 h-4" />
            {isProcessing ? 'Processing…' : 'Upload Filled CSV'}
          </Button>
        </div>

        {/* Quick add — single guest */}
        <div className="rounded-lg border bg-muted/30 p-4 space-y-3">
          <div className="flex items-center gap-2">
            <UserPlus className="w-4 h-4 text-muted-foreground" />
            <Label className="text-sm font-semibold">Add a guest</Label>
            <span className="text-xs text-muted-foreground">— quick entry, one at a time</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <Label htmlFor="qa-name" className="text-xs">
                Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="qa-name"
                value={quickAdd.guestName}
                onChange={(e) => setQuickAdd({ ...quickAdd, guestName: e.target.value })}
                onBlur={() => setTouched((t) => ({ ...t, guestName: true }))}
                placeholder="Jane Doe"
                className={touched.guestName && errors.guestName ? 'border-destructive focus-visible:ring-destructive' : ''}
                aria-invalid={touched.guestName && !!errors.guestName}
              />
              {touched.guestName && errors.guestName && (
                <p className="text-xs text-destructive">{errors.guestName}</p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="qa-email" className="text-xs">
                Email <span className="text-destructive">*</span>
              </Label>
              <Input
                id="qa-email"
                type="email"
                value={quickAdd.emailAddress}
                onChange={(e) => setQuickAdd({ ...quickAdd, emailAddress: e.target.value })}
                onBlur={() => setTouched((t) => ({ ...t, emailAddress: true }))}
                placeholder="jane@example.com"
                className={touched.emailAddress && errors.emailAddress ? 'border-destructive focus-visible:ring-destructive' : ''}
                aria-invalid={touched.emailAddress && !!errors.emailAddress}
              />
              {touched.emailAddress && errors.emailAddress && (
                <p className="text-xs text-destructive">{errors.emailAddress}</p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="qa-gift" className="text-xs">
                Gift <span className="text-destructive">*</span>
              </Label>
              <Input
                id="qa-gift"
                value={quickAdd.giftDescription}
                onChange={(e) => setQuickAdd({ ...quickAdd, giftDescription: e.target.value })}
                onBlur={() => setTouched((t) => ({ ...t, giftDescription: true }))}
                placeholder="Crystal vase"
                className={touched.giftDescription && errors.giftDescription ? 'border-destructive focus-visible:ring-destructive' : ''}
                aria-invalid={touched.giftDescription && !!errors.giftDescription}
              />
              {touched.giftDescription && errors.giftDescription && (
                <p className="text-xs text-destructive">{errors.giftDescription}</p>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="qa-note" className="text-xs">
              Personal note <span className="text-muted-foreground">(optional)</span>
            </Label>
            <Input
              id="qa-note"
              value={quickAdd.personalNote}
              onChange={(e) => setQuickAdd({ ...quickAdd, personalNote: e.target.value })}
              placeholder="Loved their toast at the reception"
            />
          </div>

          <div className="flex justify-end">
            <Button type="button" onClick={handleQuickAdd} className="gap-2">
              <Plus className="w-4 h-4" />
              Add guest
            </Button>
          </div>
        </div>

        {/* Validation warnings */}
        {invalidRows.length > 0 && (
          <Alert className="border-orange-200 bg-orange-50">
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">
              <strong>{invalidRows.length} row{invalidRows.length === 1 ? '' : 's'} skipped:</strong>
              <ul className="mt-2 space-y-1 text-sm">
                {invalidRows.slice(0, 3).map((r, i) => (
                  <li key={i}>Row {r.row}: {r.errors.join(', ')}</li>
                ))}
                {invalidRows.length > 3 && <li>…and {invalidRows.length - 3} more</li>}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        {/* Guest table */}
        {guests.length > 0 ? (
          <>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="font-medium">
                  {sendCount} of {guests.length} guest{guests.length === 1 ? '' : 's'} marked to send
                </span>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleClearAll}
                className="text-muted-foreground hover:text-destructive"
              >
                Clear all
              </Button>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[900px]">
                  <thead className="bg-muted/50 text-muted-foreground">
                    <tr>
                      <th className="text-left px-3 py-2 font-medium">Name</th>
                      <th className="text-left px-3 py-2 font-medium">Email</th>
                      <th className="text-left px-3 py-2 font-medium">Gift</th>
                      <th className="text-left px-3 py-2 font-medium w-24">Amount</th>
                      <th className="text-left px-3 py-2 font-medium w-32">Relationship</th>
                      <th className="text-left px-3 py-2 font-medium">Personal note</th>
                      <th className="text-center px-3 py-2 font-medium w-20">Send?</th>
                      <th className="w-10"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {guests.map((g) => (
                      <tr key={g.id} className={`border-t ${!g.send ? 'opacity-50' : ''}`}>
                        <td className="px-2 py-1.5">
                          <Input
                            value={g.guestName}
                            onChange={(e) => handleUpdateGuest(g.id, 'guestName', e.target.value)}
                            placeholder="Name"
                            className="h-8 border-0 focus-visible:ring-1 px-2"
                          />
                        </td>
                        <td className="px-2 py-1.5">
                          <Input
                            type="email"
                            value={g.emailAddress}
                            onChange={(e) => handleUpdateGuest(g.id, 'emailAddress', e.target.value)}
                            placeholder="email@example.com"
                            className="h-8 border-0 focus-visible:ring-1 px-2"
                          />
                        </td>
                        <td className="px-2 py-1.5">
                          <Input
                            value={g.giftDescription}
                            onChange={(e) => handleUpdateGuest(g.id, 'giftDescription', e.target.value)}
                            placeholder="What they gave"
                            className="h-8 border-0 focus-visible:ring-1 px-2"
                          />
                        </td>
                        <td className="px-2 py-1.5">
                          <Input
                            value={g.giftAmount}
                            onChange={(e) => handleUpdateGuest(g.id, 'giftAmount', e.target.value)}
                            placeholder="$"
                            className="h-8 border-0 focus-visible:ring-1 px-2"
                          />
                        </td>
                        <td className="px-2 py-1.5">
                          <Input
                            value={g.relationship}
                            onChange={(e) => handleUpdateGuest(g.id, 'relationship', e.target.value)}
                            placeholder="Friend"
                            className="h-8 border-0 focus-visible:ring-1 px-2"
                          />
                        </td>
                        <td className="px-2 py-1.5">
                          <Input
                            value={g.personalNote}
                            onChange={(e) => handleUpdateGuest(g.id, 'personalNote', e.target.value)}
                            placeholder="Optional"
                            className="h-8 border-0 focus-visible:ring-1 px-2"
                          />
                        </td>
                        <td className="px-2 py-1.5 text-center">
                          <Switch
                            checked={g.send}
                            onCheckedChange={(v) => handleUpdateGuest(g.id, 'send', v)}
                            aria-label="Send to this guest"
                          />
                        </td>
                        <td className="px-1 py-1.5">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteGuest(g.id)}
                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                            aria-label={`Remove ${g.guestName || 'guest'}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center text-sm text-muted-foreground">
            No guests yet. Download the template and upload your filled CSV, or add guests
            manually below.
          </div>
        )}

        <Button
          type="button"
          variant="outline"
          onClick={handleAddRow}
          className="w-full gap-2"
        >
          <Plus className="w-4 h-4" />
          Add guest manually
        </Button>
      </CardContent>
    </Card>
  );
};
