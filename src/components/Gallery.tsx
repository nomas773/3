import React, { useState, useEffect, useRef } from 'react';
import {
  Heart,
  MessageCircle,
  Plus,
  X,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Send,
  Edit3,
  Check,
  Upload,
  Camera,
  Image as ImageIcon,
} from 'lucide-react';
import { GalleryPhoto, PhotoComment } from '../types/wedding';

interface GalleryProps {
  photos: GalleryPhoto[];
  onUpdatePhotos: (photos: GalleryPhoto[]) => void;
}

// Resilient Image Component with automatic fallback support
const GalleryImage: React.FC<{
  src: string;
  fallback?: string;
  alt: string;
  className?: string;
  onUploadClick?: (e: React.MouseEvent) => void;
}> = ({ src, fallback, alt, className, onUploadClick }) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setCurrentSrc(src);
    setHasError(false);
  }, [src]);

  if (hasError && !fallback) {
    return (
      <div
        onClick={onUploadClick}
        className="w-full h-full min-h-[220px] flex flex-col items-center justify-center bg-gradient-to-b from-white to-pink-50 p-6 text-center text-pink-600 border-2 border-dashed border-pink-300 hover:border-pink-500 transition-all cursor-pointer"
      >
        <Camera className="w-10 h-10 mb-2.5 text-pink-500 animate-pulse" />
        <span className="text-sm font-semibold text-pink-800">صورة أحمد وسما الأصلية</span>
        <span className="text-xs text-[#7a4e63] mt-1.5 max-w-xs leading-relaxed">
          انقر هنا لاختيار وتثبيت الصورة الأصلية من ألبوم هاتفك مباشرة
        </span>
      </div>
    );
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      referrerPolicy="no-referrer"
      className={className}
      onError={() => {
        if (!hasError && fallback && currentSrc !== fallback) {
          setCurrentSrc(fallback);
          setHasError(true);
        } else {
          setHasError(true);
        }
      }}
    />
  );
};

export const Gallery: React.FC<GalleryProps> = ({ photos, onUpdatePhotos }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const [isAddPhotoOpen, setIsAddPhotoOpen] = useState(false);
  const [editingCaptionPhotoId, setEditingCaptionPhotoId] = useState<string | null>(null);
  const [captionDraft, setCaptionDraft] = useState('');
  const [newCommentAuthor, setNewCommentAuthor] = useState('');
  const [newCommentText, setNewCommentText] = useState('');

  // Target photo ID when user clicks "Replace / Upload Photo"
  const [replacingPhotoId, setReplacingPhotoId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form state for adding new photo
  const [newPhotoTitle, setNewPhotoTitle] = useState('');
  const [newPhotoCaption, setNewPhotoCaption] = useState('');
  const [newPhotoCategory, setNewPhotoCategory] = useState<GalleryPhoto['category']>('engagement');
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [newPhotoDate, setNewPhotoDate] = useState('');
  const [newPhotoPreview, setNewPhotoPreview] = useState<string | null>(null);

  const filteredPhotos =
    selectedCategory === 'all'
      ? photos
      : photos.filter((p) => p.category === selectedCategory);

  const activePhoto = activePhotoIndex !== null ? filteredPhotos[activePhotoIndex] : null;

  const handleLike = (photoId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const updated = photos.map((p) =>
      p.id === photoId ? { ...p, likes: p.likes + 1 } : p
    );
    onUpdatePhotos(updated);
  };

  const handleStartEditCaption = (photo: GalleryPhoto, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setEditingCaptionPhotoId(photo.id);
    setCaptionDraft(photo.caption);
  };

  const handleSaveCaption = (photoId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!captionDraft.trim()) return;
    const updated = photos.map((p) =>
      p.id === photoId ? { ...p, caption: captionDraft.trim() } : p
    );
    onUpdatePhotos(updated);
    setEditingCaptionPhotoId(null);
  };

  const handleAddComment = (photoId: string) => {
    if (!newCommentAuthor.trim() || !newCommentText.trim()) return;

    const newComment: PhotoComment = {
      id: `c_${Date.now()}`,
      authorName: newCommentAuthor.trim(),
      text: newCommentText.trim(),
      timestamp: 'Just now',
    };

    const updated = photos.map((p) =>
      p.id === photoId
        ? { ...p, comments: [newComment, ...(p.comments || [])] }
        : p
    );

    onUpdatePhotos(updated);
    setNewCommentText('');
  };

  // Trigger file selection for an existing photo
  const handleTriggerUpload = (photoId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setReplacingPhotoId(photoId);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  // Process chosen file for existing photo
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !replacingPhotoId) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        const updated = photos.map((p) =>
          p.id === replacingPhotoId ? { ...p, imageUrl: dataUrl } : p
        );
        onUpdatePhotos(updated);
      }
    };
    reader.readAsDataURL(file);
    setReplacingPhotoId(null);
  };

  // File upload for new photo modal
  const handleNewPhotoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        setNewPhotoPreview(dataUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddNewPhotoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhotoTitle.trim() || !newPhotoCaption.trim()) return;

    const finalImage =
      newPhotoPreview ||
      newPhotoUrl.trim() ||
      `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%"><rect width="800" height="600" fill="%231a1b26"/><circle cx="400" cy="270" r="140" fill="%2325283b" stroke="%23d4af37" stroke-width="2"/><text x="400" y="270" font-family="serif" font-size="32" fill="%23faeed7" text-anchor="middle">Ahmed &amp; Sama</text><text x="400" y="320" font-family="sans-serif" font-size="16" fill="%23c59d5f" text-anchor="middle">${encodeURIComponent(newPhotoTitle)}</text></svg>`;

    const newPhoto: GalleryPhoto = {
      id: `photo_${Date.now()}`,
      title: newPhotoTitle.trim(),
      caption: newPhotoCaption.trim(),
      category: newPhotoCategory,
      imageUrl: finalImage,
      fallbackUrl: finalImage,
      date: newPhotoDate.trim() || 'October 2026',
      likes: 1,
      comments: [],
    };

    onUpdatePhotos([newPhoto, ...photos]);
    setIsAddPhotoOpen(false);
    setNewPhotoTitle('');
    setNewPhotoCaption('');
    setNewPhotoUrl('');
    setNewPhotoPreview(null);
    setNewPhotoDate('');
  };

  const nextPhoto = () => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((prev) => ((prev! + 1) % filteredPhotos.length));
  };

  const prevPhoto = () => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((prev) =>
      prev! === 0 ? filteredPhotos.length - 1 : prev! - 1
    );
  };

  return (
    <section id="gallery" className="py-20 px-4 bg-gradient-to-b from-white via-[#fff8fa] to-white relative">
      {/* Hidden file input for replacing photos */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-50 border border-pink-200 text-xs text-pink-600 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="uppercase tracking-widest font-semibold">Roses &amp; Endless Love</span>
            </div>
            <h2 className="font-calligraphy text-4xl sm:text-5xl font-bold text-pink-gradient">
              Ahmed &amp; Sama&apos;s Photo Gallery
            </h2>
            <p className="text-sm sm:text-base text-[#7a4e63] mt-2 max-w-xl">
              A celebration of blooming roses, pure love, and cherished engagement moments in Faiyum. Browse, like, share wishes, or upload new memorable pictures.
            </p>
          </div>

          {/* Add Photo Button */}
          <button
            type="button"
            onClick={() => setIsAddPhotoOpen(true)}
            className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 rounded-xl hover:brightness-105 active:scale-95 transition-all flex items-center gap-2 shadow-md shadow-pink-200/60 whitespace-nowrap cursor-pointer self-start md:self-end"
          >
            <Plus className="w-4 h-4" />
            <span>Add / Upload Photo</span>
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {[
            { id: 'all', label: 'All Photos' },
            { id: 'engagement', label: 'Engagement Moments' },
            { id: 'photoshoot', label: 'Photoshoot' },
            { id: 'family', label: 'Family & Loved Ones' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === tab.id
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold shadow-md shadow-pink-200/60'
                  : 'bg-white text-[#7a4e63] hover:text-pink-600 hover:bg-pink-50 border border-pink-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo, index) => {
            const isEditingThisCaption = editingCaptionPhotoId === photo.id;
            return (
              <div
                key={photo.id}
                onClick={() => setActivePhotoIndex(index)}
                className="group relative rounded-2xl bg-white border border-pink-200 overflow-hidden shadow-md shadow-pink-100/50 hover:border-pink-400 hover:shadow-xl hover:shadow-pink-100/70 transition-all duration-300 flex flex-col cursor-pointer"
              >
                {/* Photo Image Frame */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-pink-50">
                  <GalleryImage
                    src={photo.imageUrl}
                    fallback={photo.fallbackUrl}
                    alt={photo.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onUploadClick={(e) => handleTriggerUpload(photo.id, e)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 pointer-events-none" />

                  {/* Metadata and Actions */}
                  <div className="absolute top-3 right-3 left-3 flex items-center justify-between pointer-events-none">
                    <span className="text-[11px] font-medium text-[#3d1324] bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-md border border-pink-200 shadow-xs">
                      {photo.date}
                    </span>

                    <div className="flex items-center gap-1.5">
                      {/* Direct Upload / Replace Photo Button */}
                      <button
                        type="button"
                        onClick={(e) => handleTriggerUpload(photo.id, e)}
                        className="pointer-events-auto p-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-pink-200 text-pink-600 hover:bg-pink-500 hover:text-white transition-all flex items-center gap-1 text-[11px] cursor-pointer shadow-xs"
                        title="Upload / Replace Photo from device"
                      >
                        <Camera className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline font-sans font-medium">Upload</span>
                      </button>

                      <button
                        type="button"
                        onClick={(e) => handleLike(photo.id, e)}
                        className="pointer-events-auto p-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-pink-200 text-rose-500 hover:bg-rose-50 transition-colors flex items-center gap-1 text-xs cursor-pointer shadow-xs"
                        title="Like photo"
                      >
                        <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />
                        <span className="tabular-nums font-mono text-[11px] text-[#3d1324] font-medium">{photo.likes}</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Caption & Content */}
                <div className="p-5 flex-1 flex flex-col justify-between bg-white">
                  <div>
                    <h3 className="font-calligraphy text-xl font-bold text-[#3d1324] mb-2 group-hover:text-pink-600 transition-colors">
                      {photo.title}
                    </h3>

                    {/* Editable / Viewable Caption */}
                    {isEditingThisCaption ? (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="space-y-2 mt-2"
                      >
                        <textarea
                          value={captionDraft}
                          onChange={(e) => setCaptionDraft(e.target.value)}
                          rows={3}
                          className="w-full text-xs p-2.5 rounded-lg bg-pink-50/50 border border-pink-300 text-[#3d1324] focus:outline-none focus:ring-1 focus:ring-pink-500"
                          placeholder="Type photo caption..."
                        />
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={(e) => handleSaveCaption(photo.id, e)}
                            className="px-3 py-1 bg-pink-500 text-white text-xs font-semibold rounded-md flex items-center gap-1 cursor-pointer"
                          >
                            <Check className="w-3 h-3" />
                            <span>Save</span>
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingCaptionPhotoId(null);
                            }}
                            className="px-2.5 py-1 bg-pink-100 text-[#7a4e63] text-xs rounded-md cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-xs text-[#7a4e63] leading-relaxed line-clamp-3">
                        {photo.caption}
                      </p>
                    )}
                  </div>

                  {/* Card Footer */}
                  <div className="mt-4 pt-3 border-t border-pink-100 flex items-center justify-between text-xs text-[#8a5770]">
                    <div className="flex items-center gap-1.5 text-pink-600 font-medium">
                      <MessageCircle className="w-3.5 h-3.5 text-pink-500" />
                      <span className="tabular-nums font-mono">
                        {photo.comments?.length || 0} comments
                      </span>
                    </div>

                    {!isEditingThisCaption && (
                      <button
                        type="button"
                        onClick={(e) => handleStartEditCaption(photo, e)}
                        className="flex items-center gap-1 text-[11px] text-pink-600 hover:text-pink-700 transition-colors p-1 cursor-pointer font-medium"
                        title="Edit photo caption"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>Edit Caption</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Lightbox Modal */}
        {activePhoto && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-pink-950/80 backdrop-blur-md"
            onClick={() => setActivePhotoIndex(null)}
          >
            <div
              className="relative w-full max-w-5xl bg-white border border-pink-200 rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row max-h-[92vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setActivePhotoIndex(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 text-[#3d1324] hover:text-pink-600 hover:bg-white transition-colors cursor-pointer shadow-md"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Photo View */}
              <div className="relative flex-1 bg-[#200c17] flex items-center justify-center min-h-[300px] lg:min-h-[500px] overflow-hidden group">
                <GalleryImage
                  src={activePhoto.imageUrl}
                  fallback={activePhoto.fallbackUrl}
                  alt={activePhoto.title}
                  className="max-h-[75vh] w-auto max-w-full object-contain"
                  onUploadClick={(e) => handleTriggerUpload(activePhoto.id, e)}
                />

                <button
                  type="button"
                  onClick={prevPhoto}
                  className="absolute left-4 p-3 rounded-full bg-black/60 hover:bg-black/80 text-white transition-all cursor-pointer"
                  aria-label="Previous Photo"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  type="button"
                  onClick={nextPhoto}
                  className="absolute right-4 p-3 rounded-full bg-black/60 hover:bg-black/80 text-white transition-all cursor-pointer"
                  aria-label="Next Photo"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Sidebar */}
              <div className="w-full lg:w-96 p-6 bg-[#fffbfd] border-t lg:border-t-0 lg:border-l border-pink-100 flex flex-col justify-between overflow-y-auto">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs text-pink-600 font-semibold">
                      {activePhoto.date}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleTriggerUpload(activePhoto.id)}
                        className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-xs text-pink-700 hover:bg-pink-200 transition-colors cursor-pointer"
                        title="Upload/Change Photo"
                      >
                        <Camera className="w-3.5 h-3.5" />
                        <span>Change</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleLike(activePhoto.id)}
                        className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-xs text-rose-500 hover:bg-rose-100 transition-colors cursor-pointer"
                      >
                        <Heart className="w-3.5 h-3.5 fill-current" />
                        <span className="tabular-nums font-mono">{activePhoto.likes}</span>
                      </button>
                    </div>
                  </div>

                  <h3 className="font-calligraphy text-2xl font-bold text-[#3d1324] mb-3">
                    {activePhoto.title}
                  </h3>

                  <div className="p-3.5 rounded-xl bg-white border border-pink-100 shadow-xs mb-6">
                    <p className="text-xs text-pink-600 mb-1 font-semibold uppercase tracking-wider">Caption:</p>
                    <p className="text-xs sm:text-sm text-[#5a2139] leading-relaxed">
                      {activePhoto.caption}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-pink-600 mb-3 flex items-center gap-1.5 uppercase tracking-wider">
                      <MessageCircle className="w-4 h-4" />
                      <span>Comments ({activePhoto.comments?.length || 0})</span>
                    </h4>

                    <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                      {activePhoto.comments && activePhoto.comments.length > 0 ? (
                        activePhoto.comments.map((c) => (
                          <div
                            key={c.id}
                            className="p-3 rounded-xl bg-white border border-pink-100 shadow-xs text-xs"
                          >
                            <div className="flex items-center justify-between text-pink-700 font-semibold mb-1">
                              <span>{c.authorName}</span>
                              <span className="text-[10px] text-[#8a5770] font-normal">{c.timestamp}</span>
                            </div>
                            <p className="text-[#5a2139] leading-relaxed">{c.text}</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-[#8a5770] text-center py-4">
                          Be the first to leave a warm comment for Ahmed &amp; Sama on this photo!
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Add Comment Input */}
                <div className="mt-6 pt-4 border-t border-pink-100">
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Your Name..."
                      value={newCommentAuthor}
                      onChange={(e) => setNewCommentAuthor(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-pink-200 text-[#3d1324] placeholder-pink-300 focus:outline-none focus:border-pink-500"
                    />
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Write a congratulatory comment..."
                        value={newCommentText}
                        onChange={(e) => setNewCommentText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleAddComment(activePhoto.id);
                        }}
                        className="flex-1 px-3 py-2 text-xs rounded-xl bg-white border border-pink-200 text-[#3d1324] placeholder-pink-300 focus:outline-none focus:border-pink-500"
                      />
                      <button
                        type="button"
                        onClick={() => handleAddComment(activePhoto.id)}
                        className="px-3 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl hover:brightness-105 active:scale-95 transition-all text-xs font-semibold flex items-center justify-center cursor-pointer shadow-sm shadow-pink-200"
                        title="Post Comment"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Add / Upload New Photo */}
        {isAddPhotoOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="relative w-full max-w-lg bg-white border border-pink-200 rounded-3xl p-6 sm:p-8 shadow-2xl">
              <button
                type="button"
                onClick={() => setIsAddPhotoOpen(false)}
                className="absolute top-4 right-4 text-[#7a4e63] hover:text-pink-600 cursor-pointer p-1"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="font-calligraphy text-2xl font-bold text-pink-gradient mb-2">
                Upload Photo for Ahmed &amp; Sama
              </h3>
              <p className="text-xs text-[#7a4e63] mb-6">
                Choose a photo directly from your phone or computer, or enter an image link.
              </p>

              <form onSubmit={handleAddNewPhotoSubmit} className="space-y-4">
                {/* File Upload Box */}
                <div>
                  <label className="block text-xs font-semibold text-[#3d1324] mb-2">
                    Choose Photo File (من جهازك)
                  </label>
                  <label className="flex flex-col items-center justify-center w-full h-32 px-4 border-2 border-dashed border-pink-300 rounded-2xl cursor-pointer bg-pink-50/50 hover:bg-pink-50 hover:border-pink-500 transition-all">
                    {newPhotoPreview ? (
                      <div className="flex items-center gap-3">
                        <img
                          src={newPhotoPreview}
                          alt="Selected preview"
                          className="h-24 w-24 object-cover rounded-xl border border-pink-300"
                        />
                        <div className="text-left text-xs text-[#3d1324]">
                          <p className="font-semibold text-emerald-600">Photo selected!</p>
                          <p className="text-[11px] text-[#7a4e63] mt-1">Tap to select a different photo</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                        <Upload className="w-8 h-8 text-pink-500 mb-2" />
                        <p className="text-xs text-[#3d1324] font-semibold">
                          Click to select photo from device
                        </p>
                        <p className="text-[11px] text-[#8a5770] mt-1">
                          PNG, JPG, or WEBP from camera or gallery
                        </p>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleNewPhotoFileChange}
                      className="hidden"
                    />
                  </label>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#3d1324] mb-1">
                    Photo Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ahmed & Sama in Faiyum"
                    value={newPhotoTitle}
                    onChange={(e) => setNewPhotoTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-pink-200 text-xs text-[#3d1324] placeholder-pink-300 focus:outline-none focus:border-pink-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#3d1324] mb-1">
                    Caption / Description *
                  </label>
                  <textarea
                    required
                    rows={2}
                    placeholder="Share the story and joy behind this picture..."
                    value={newPhotoCaption}
                    onChange={(e) => setNewPhotoCaption(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-pink-200 text-xs text-[#3d1324] placeholder-pink-300 focus:outline-none focus:border-pink-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#3d1324] mb-1">
                      Category
                    </label>
                    <select
                      value={newPhotoCategory}
                      onChange={(e) =>
                        setNewPhotoCategory(e.target.value as GalleryPhoto['category'])
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-pink-200 text-xs text-[#3d1324] focus:outline-none focus:border-pink-500"
                    >
                      <option value="engagement">Engagement Moments</option>
                      <option value="photoshoot">Photoshoot</option>
                      <option value="family">Family &amp; Friends</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#3d1324] mb-1">
                      Date
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. October 2, 2026"
                      value={newPhotoDate}
                      onChange={(e) => setNewPhotoDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-pink-200 text-xs text-[#3d1324] placeholder-pink-300 focus:outline-none focus:border-pink-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#3d1324] mb-1">
                    Or Image URL (اختياري)
                  </label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={newPhotoUrl}
                    onChange={(e) => setNewPhotoUrl(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-pink-200 text-xs text-[#3d1324] placeholder-pink-300 focus:outline-none focus:border-pink-500"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddPhotoOpen(false);
                      setNewPhotoPreview(null);
                    }}
                    className="px-4 py-2 text-xs font-medium text-[#7a4e63] hover:text-pink-600 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 rounded-xl hover:brightness-105 active:scale-95 transition-all shadow-md shadow-pink-200/60 cursor-pointer"
                  >
                    Add to Gallery
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
