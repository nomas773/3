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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-pink-950/70 backdrop-blur-md">
      <div className="relative w-full max-w-3xl bg-white border border-pink-200 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-pink-100 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-pink-600" />
            <h3 className="font-calligraphy text-2xl font-bold text-[#3d1324]">
              Event Management &amp; Customization
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#7a4e63] hover:text-pink-600 hover:bg-pink-50 transition-colors cursor-pointer"
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
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-sm shadow-pink-200'
                : 'bg-pink-50 text-[#7a4e63] hover:text-pink-600'
            }`}
          >
            Edit Event Details
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('guests')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'guests'
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-sm shadow-pink-200'
                : 'bg-pink-50 text-[#7a4e63] hover:text-pink-600'
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
                <label className="block text-xs font-semibold text-[#3d1324] mb-1">Groom Name</label>
                <input
                  type="text"
                  value={formData.groomName}
                  onChange={(e) => setFormData({ ...formData, groomName: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-pink-50/40 border border-pink-200 text-[#3d1324] focus:outline-none focus:border-pink-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3d1324] mb-1">Bride Name</label>
                <input
                  type="text"
                  value={formData.brideName}
                  onChange={(e) => setFormData({ ...formData, brideName: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-pink-50/40 border border-pink-200 text-[#3d1324] focus:outline-none focus:border-pink-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3d1324] mb-1">Groom&apos;s Family</label>
                <input
                  type="text"
                  value={formData.groomFamily}
                  onChange={(e) => setFormData({ ...formData, groomFamily: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-pink-50/40 border border-pink-200 text-[#3d1324] focus:outline-none focus:border-pink-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3d1324] mb-1">Bride&apos;s Family</label>
                <input
                  type="text"
                  value={formData.brideFamily}
                  onChange={(e) => setFormData({ ...formData, brideFamily: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-pink-50/40 border border-pink-200 text-[#3d1324] focus:outline-none focus:border-pink-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3d1324] mb-1">Date Display</label>
                <input
                  type="text"
                  value={formData.dateFormattedArabic}
                  onChange={(e) => setFormData({ ...formData, dateFormattedArabic: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-pink-50/40 border border-pink-200 text-[#3d1324] focus:outline-none focus:border-pink-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3d1324] mb-1">Venue Name</label>
                <input
                  type="text"
                  value={formData.venueName}
                  onChange={(e) => setFormData({ ...formData, venueName: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-pink-50/40 border border-pink-200 text-[#3d1324] focus:outline-none focus:border-pink-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3d1324] mb-1">Hall / Room</label>
                <input
                  type="text"
                  value={formData.hallName}
                  onChange={(e) => setFormData({ ...formData, hallName: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-pink-50/40 border border-pink-200 text-[#3d1324] focus:outline-none focus:border-pink-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3d1324] mb-1">Start Time</label>
                <input
                  type="text"
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-pink-50/40 border border-pink-200 text-[#3d1324] focus:outline-none focus:border-pink-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#3d1324] mb-1">Address &amp; Location Note</label>
              <input
                type="text"
                value={formData.venueAddress}
                onChange={(e) => setFormData({ ...formData, venueAddress: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl bg-pink-50/40 border border-pink-200 text-[#3d1324] focus:outline-none focus:border-pink-500"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-pink-100">
              {saveSuccess && (
                <span className="text-xs text-emerald-600 flex items-center gap-1 font-semibold">
                  <Check className="w-4 h-4" />
                  Modifications saved successfully!
                </span>
              )}
              <button
                type="submit"
                className="px-5 py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer hover:brightness-105 shadow-md shadow-pink-200"
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
              <p className="text-xs text-[#7a4e63]">
                Total Guests: {rsvpList.length} (Confirmed Seats:{' '}
                {rsvpList.filter((r) => r.attending).reduce((a, b) => a + b.guestsCount, 0)})
              </p>
              <button
                type="button"
                onClick={exportRsvpToCsv}
                className="px-3.5 py-1.5 bg-pink-50 hover:bg-pink-100 text-[#3d1324] border border-pink-200 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-pink-600" />
                <span>Export CSV / Excel</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto rounded-xl border border-pink-200 bg-pink-50/20">
              {rsvpList.length === 0 ? (
                <p className="text-xs text-[#8a5770] text-center py-12">
                  No RSVP submissions yet. Share the invitation link to receive confirmations!
                </p>
              ) : (
                <table className="w-full text-left text-xs">
                  <thead className="bg-pink-50 text-pink-700 border-b border-pink-200">
                    <tr>
                      <th className="p-3">Guest Name</th>
                      <th className="p-3">Phone</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Seats</th>
                      <th className="p-3">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-pink-100 text-[#4a1528]">
                    {rsvpList.map((entry) => (
                      <tr key={entry.id} className="hover:bg-pink-50/50">
                        <td className="p-3 font-semibold text-[#3d1324]">{entry.name}</td>
                        <td className="p-3 font-mono">{entry.phone}</td>
                        <td className="p-3">
                          {entry.attending ? (
                            <span className="text-emerald-600 font-medium">Attending</span>
                          ) : (
                            <span className="text-rose-500 font-medium">Declined</span>
                          )}
                        </td>
                        <td className="p-3 font-mono font-bold text-pink-600">{entry.guestsCount}</td>
                        <td className="p-3 text-[11px] text-[#7a4e63] max-w-xs truncate">{entry.notes || '-'}</td>
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
