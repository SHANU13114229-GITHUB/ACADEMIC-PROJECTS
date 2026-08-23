import React from 'react';
import { X, Award, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface PerformanceScaleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PerformanceScaleModal: React.FC<PerformanceScaleModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const scales = [
    {
      exam: 'JEE Mains (NTA Official)',
      scale: '0 to 300 Score Scale & National Percentile',
      tiers: [
        { score: '260 – 300', accuracy: '88% – 100%', label: '99.5+ Percentile (Top IIT/NIT Computer Science Rank)' },
        { score: '210 – 259', accuracy: '70% – 87%', label: '98th–99th Percentile (Premier NIT / Top Engineering)' },
        { score: '150 – 209', accuracy: '50% – 69%', label: '93rd–97th Percentile (JEE Advanced Qualified)' },
        { score: 'Below 150', accuracy: 'Below 50%', label: 'Developing (Core Revision Recommended)' },
      ],
    },
    {
      exam: 'NEET UG (Medical Entrance)',
      scale: '0 to 720 Score Scale (All-India MBBS/BDS Rank)',
      tiers: [
        { score: '670 – 720', accuracy: '93% – 100%', label: 'Top AIIMS & Premier Government Medical Colleges' },
        { score: '610 – 669', accuracy: '85% – 92%', label: 'State Government Medical College MBBS Seat' },
        { score: '520 – 609', accuracy: '72% – 84%', label: 'BDS / State Quota / Premier Private Colleges' },
        { score: 'Below 520', accuracy: 'Below 72%', label: 'Below State GMC Cutoff' },
      ],
    },
    {
      exam: 'Government Exams (SSC CGL / UPSC / State PSC)',
      scale: '0 to 200 Scaled Score (Tier 1 Cutoff: ~142)',
      tiers: [
        { score: '170 – 200', accuracy: '85% – 100%', label: 'Top Central Ministry / Inspector Post Benchmark' },
        { score: '145 – 169', accuracy: '72% – 84%', label: 'Tier 1 Merit Cutoff Cleared with High Safety Margin' },
        { score: '120 – 144', accuracy: '60% – 71%', label: 'Borderline Qualifying (Needs Speed Improvement)' },
        { score: 'Below 120', accuracy: 'Below 60%', label: 'Below Tier 1 Qualifying Threshold' },
      ],
    },
    {
      exam: 'Banking Exams (IBPS / SBI / RBI)',
      scale: '0 to 100 Score Scale (PO Prelims & Mains Cutoff)',
      tiers: [
        { score: '82 – 100', accuracy: '82% – 100%', label: 'Top Merit Rank (SBI PO / RBI Grade B Guarantee)' },
        { score: '68 – 81', accuracy: '68% – 81%', label: 'PO Prelims Cutoff Cleared with Strong Mains Stance' },
        { score: '55 – 67', accuracy: '55% – 67%', label: 'Clerical Cutoff Cleared / Borderline PO' },
        { score: 'Below 55', accuracy: 'Below 55%', label: 'Below Banking Cutoff' },
      ],
    },
    {
      exam: 'AP Calculus AB & AP CSA',
      scale: '1 to 5 Point Scale (College Board)',
      tiers: [
        { score: '5', accuracy: '85% – 100%', label: 'Extremely Well Qualified (A+ College Equivalent)' },
        { score: '4', accuracy: '70% – 84%', label: 'Well Qualified (A- / B+ College Equivalent)' },
        { score: '3', accuracy: '55% – 69%', label: 'Qualified (B- / C College Equivalent)' },
        { score: '2 / 1', accuracy: 'Below 55%', label: 'Possibly Qualified / No Recommendation' },
      ],
    },
    {
      exam: 'Digital SAT Mathematics',
      scale: '200 to 800 Score Scale',
      tiers: [
        { score: '750 – 800', accuracy: '90% – 100%', label: '99th Percentile (Top Ivy League Benchmark)' },
        { score: '680 – 740', accuracy: '80% – 89%', label: '92nd–98th Percentile (Highly Competitive STEM)' },
        { score: '580 – 670', accuracy: '65% – 79%', label: '75th–88th Percentile (National College Ready)' },
      ],
    },
    {
      exam: 'GCSE Biology (AQA / Edexcel)',
      scale: '9 to 1 Reformed Grade Scale',
      tiers: [
        { score: 'Grade 9 / 8', accuracy: '80% – 100%', label: 'A* Equivalent (Exceptional Attainment)' },
        { score: 'Grade 7 / 6', accuracy: '65% – 79%', label: 'A / B Equivalent (Strong Pass)' },
        { score: 'Grade 5 / 4', accuracy: '50% – 64%', label: 'Standard GCSE Pass' },
      ],
    },
    {
      exam: 'GRE Quantitative Reasoning',
      scale: '130 to 170 Score Scale',
      tiers: [
        { score: '168 – 170', accuracy: '90% – 100%', label: '94th–99th Percentile (Top Engineering/Quant)' },
        { score: '162 – 167', accuracy: '78% – 89%', label: '80th–92nd Percentile (Strong Graduate Benchmark)' },
        { score: '155 – 161', accuracy: '65% – 77%', label: '60th–78th Percentile (Competitive Score)' },
      ],
    },
    {
      exam: 'AWS Certified Solutions Architect',
      scale: '100 to 1000 Scaled Score (720 Pass)',
      tiers: [
        { score: '880 – 1000', accuracy: '88% – 100%', label: 'Expert Cloud Architect Mastery' },
        { score: '720 – 870', accuracy: '72% – 87%', label: 'Official Certification Pass Level' },
        { score: 'Below 720', accuracy: 'Below 72%', label: 'Needs Further Domain Practice' },
      ],
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0f172a]/80 backdrop-blur-md">
      <div className="w-full max-w-3xl bg-[#0f172a] border border-white/20 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-white/5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-500/20 border border-indigo-500/30 rounded-xl flex items-center justify-center text-indigo-300">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">
                Official Exam Standardized Scale Guide
              </h2>
              <p className="text-xs text-slate-400">
                How ExamBook converts practice session accuracy to official standardized exam scores
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-indigo-400 shrink-0" />
            <p className="text-xs text-slate-300 leading-relaxed">
              ExamBook uses empirical conversion curves mapped from College Board, AQA, ETS, and AWS official exam blueprints to project your score dynamically.
            </p>
          </div>

          <div className="space-y-6">
            {scales.map((s, idx) => (
              <div key={idx} className="p-5 bg-white/5 border border-white/10 rounded-2xl space-y-3">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <h3 className="font-bold text-white text-sm">{s.exam}</h3>
                  <span className="text-xs text-indigo-300 font-semibold">{s.scale}</span>
                </div>
                <div className="space-y-2">
                  {s.tiers.map((tier, tIdx) => (
                    <div
                      key={tIdx}
                      className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-white/5"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-indigo-300 w-24">{tier.score}</span>
                        <span className="text-slate-300">{tier.label}</span>
                      </div>
                      <span className="font-semibold text-slate-400">{tier.accuracy}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
