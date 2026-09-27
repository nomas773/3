import React, { useState } from 'react';
import { X, Save, Download, Users, Sliders, Check } from 'lucide-react';
import { WeddingData, RsvpEntry } from '../types/wedding';

interface SettingsModalProps {
  wedding: WeddingData;
  rsvpList?: RsvpEntry[];
  isOpen: boolean;
  onClose: () => void;
  onSaveWedding: (data: WeddingData) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  wedding,
  rsvpList = [],
  isOpen,
  onClose,
  onSaveWedding,
}) => {
  const [activeTab, setActiveTab] = useState<'details' | 'guests'>('details');
  const [formData, setFormData] = useState<WeddingData>({ ...wedding });
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveWedding(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const exportRsvpToCsv = () => {
    const headers = ['Full Name', 'Phone', 'Attendance Status', 'Seats', 'Notes', 'Date Registered'];
    const rows = rsvpList.map((r) => [
      `"${r.name.replace(/"/g, '""')}"`,
      `"${r.phone}"`,
      r.attending ? 'Confirmed' : 'Declined',
      r.guestsCount,
      `"${(r.notes || '').replace(/"/g, '""')}"`,
      `"${r.submittedAt}"`,
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((row) => row.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `guests_engagement_${wedding.groomName}_and_${wedding.brideName}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-3xl bg-[#141624] border border-[#d4af37]/40 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#d4af37]/20 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-[#d4af37]" />
            <h3 className="font-calligraphy text-2xl font-bold text-[#faedd0]">
              Event Management &amp; Customization
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#a89e8e] hover:text-[#faedd0] hover:bg-[#202336] transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 mb-6">
          <button
            type="button"
            onClick={() => setActiveTab('details')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'details'
                ? 'bg-gradient-to-r from-[#d4af37] to-[#aa771c] text-[#0c0d12]'
                : 'bg-[#1b1e2e] text-[#a89e8e] hover:text-[#faedd0]'
            }`}
          >
            Edit Event Details
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('guests')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'guests'
                ? 'bg-gradient-to-r from-[#d4af37] to-[#aa771c] text-[#0c0d12]'
                : 'bg-[#1b1e2e] text-[#a89e8e] hover:text-[#faedd0]'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Guest List ({rsvpList.length})</span>
          </button>
        </div>

        {/* Tab 1: Edit Details */}
        {activeTab === 'details' && (
          <form onSubmit={handleSave} className="space-y-4 overflow-y-auto pr-1 flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#d1c7b7] mb-1">Groom Name</label>
                <input
                  type="text"
                  value={formData.groomName}
                  onChange={(e) => setFormData({ ...formData, groomName: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-[#0e1017] border border-[#d4af37]/30 text-[#faedd0]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#d1c7b7] mb-1">Bride Name</label>
                <input
                  type="text"
                  value={formData.brideName}
                  onChange={(e) => setFormData({ ...formData, brideName: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-[#0e1017] border border-[#d4af37]/30 text-[#faedd0]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#d1c7b7] mb-1">Groom&apos;s Family</label>
                <input
                  type="text"
                  value={formData.groomFamily}
                  onChange={(e) => setFormData({ ...formData, groomFamily: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-[#0e1017] border border-[#d4af37]/30 text-[#faedd0]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#d1c7b7] mb-1">Bride&apos;s Family</label>
                <input
                  type="text"
                  value={formData.brideFamily}
                  onChange={(e) => setFormData({ ...formData, brideFamily: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-[#0e1017] border border-[#d4af37]/30 text-[#faedd0]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#d1c7b7] mb-1">Date Display</label>
                <input
                  type="text"
                  value={formData.dateFormattedArabic}
                  onChange={(e) => setFormData({ ...formData, dateFormattedArabic: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-[#0e1017] border border-[#d4af37]/30 text-[#faedd0]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#d1c7b7] mb-1">Venue Name</label>
                <input
                  type="text"
                  value={formData.venueName}
                  onChange={(e) => setFormData({ ...formData, venueName: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-[#0e1017] border border-[#d4af37]/30 text-[#faedd0]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#d1c7b7] mb-1">Hall / Room</label>
                <input
                  type="text"
                  value={formData.hallName}
                  onChange={(e) => setFormData({ ...formData, hallName: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-[#0e1017] border border-[#d4af37]/30 text-[#faedd0]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#d1c7b7] mb-1">Start Time</label>
                <input
                  type="text"
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-[#0e1017] border border-[#d4af37]/30 text-[#faedd0]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#d1c7b7] mb-1">Address &amp; Location Note</label>
              <input
                type="text"
                value={formData.venueAddress}
                onChange={(e) => setFormData({ ...formData, venueAddress: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl bg-[#0e1017] border border-[#d4af37]/30 text-[#faedd0]"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#d4af37]/20">
              {saveSuccess && (
                <span className="text-xs text-emerald-400 flex items-center gap-1 font-medium">
                  <Check className="w-4 h-4" />
                  Modifications saved successfully!
                </span>
              )}
              <button
                type="submit"
                className="px-5 py-2.5 bg-gradient-to-r from-[#d4af37] to-[#aa771c] text-[#0c0d12] text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer hover:brightness-110"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </form>
        )}

        {/* Tab 2: Guests List & Export */}
        {activeTab === 'guests' && (
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs text-[#a89e8e]">
                Total Guests: {rsvpList.length} (Confirmed Seats:{' '}
                {rsvpList.filter((r) => r.attending).reduce((a, b) => a + b.guestsCount, 0)})
              </p>
              <button
                type="button"
                onClick={exportRsvpToCsv}
                className="px-3.5 py-1.5 bg-[#1e2235] hover:bg-[#282d46] text-[#faedd0] border border-[#d4af37]/30 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Export CSV / Excel</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto rounded-xl border border-[#d4af37]/15 bg-[#0e1018]">
              {rsvpList.length === 0 ? (
                <p className="text-xs text-[#6b7280] text-center py-12">
                  No RSVP submissions yet. Share the invitation link to receive confirmations!
                </p>
              ) : (
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#181a28] text-[#d4af37] border-b border-[#d4af37]/15">
                    <tr>
                      <th className="p-3">Guest Name</th>
                      <th className="p-3">Phone</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Seats</th>
                      <th className="p-3">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#d4af37]/10 text-[#d1c7b7]">
                    {rsvpList.map((entry) => (
                      <tr key={entry.id} className="hover:bg-[#161826]">
                        <td className="p-3 font-semibold text-[#faedd0]">{entry.name}</td>
                        <td className="p-3 font-mono">{entry.phone}</td>
                        <td className="p-3">
                          {entry.attending ? (
                            <span className="text-emerald-400 font-medium">Attending</span>
                          ) : (
                            <span className="text-rose-400 font-medium">Declined</span>
                          )}
                        </td>
                        <td className="p-3 font-mono font-bold text-[#d4af37]">{entry.guestsCount}</td>
                        <td className="p-3 text-[11px] text-[#8c8272] max-w-xs truncate">{entry.notes || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
