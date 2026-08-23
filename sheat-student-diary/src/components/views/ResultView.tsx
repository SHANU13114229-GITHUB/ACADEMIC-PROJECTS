import React, { useState } from 'react';
import { SemesterResult } from '../../types';
import { sampleResults } from '../../mockData';
import { ArrowLeft, Trophy, Award, Download, CheckCircle2, ChevronDown } from 'lucide-react';

interface ResultViewProps {
  onBack: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({ onBack }) => {
  const [selectedSemIdx, setSelectedSemIdx] = useState(0);
  const currentResult = sampleResults[selectedSemIdx] || sampleResults[0];

  return (
    <div className="pb-20 p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button
            onClick={onBack}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-black text-gray-900 tracking-tight">Academic Results</h2>
        </div>
        <span className="text-xs font-bold bg-amber-100 text-amber-900 px-2.5 py-1 rounded-full flex items-center gap-1">
          <Trophy className="w-3.5 h-3.5 text-amber-600" /> CGPA: {currentResult.cgpa}
        </span>
      </div>

      {/* Semester Dropdown selector */}
      <div className="bg-white p-3 rounded-2xl border border-gray-200/80 shadow-2xs flex items-center justify-between">
        <span className="text-xs font-bold text-gray-600">Select Semester:</span>
        <select
          value={selectedSemIdx}
          onChange={(e) => setSelectedSemIdx(Number(e.target.value))}
          className="bg-purple-50 text-purple-900 text-xs font-bold px-3 py-1.5 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-600 cursor-pointer"
        >
          {sampleResults.map((res, idx) => (
            <option key={idx} value={idx}>
              {res.semester}
            </option>
          ))}
        </select>
      </div>

      {/* Result Hero Summary Card */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-950 text-white p-4 rounded-2xl shadow-md border border-purple-700/50 space-y-3">
        <div className="flex items-center justify-between border-b border-purple-800 pb-2">
          <div>
            <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider">OFFICIAL MARKSHEET</span>
            <h3 className="text-sm font-black text-white mt-0.5">{currentResult.semester}</h3>
          </div>
          <span className="bg-emerald-400 text-purple-950 text-xs font-black px-2.5 py-1 rounded-full flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> STATUS: {currentResult.status}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center pt-1">
          <div className="bg-purple-950/60 p-2 rounded-xl border border-purple-800/50">
            <p className="text-[10px] text-purple-300 font-medium">SGPA</p>
            <p className="text-lg font-black text-amber-300">{currentResult.sgpa}</p>
          </div>
          <div className="bg-purple-950/60 p-2 rounded-xl border border-purple-800/50">
            <p className="text-[10px] text-purple-300 font-medium">CGPA</p>
            <p className="text-lg font-black text-amber-300">{currentResult.cgpa}</p>
          </div>
          <div className="bg-purple-950/60 p-2 rounded-xl border border-purple-800/50">
            <p className="text-[10px] text-purple-300 font-medium">Credits Earned</p>
            <p className="text-lg font-black text-white">{currentResult.earnedCredits}/{currentResult.totalCredits}</p>
          </div>
        </div>
      </div>

      {/* Subject Marks Table */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wide">Detailed Statement of Marks</h3>
          <span className="text-[10px] text-gray-500">Max Internal: 30 | Max External: 70</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-purple-50 text-purple-900 font-bold border-b border-purple-200">
                <th className="p-2">Code</th>
                <th className="p-2">Subject Name</th>
                <th className="p-2 text-center">Int</th>
                <th className="p-2 text-center">Ext</th>
                <th className="p-2 text-center">Total</th>
                <th className="p-2 text-center">Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {currentResult.marks.map((m, idx) => (
                <tr key={idx} className="hover:bg-purple-50/20">
                  <td className="p-2 font-bold text-purple-900">{m.subjectCode}</td>
                  <td className="p-2 font-semibold text-gray-800">{m.subjectName}</td>
                  <td className="p-2 text-center text-gray-600">{m.internal}</td>
                  <td className="p-2 text-center text-gray-600">{m.external}</td>
                  <td className="p-2 text-center font-bold text-gray-900">{m.total}</td>
                  <td className="p-2 text-center">
                    <span
                      className={`font-black px-1.5 py-0.5 rounded text-[10px] ${
                        m.grade === 'O' || m.grade === 'A+'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-indigo-100 text-indigo-800'
                      }`}
                    >
                      {m.grade}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
