import React, { useState } from 'react';
import { StudentProfile } from '../../types';
import {
  ShieldCheck,
  RotateCw,
  QrCode,
  CheckCircle2,
  Phone,
  MapPin,
  Heart,
  Calendar,
  Building,
  GraduationCap,
  Sparkles
} from 'lucide-react';

interface IdCardViewProps {
  student: StudentProfile;
}

export const IdCardView: React.FC<IdCardViewProps> = ({ student }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="pb-24 p-4 space-y-4">
      {/* View Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-serif font-bold text-[#2D2926] tracking-tight">Digital Student ID Card</h2>
          <p className="text-xs text-[#8C8885]">Official Identity Card • SHEAT Group Varanasi</p>
        </div>
        <button
          onClick={() => setIsFlipped((prev) => !prev)}
          className="bg-[#435585] hover:bg-[#354368] text-white font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
        >
          <RotateCw className={`w-3.5 h-3.5 transition-transform duration-500 ${isFlipped ? 'rotate-180' : ''}`} />
          <span>{isFlipped ? 'Show Front' : 'Flip Card'}</span>
        </button>
      </div>

      {/* Side Status Indicator */}
      <div className="flex items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => setIsFlipped(false)}
          className={`text-xs font-bold px-3 py-1 rounded-full transition-all cursor-pointer ${
            !isFlipped
              ? 'bg-[#435585] text-white shadow-2xs'
              : 'bg-[#F2F0ED] text-[#8C8885] hover:text-[#2D2926]'
          }`}
        >
          Front Side
        </button>
        <button
          type="button"
          onClick={() => setIsFlipped(true)}
          className={`text-xs font-bold px-3 py-1 rounded-full transition-all cursor-pointer ${
            isFlipped
              ? 'bg-[#435585] text-white shadow-2xs'
              : 'bg-[#F2F0ED] text-[#8C8885] hover:text-[#2D2926]'
          }`}
        >
          Back Side
        </button>
      </div>

      {/* 3D Flip Container */}
      <div className="w-full flex justify-center py-2 [perspective:1000px]">
        <div
          onClick={() => setIsFlipped((prev) => !prev)}
          className={`relative w-full max-w-sm h-[510px] rounded-3xl transition-transform duration-700 cursor-pointer [transform-style:preserve-3d] ${
            isFlipped ? '[transform:rotateY(180deg)]' : ''
          }`}
        >
          {/* ================= FRONT FACE ================= */}
          <div
            className="absolute inset-0 w-full h-full rounded-3xl bg-white border-2 border-[#435585] shadow-lg p-5 flex flex-col items-center justify-between text-center [backface-visibility:hidden] select-none"
          >
            {/* Top Banner Header */}
            <div className="w-full bg-[#435585] text-white p-3 rounded-2xl border border-[#E8E4E1] shadow-2xs">
              <div className="flex items-center justify-center space-x-2.5">
                <div className="w-8 h-8 rounded-full bg-[#FCFAF7] text-[#435585] font-bold text-xs flex items-center justify-center shadow-xs">
                  SHEAT
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-tight text-white">
                    SHEAT GROUP OF INSTITUTIONS
                  </h3>
                  <p className="text-[8px] font-semibold text-[#FCFAF7]/90 uppercase">
                    VARANASI, UTTAR PRADESH
                  </p>
                </div>
              </div>
            </div>

            {/* Student Photo with Border Badge */}
            <div className="relative my-1">
              <img
                src={student.avatarUrl}
                alt={student.name}
                className="w-28 h-32 object-cover rounded-2xl border-3 border-[#435585] shadow-md bg-[#F2F0ED]"
              />
              <span className="absolute -bottom-2 -right-2 bg-[#435585] text-white p-1 rounded-full border-2 border-white shadow-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
              </span>
            </div>

            {/* Student Name and Branch */}
            <div className="space-y-1">
              <h2 className="text-lg font-serif font-bold text-[#2D2926] uppercase tracking-tight">
                {student.name}
              </h2>
              <p className="text-xs font-semibold text-[#435585] bg-[#EDF1F7] px-3 py-0.5 rounded-full inline-block">
                {student.course} • {student.branch}
              </p>
            </div>

            {/* Grid Info Details */}
            <div className="w-full bg-[#FCFAF7] p-3 rounded-2xl border border-[#E8E4E1] text-xs text-left grid grid-cols-2 gap-2">
              <div>
                <span className="text-[10px] text-[#8C8885] font-bold uppercase block">Roll No</span>
                <span className="font-bold text-[#2D2926] truncate block">{student.rollNo}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#8C8885] font-bold uppercase block">Enrollment</span>
                <span className="font-bold text-[#2D2926] truncate block">{student.enrollmentNo || student.rollNo}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#8C8885] font-bold uppercase block">Academic Session</span>
                <span className="font-semibold text-[#435585]">{student.academicYear || '2026-2027'}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#8C8885] font-bold uppercase block">Blood Group</span>
                <span className="font-bold text-rose-700">{student.bloodGroup || 'O+'}</span>
              </div>
            </div>

            {/* Barcode & QR code bottom bar */}
            <div className="w-full pt-2 border-t border-[#E8E4E1] flex items-center justify-between">
              <div className="text-left">
                <span className="text-[9px] text-[#8C8885] font-bold block uppercase tracking-wider">VERIFIED DIGITAL ID</span>
                <span className="text-[10px] text-[#435585] font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Valid Till July 2027
                </span>
              </div>
              <div className="p-1.5 bg-white border border-[#E8E4E1] rounded-xl shadow-2xs">
                <QrCode className="w-6 h-6 text-[#2D2926]" />
              </div>
            </div>
          </div>

          {/* ================= BACK FACE (Properly Rotated 180deg) ================= */}
          <div
            className="absolute inset-0 w-full h-full rounded-3xl bg-[#FCFAF7] border-2 border-[#435585] shadow-lg p-5 flex flex-col justify-between text-left [backface-visibility:hidden] [transform:rotateY(180deg)] select-none"
          >
            {/* Header */}
            <div className="bg-[#435585] text-white py-2 px-3 rounded-2xl text-center shadow-2xs">
              <p className="text-xs font-bold uppercase tracking-wider">
                STUDENT DETAILS & EMERGENCY RECORD
              </p>
              <p className="text-[9px] text-white/80">Campus Identity & Validation Record</p>
            </div>

            {/* Information Cards List */}
            <div className="space-y-2 text-xs text-[#2D2926]">
              <div className="p-2.5 bg-white rounded-xl border border-[#E8E4E1] flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-[#8C8885] font-bold uppercase">Father's Name</p>
                  <p className="font-bold text-[#2D2926]">{student.fatherName || 'Not Specified'}</p>
                </div>
                <div>
                  <p className="text-[10px] text-[#8C8885] font-bold uppercase">Mother's Name</p>
                  <p className="font-bold text-[#2D2926]">{student.motherName || 'Not Specified'}</p>
                </div>
              </div>

              <div className="p-2.5 bg-white rounded-xl border border-[#E8E4E1]">
                <p className="text-[10px] text-[#8C8885] font-bold uppercase flex items-center gap-1">
                  <Phone className="w-3 h-3 text-[#435585]" /> Student & Emergency Phone
                </p>
                <p className="font-bold text-[#435585] mt-0.5">{student.phone}</p>
              </div>

              <div className="p-2.5 bg-white rounded-xl border border-[#E8E4E1]">
                <p className="text-[10px] text-[#8C8885] font-bold uppercase flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#435585]" /> Permanent Address
                </p>
                <p className="font-medium text-[#4A4643] text-[11px] leading-relaxed mt-0.5">
                  {student.address || 'SHEAT Campus, Babatpur, Varanasi, Uttar Pradesh'}
                </p>
              </div>

              <div className="p-2.5 bg-white rounded-xl border border-[#E8E4E1] flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-[#8C8885] font-bold uppercase">Authorized Signature</p>
                  <p className="font-serif italic font-bold text-[#435585] text-xs">Registrar (SHEAT)</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-[#8C8885] font-bold uppercase">Security Hash</p>
                  <p className="font-mono text-[9px] text-[#8C8885]">SH-ID-{student.rollNo?.slice(-6) || '2026'}</p>
                </div>
              </div>
            </div>

            {/* Bottom Footer Notice */}
            <div className="text-center pt-2 border-t border-[#E8E4E1] space-y-1 text-[10px] text-[#8C8885]">
              <p className="font-bold text-[#2D2926]">SHEAT Group of Institutions, Varanasi (U.P.)</p>
              <p className="text-[9px]">
                If found, please return to College Registrar Office or Call +91 7753811344
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center space-y-1">
        <p className="text-xs text-[#8C8885] font-medium flex items-center justify-center gap-1">
          <Sparkles className="w-3 h-3 text-[#435585]" />
          <span>Tap anywhere on the card or use "Flip Card" to rotate.</span>
        </p>
      </div>
    </div>
  );
};
