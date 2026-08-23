import React from 'react';
import { StudentProfile } from '../../types';
import { sampleHallTicket } from '../../mockData';
import { ArrowLeft, Printer, Download, CheckCircle2, ShieldCheck, QrCode } from 'lucide-react';

interface HallTicketViewProps {
  student: StudentProfile;
  onBack: () => void;
}

export const HallTicketView: React.FC<HallTicketViewProps> = ({ student, onBack }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="pb-20 p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between print:hidden">
        <div className="flex items-center space-x-2">
          <button
            onClick={onBack}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-black text-gray-900 tracking-tight">Exam Hall Ticket</h2>
        </div>
        <button
          onClick={handlePrint}
          className="bg-purple-900 hover:bg-purple-950 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-xs flex items-center gap-1.5 transition-colors"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print / PDF</span>
        </button>
      </div>

      {/* Printable Hall Ticket Card Container */}
      <div className="bg-white p-5 rounded-2xl border-2 border-purple-900 shadow-md space-y-4 print:p-0 print:border-none print:shadow-none">
        
        {/* Header Header Seals */}
        <div className="text-center border-b-2 border-purple-900 pb-3 space-y-1">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-purple-900 text-amber-300 font-extrabold flex items-center justify-center text-xs shadow-xs">
              SHEAT
            </div>
            <div>
              <h1 className="text-base font-black text-purple-950 uppercase tracking-tight">
                SHEAT GROUP OF INSTITUTIONS
              </h1>
              <p className="text-[10px] font-bold text-gray-600 uppercase">
                Babatpur Airport Road, Varanasi - 221006 (U.P.)
              </p>
            </div>
          </div>
          <div className="bg-purple-900 text-amber-300 py-1 px-3 rounded-lg text-xs font-extrabold tracking-wider uppercase mt-2 inline-block">
            {sampleHallTicket.examName}
          </div>
        </div>

        {/* Candidate & Center Details */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-purple-50/50 p-3 rounded-xl border border-purple-100 text-xs">
          <div className="col-span-2 space-y-1">
            <p><span className="font-bold text-gray-600">Candidate Name:</span> <span className="font-extrabold text-gray-900 uppercase">{student.name}</span></p>
            <p><span className="font-bold text-gray-600">Roll Number:</span> <span className="font-bold text-purple-900">{student.rollNo}</span></p>
            <p><span className="font-bold text-gray-600">Enrollment No:</span> <span className="font-bold text-gray-800">{student.enrollmentNo}</span></p>
            <p><span className="font-bold text-gray-600">Course & Branch:</span> <span className="font-semibold text-gray-800">{student.course} - {student.branch}</span></p>
            <p><span className="font-bold text-gray-600">Exam Center:</span> <span className="font-bold text-purple-900">{sampleHallTicket.centerName}</span></p>
          </div>

          <div className="flex flex-col items-center justify-center border-t sm:border-t-0 sm:border-l border-purple-200 pt-2 sm:pt-0 pl-0 sm:pl-3">
            <img
              src={student.avatarUrl}
              alt={student.name}
              className="w-20 h-24 object-cover rounded-lg border-2 border-purple-900 shadow-xs mb-1"
            />
            <span className="text-[9px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> VERIFIED
            </span>
          </div>
        </div>

        {/* QR Code Barcode Box */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-200">
          <div className="space-y-0.5">
            <p className="text-xs font-bold text-gray-800">Hall Ticket No: {sampleHallTicket.hallTicketNo}</p>
            <p className="text-[10px] text-gray-500">Scan QR Code at Exam Entry Gate for Biometric Verification</p>
          </div>
          <div className="bg-white p-1.5 rounded-lg border border-gray-300 flex items-center space-x-1 shadow-2xs">
            <QrCode className="w-8 h-8 text-purple-950" />
          </div>
        </div>

        {/* Subject Schedule Table */}
        <div className="space-y-1">
          <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wide">Permitted Subjects</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-purple-900 text-white font-bold">
                  <th className="p-2 border border-purple-900">Code</th>
                  <th className="p-2 border border-purple-900">Subject Name</th>
                  <th className="p-2 border border-purple-900">Date</th>
                  <th className="p-2 border border-purple-900">Time</th>
                  <th className="p-2 border border-purple-900 text-center">Invigilator</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 font-medium">
                {sampleHallTicket.subjects.map((sub, idx) => (
                  <tr key={idx} className="hover:bg-purple-50/40">
                    <td className="p-2 border border-gray-200 font-bold text-purple-900">{sub.code}</td>
                    <td className="p-2 border border-gray-200 font-semibold">{sub.name}</td>
                    <td className="p-2 border border-gray-200">{sub.date}</td>
                    <td className="p-2 border border-gray-200">{sub.time}</td>
                    <td className="p-2 border border-gray-200 text-center">
                      <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                        ✓ OK
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Official Signatures */}
        <div className="flex items-end justify-between pt-6 border-t border-gray-300 text-center text-xs">
          <div>
            <div className="w-24 border-b border-gray-400 mb-1 mx-auto"></div>
            <p className="font-bold text-gray-800">Candidate Signature</p>
          </div>
          <div>
            <div className="w-28 border-b border-purple-900 mb-1 mx-auto text-[10px] font-extrabold text-purple-900">
              Dr. A.K. Sharma
            </div>
            <p className="font-bold text-purple-900">Controller of Examinations</p>
            <p className="text-[9px] text-gray-500">SHEAT Group Varanasi</p>
          </div>
        </div>
      </div>
    </div>
  );
};
