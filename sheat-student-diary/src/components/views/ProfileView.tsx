import React, { useState, useRef } from 'react';
import { StudentProfile, UserAccount } from '../../types';
import {
  User,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Edit3,
  Save,
  CheckCircle2,
  Camera,
  Upload,
  Sparkles,
  RotateCcw,
  Users,
  Calendar,
  Heart,
  BookOpen,
  X,
  ShieldCheck,
  IdCard,
  Copy,
  Check,
  LogOut,
  KeyRound,
  Lock
} from 'lucide-react';

interface ProfileViewProps {
  student: StudentProfile;
  currentUser?: UserAccount | null;
  onUpdateProfile: (updated: StudentProfile) => void;
  onLogout: () => void;
}

const PRESET_AVATARS = [
  {
    name: 'Student (Default)',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'
  },
  {
    name: 'Male Scholar 1',
    url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400'
  },
  {
    name: 'Female Scholar 1',
    url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400'
  },
  {
    name: 'Male Scholar 2',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400'
  },
  {
    name: 'Female Scholar 2',
    url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400'
  },
  {
    name: 'Tech Enthusiast',
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400'
  }
];

export const ProfileView: React.FC<ProfileViewProps> = ({
  student,
  currentUser,
  onUpdateProfile,
  onLogout
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<StudentProfile>(student);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [showImagePickerModal, setShowImagePickerModal] = useState(false);
  const [customUrlInput, setCustomUrlInput] = useState('');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Sync form data if student prop updates externally
  React.useEffect(() => {
    setFormData(student);
  }, [student]);

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(formData);
    setIsEditing(false);
    setShowImagePickerModal(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3500);
  };

  const handleCancelEdit = () => {
    setFormData(student);
    setIsEditing(false);
    setShowImagePickerModal(false);
  };

  // Image Upload Processing
  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (PNG, JPG, JPEG, WEBP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        const newAvatarUrl = e.target.result as string;
        setFormData((prev) => ({ ...prev, avatarUrl: newAvatarUrl }));
        setShowImagePickerModal(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFileUpload(files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleApplyCustomUrl = () => {
    if (!customUrlInput.trim()) return;
    setFormData((prev) => ({ ...prev, avatarUrl: customUrlInput.trim() }));
    setCustomUrlInput('');
    setShowImagePickerModal(false);
  };

  const handleSelectPreset = (url: string) => {
    setFormData((prev) => ({ ...prev, avatarUrl: url }));
    setShowImagePickerModal(false);
  };

  return (
    <div className="pb-24 p-4 space-y-4">
      {/* Hidden File Input for Native Image Picker */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        accept="image/*"
        className="hidden"
      />

      {/* Top Header & Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-serif font-bold text-[#2D2926] tracking-tight">Student Profile</h2>
          <p className="text-xs text-[#8C8885]">Personal, Academic & Contact Record</p>
        </div>
        {!isEditing ? (
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-[#435585] hover:bg-[#354368] text-white font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all shadow-2xs"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Profile</span>
            </button>
            <button
              onClick={() => setShowLogoutConfirm(true)}
              className="bg-[#F2F0ED] hover:bg-[#E8E4E1] text-[#2D2926] font-bold text-xs px-3 py-2 rounded-xl flex items-center gap-1 transition-colors"
              title="Sign Out / Switch Account"
            >
              <LogOut className="w-3.5 h-3.5 text-rose-600" />
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <button
              onClick={handleCancelEdit}
              type="button"
              className="bg-[#F2F0ED] hover:bg-[#E8E4E1] text-[#2D2926] font-bold text-xs px-3 py-2 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              type="button"
              className="bg-[#435585] hover:bg-[#354368] text-white font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all shadow-2xs"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save</span>
            </button>
          </div>
        )}
      </div>

      {/* Success Notification */}
      {savedSuccess && (
        <div className="bg-[#EDF1F7] border border-[#435585]/30 text-[#435585] text-xs p-3.5 rounded-2xl flex items-center space-x-2.5 shadow-2xs animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-[#435585] shrink-0" />
          <div>
            <p className="font-bold">Profile updated successfully!</p>
            <p className="text-[11px] text-[#435585]/80">
              Changes are saved in your Student Cloud Diary and synced across all modules.
            </p>
          </div>
        </div>
      )}

      {/* Student Hero Header Card */}
      <div className="bg-[#435585] text-white p-5 rounded-3xl border border-[#E8E4E1] shadow-sm relative overflow-hidden">
        {/* Background decorative watermark */}
        <div className="absolute -right-6 -bottom-6 text-white/5 font-serif font-black text-9xl pointer-events-none select-none">
          S
        </div>

        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Avatar with Camera Button */}
          <div className="relative group mb-3">
            <div className="w-24 h-24 rounded-full overflow-hidden border-3 border-white/90 shadow-md bg-white">
              <img
                src={formData.avatarUrl || student.avatarUrl}
                alt={formData.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Edit / Change Photo Button */}
            <button
              type="button"
              onClick={() => setShowImagePickerModal(true)}
              className="absolute bottom-0 right-0 bg-[#2D2926] hover:bg-[#1f1c1a] text-white p-2 rounded-full border-2 border-white shadow-md transition-transform hover:scale-105 flex items-center justify-center cursor-pointer"
              title="Change Profile Photo"
            >
              <Camera className="w-4 h-4 text-[#FCFAF7]" />
            </button>
          </div>

          <div className="space-y-0.5 max-w-xs">
            <div className="flex items-center justify-center gap-1.5">
              <h2 className="text-lg font-bold uppercase tracking-tight text-white">
                {formData.name || 'Student Name'}
              </h2>
              <span title="Verified Student">
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
              </span>
            </div>
            <p className="text-xs text-[#FCFAF7]/90 font-medium">
              {formData.course} • {formData.branch}
            </p>
            <p className="text-[11px] text-white/70">
              {formData.institution}
            </p>
          </div>

          {/* Quick Photo Change Hint */}
          <button
            type="button"
            onClick={() => setShowImagePickerModal(true)}
            className="mt-3 text-[11px] font-bold bg-white/15 hover:bg-white/25 text-[#FCFAF7] px-3 py-1 rounded-full border border-white/20 flex items-center gap-1.5 transition-colors"
          >
            <Upload className="w-3 h-3" />
            <span>Upload or Choose Photo</span>
          </button>
        </div>
      </div>

      {/* Main Form / Details Section */}
      <form onSubmit={handleSave} className="space-y-4">
        
        {/* 1. Academic Information Card */}
        <div className="bg-white p-4.5 rounded-3xl border border-[#E8E4E1] shadow-2xs space-y-3.5">
          <div className="flex items-center justify-between border-b border-[#E8E4E1] pb-2">
            <h3 className="text-xs font-bold text-[#435585] uppercase tracking-wider flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-[#435585]" />
              <span>Academic Details</span>
            </h3>
            <span className="text-[10px] text-[#8C8885] font-semibold">Semester {formData.semester}</span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-[#8C8885] font-bold mb-1">Full Student Name *</label>
              <input
                type="text"
                disabled={!isEditing}
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-2.5 bg-[#FCFAF7] disabled:bg-[#F2F0ED]/50 font-bold text-[#2D2926] rounded-xl border border-[#E8E4E1] focus:outline-none focus:ring-2 focus:ring-[#435585]"
                placeholder="Enter full name"
              />
            </div>

            <div className="col-span-2 sm:col-span-1">
              <label className="block text-[#8C8885] font-bold mb-1 flex items-center justify-between">
                <span>University Roll No *</span>
                {!isEditing && (
                  <button
                    type="button"
                    onClick={() => handleCopy(formData.rollNo, 'rollNo')}
                    className="text-[#435585] hover:underline flex items-center gap-0.5 text-[10px]"
                  >
                    {copiedField === 'rollNo' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedField === 'rollNo' ? 'Copied' : 'Copy'}</span>
                  </button>
                )}
              </label>
              <input
                type="text"
                disabled={!isEditing}
                required
                value={formData.rollNo}
                onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                className="w-full p-2.5 bg-[#FCFAF7] disabled:bg-[#F2F0ED]/50 font-bold text-[#2D2926] rounded-xl border border-[#E8E4E1] focus:outline-none focus:ring-2 focus:ring-[#435585]"
                placeholder="e.g., 2304850100045"
              />
            </div>

            <div>
              <label className="block text-[#8C8885] font-bold mb-1">Enrollment Number</label>
              <input
                type="text"
                disabled={!isEditing}
                value={formData.enrollmentNo}
                onChange={(e) => setFormData({ ...formData, enrollmentNo: e.target.value })}
                className="w-full p-2.5 bg-[#FCFAF7] disabled:bg-[#F2F0ED]/50 font-bold text-[#2D2926] rounded-xl border border-[#E8E4E1] focus:outline-none focus:ring-2 focus:ring-[#435585]"
                placeholder="e.g., 2304850100045"
              />
            </div>

            <div>
              <label className="block text-[#8C8885] font-bold mb-1">Academic Session</label>
              <input
                type="text"
                disabled={!isEditing}
                value={formData.academicYear}
                onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
                className="w-full p-2.5 bg-[#FCFAF7] disabled:bg-[#F2F0ED]/50 font-semibold text-[#2D2926] rounded-xl border border-[#E8E4E1] focus:outline-none focus:ring-2 focus:ring-[#435585]"
                placeholder="e.g., 2026-2027"
              />
            </div>

            <div>
              <label className="block text-[#8C8885] font-bold mb-1">Course Degree</label>
              <input
                type="text"
                disabled={!isEditing}
                value={formData.course}
                onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                className="w-full p-2.5 bg-[#FCFAF7] disabled:bg-[#F2F0ED]/50 font-semibold text-[#2D2926] rounded-xl border border-[#E8E4E1] focus:outline-none focus:ring-2 focus:ring-[#435585]"
                placeholder="e.g., B.Tech"
              />
            </div>

            <div>
              <label className="block text-[#8C8885] font-bold mb-1">Branch / Stream</label>
              <input
                type="text"
                disabled={!isEditing}
                value={formData.branch}
                onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                className="w-full p-2.5 bg-[#FCFAF7] disabled:bg-[#F2F0ED]/50 font-semibold text-[#2D2926] rounded-xl border border-[#E8E4E1] focus:outline-none focus:ring-2 focus:ring-[#435585]"
                placeholder="e.g., CSE Data Science"
              />
            </div>

            <div>
              <label className="block text-[#8C8885] font-bold mb-1">Year of Study</label>
              <input
                type="text"
                disabled={!isEditing}
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                className="w-full p-2.5 bg-[#FCFAF7] disabled:bg-[#F2F0ED]/50 font-semibold text-[#2D2926] rounded-xl border border-[#E8E4E1] focus:outline-none focus:ring-2 focus:ring-[#435585]"
                placeholder="e.g., 3rd Year"
              />
            </div>

            <div>
              <label className="block text-[#8C8885] font-bold mb-1">Current Semester</label>
              <input
                type="text"
                disabled={!isEditing}
                value={formData.semester}
                onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                className="w-full p-2.5 bg-[#FCFAF7] disabled:bg-[#F2F0ED]/50 font-semibold text-[#2D2926] rounded-xl border border-[#E8E4E1] focus:outline-none focus:ring-2 focus:ring-[#435585]"
                placeholder="e.g., VI Sem"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-[#8C8885] font-bold mb-1">College / Institution</label>
              <input
                type="text"
                disabled={!isEditing}
                value={formData.institution}
                onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                className="w-full p-2.5 bg-[#FCFAF7] disabled:bg-[#F2F0ED]/50 font-semibold text-[#2D2926] rounded-xl border border-[#E8E4E1] focus:outline-none focus:ring-2 focus:ring-[#435585]"
                placeholder="e.g., SHEAT Group of Institutions, Varanasi"
              />
            </div>
          </div>
        </div>

        {/* 2. Contact & Communication Card */}
        <div className="bg-white p-4.5 rounded-3xl border border-[#E8E4E1] shadow-2xs space-y-3.5">
          <div className="flex items-center justify-between border-b border-[#E8E4E1] pb-2">
            <h3 className="text-xs font-bold text-[#435585] uppercase tracking-wider flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#435585]" />
              <span>Contact & Communication</span>
            </h3>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-[#8C8885] font-bold mb-1 flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-[#8C8885]" /> Email Address
                </span>
                {!isEditing && (
                  <button
                    type="button"
                    onClick={() => handleCopy(formData.email, 'email')}
                    className="text-[#435585] hover:underline flex items-center gap-0.5 text-[10px]"
                  >
                    {copiedField === 'email' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedField === 'email' ? 'Copied' : 'Copy'}</span>
                  </button>
                )}
              </label>
              <input
                type="email"
                disabled={!isEditing}
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-2.5 bg-[#FCFAF7] disabled:bg-[#F2F0ED]/50 font-semibold text-[#2D2926] rounded-xl border border-[#E8E4E1] focus:outline-none focus:ring-2 focus:ring-[#435585]"
                placeholder="student@sheatcollege.com"
              />
            </div>

            <div>
              <label className="block text-[#8C8885] font-bold mb-1 flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-[#8C8885]" /> Mobile Phone Number
                </span>
                {!isEditing && (
                  <button
                    type="button"
                    onClick={() => handleCopy(formData.phone, 'phone')}
                    className="text-[#435585] hover:underline flex items-center gap-0.5 text-[10px]"
                  >
                    {copiedField === 'phone' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedField === 'phone' ? 'Copied' : 'Copy'}</span>
                  </button>
                )}
              </label>
              <input
                type="tel"
                disabled={!isEditing}
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full p-2.5 bg-[#FCFAF7] disabled:bg-[#F2F0ED]/50 font-semibold text-[#2D2926] rounded-xl border border-[#E8E4E1] focus:outline-none focus:ring-2 focus:ring-[#435585]"
                placeholder="+91 98765 43210"
              />
            </div>

            <div>
              <label className="block text-[#8C8885] font-bold mb-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#8C8885]" /> Permanent Address
              </label>
              <textarea
                disabled={!isEditing}
                rows={2}
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full p-2.5 bg-[#FCFAF7] disabled:bg-[#F2F0ED]/50 font-semibold text-[#2D2926] rounded-xl border border-[#E8E4E1] focus:outline-none focus:ring-2 focus:ring-[#435585]"
                placeholder="Village/Mohalla, Post, District, State, PIN"
              />
            </div>
          </div>
        </div>

        {/* 3. Personal & Family Record Card */}
        <div className="bg-white p-4.5 rounded-3xl border border-[#E8E4E1] shadow-2xs space-y-3.5">
          <div className="flex items-center justify-between border-b border-[#E8E4E1] pb-2">
            <h3 className="text-xs font-bold text-[#435585] uppercase tracking-wider flex items-center gap-2">
              <Users className="w-4 h-4 text-[#435585]" />
              <span>Parent & Personal Record</span>
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block text-[#8C8885] font-bold mb-1">Father's Name</label>
              <input
                type="text"
                disabled={!isEditing}
                value={formData.fatherName}
                onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                className="w-full p-2.5 bg-[#FCFAF7] disabled:bg-[#F2F0ED]/50 font-semibold text-[#2D2926] rounded-xl border border-[#E8E4E1] focus:outline-none focus:ring-2 focus:ring-[#435585]"
                placeholder="Father's full name"
              />
            </div>

            <div>
              <label className="block text-[#8C8885] font-bold mb-1">Mother's Name</label>
              <input
                type="text"
                disabled={!isEditing}
                value={formData.motherName}
                onChange={(e) => setFormData({ ...formData, motherName: e.target.value })}
                className="w-full p-2.5 bg-[#FCFAF7] disabled:bg-[#F2F0ED]/50 font-semibold text-[#2D2926] rounded-xl border border-[#E8E4E1] focus:outline-none focus:ring-2 focus:ring-[#435585]"
                placeholder="Mother's full name"
              />
            </div>

            <div>
              <label className="block text-[#8C8885] font-bold mb-1 flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 text-rose-500" /> Blood Group
              </label>
              {isEditing ? (
                <select
                  value={formData.bloodGroup}
                  onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                  className="w-full p-2.5 bg-[#FCFAF7] font-semibold text-[#2D2926] rounded-xl border border-[#E8E4E1] focus:outline-none focus:ring-2 focus:ring-[#435585]"
                >
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              ) : (
                <input
                  type="text"
                  disabled
                  value={formData.bloodGroup}
                  className="w-full p-2.5 bg-[#F2F0ED]/50 font-bold text-rose-700 rounded-xl border border-[#E8E4E1]"
                />
              )}
            </div>

            <div>
              <label className="block text-[#8C8885] font-bold mb-1 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#8C8885]" /> Date of Birth
              </label>
              <input
                type={isEditing ? 'date' : 'text'}
                disabled={!isEditing}
                value={formData.dob || '2004-05-15'}
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                className="w-full p-2.5 bg-[#FCFAF7] disabled:bg-[#F2F0ED]/50 font-semibold text-[#2D2926] rounded-xl border border-[#E8E4E1] focus:outline-none focus:ring-2 focus:ring-[#435585]"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-[#8C8885] font-bold mb-1">Guardian Emergency Contact</label>
              <input
                type="tel"
                disabled={!isEditing}
                value={formData.guardianPhone || '+91 94152 88710'}
                onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })}
                className="w-full p-2.5 bg-[#FCFAF7] disabled:bg-[#F2F0ED]/50 font-semibold text-[#2D2926] rounded-xl border border-[#E8E4E1] focus:outline-none focus:ring-2 focus:ring-[#435585]"
                placeholder="Parent / Guardian phone"
              />
            </div>
          </div>
        </div>

        {/* 4. Connected Account & Security */}
        <div className="bg-white p-4.5 rounded-3xl border border-[#E8E4E1] shadow-2xs space-y-3">
          <div className="flex items-center justify-between border-b border-[#E8E4E1] pb-2">
            <h3 className="text-xs font-bold text-[#435585] uppercase tracking-wider flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-[#435585]" />
              <span>Portal Account & Security</span>
            </h3>
          </div>

          <div className="flex items-center justify-between text-xs p-3 bg-[#FCFAF7] rounded-2xl border border-[#E8E4E1]">
            <div>
              <p className="font-bold text-[#2D2926]">
                Username: <span className="font-mono text-[#435585]">@{currentUser?.username || 'shanu'}</span>
              </p>
              <p className="text-[11px] text-[#8C8885]">Student Cloud ID: {currentUser?.id || 'sheat_verified'}</p>
            </div>
            <button
              type="button"
              onClick={() => setShowLogoutConfirm(true)}
              className="bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs px-3 py-1.5 rounded-xl border border-rose-200 flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Save and Cancel Footer Actions */}
        {isEditing && (
          <div className="flex items-center space-x-3 pt-2">
            <button
              type="button"
              onClick={handleCancelEdit}
              className="flex-1 py-3 bg-[#F2F0ED] hover:bg-[#E8E4E1] text-[#2D2926] font-bold text-xs rounded-2xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-[#435585] hover:bg-[#354368] text-white font-bold text-xs rounded-2xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Profile Changes</span>
            </button>
          </div>
        )}
      </form>

      {/* ========================================================================= */}
      {/* PROFILE IMAGE PICKER & UPLOADER MODAL */}
      {/* ========================================================================= */}
      {showImagePickerModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-[#FCFAF7] w-full max-w-md rounded-3xl p-5 shadow-2xl border border-[#E8E4E1] space-y-4 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#E8E4E1] pb-3">
              <div>
                <h3 className="text-base font-serif font-bold text-[#2D2926]">Update Profile Photo</h3>
                <p className="text-xs text-[#8C8885]">Upload from device, paste link or pick avatar</p>
              </div>
              <button
                onClick={() => setShowImagePickerModal(false)}
                className="text-[#8C8885] hover:text-[#2D2926] p-1 rounded-full hover:bg-[#F2F0ED] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Current Selected Avatar Preview */}
            <div className="flex items-center space-x-4 bg-white p-3.5 rounded-2xl border border-[#E8E4E1]">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#435585] shadow-xs shrink-0">
                <img
                  src={formData.avatarUrl || student.avatarUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-xs">
                <p className="font-bold text-[#2D2926]">Active Photo Preview</p>
                <p className="text-[#8C8885] text-[11px]">This photo appears on your Digital ID card, Hall Ticket & Header.</p>
              </div>
            </div>

            {/* 1. Drag & Drop / Device Upload Area */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#435585] uppercase tracking-wider">
                Option 1: Upload from Computer / Phone
              </label>

              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`p-6 border-2 border-dashed rounded-2xl text-center cursor-pointer transition-all ${
                  dragOver
                    ? 'border-[#435585] bg-[#EDF1F7]'
                    : 'border-[#E8E4E1] bg-white hover:border-[#435585] hover:bg-[#F2F0ED]/50'
                }`}
              >
                <div className="w-10 h-10 mx-auto rounded-full bg-[#EDF1F7] text-[#435585] flex items-center justify-center mb-2">
                  <Upload className="w-5 h-5" />
                </div>
                <p className="text-xs font-bold text-[#2D2926]">Click to browse or drag & drop</p>
                <p className="text-[11px] text-[#8C8885] mt-0.5">Supports PNG, JPG, JPEG, WEBP files</p>
              </div>
            </div>

            {/* 2. Pick from Curated Avatar Presets */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#435585] uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#435585]" />
                <span>Option 2: Choose Student Avatar</span>
              </label>

              <div className="grid grid-cols-3 gap-2.5">
                {PRESET_AVATARS.map((avatar, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectPreset(avatar.url)}
                    className={`p-2 rounded-2xl border text-center transition-all bg-white group hover:border-[#435585] ${
                      formData.avatarUrl === avatar.url
                        ? 'border-2 border-[#435585] bg-[#EDF1F7] shadow-xs'
                        : 'border-[#E8E4E1]'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-full overflow-hidden mx-auto border border-[#E8E4E1] mb-1">
                      <img src={avatar.url} alt={avatar.name} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[10px] font-semibold text-[#4A4643] group-hover:text-[#435585] block truncate">
                      {avatar.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Image URL Input */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#435585] uppercase tracking-wider">
                Option 3: Paste Web Image URL
              </label>
              <div className="flex space-x-2">
                <input
                  type="url"
                  value={customUrlInput}
                  onChange={(e) => setCustomUrlInput(e.target.value)}
                  placeholder="https://example.com/photo.jpg"
                  className="flex-1 p-2.5 bg-white text-xs rounded-xl border border-[#E8E4E1] focus:outline-none focus:ring-2 focus:ring-[#435585]"
                />
                <button
                  type="button"
                  onClick={handleApplyCustomUrl}
                  disabled={!customUrlInput.trim()}
                  className="bg-[#435585] disabled:opacity-50 hover:bg-[#354368] text-white font-bold text-xs px-3.5 py-2.5 rounded-xl transition-colors"
                >
                  Apply
                </button>
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-[#E8E4E1]">
              <button
                type="button"
                onClick={() => {
                  setFormData((prev) => ({
                    ...prev,
                    avatarUrl: PRESET_AVATARS[0].url
                  }));
                }}
                className="text-xs font-bold text-[#8C8885] hover:text-[#2D2926] flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Default</span>
              </button>

              <button
                type="button"
                onClick={() => setShowImagePickerModal(false)}
                className="bg-[#2D2926] hover:bg-[#435585] text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-[#FCFAF7] w-full max-w-sm rounded-3xl p-5 shadow-2xl border border-[#E8E4E1] space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-200">
              <LogOut className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-base font-serif font-bold text-[#2D2926]">Sign Out from Portal?</h3>
              <p className="text-xs text-[#8C8885]">
                You will be redirected to the student login screen. All your changes and diary notes remain safely stored.
              </p>
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 py-2.5 bg-[#F2F0ED] hover:bg-[#E8E4E1] text-[#2D2926] font-bold text-xs rounded-xl transition-colors"
              >
                Stay Logged In
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowLogoutConfirm(false);
                  onLogout();
                }}
                className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
