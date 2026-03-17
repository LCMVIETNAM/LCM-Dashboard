import React, { useState } from 'react';
import { 
  TrendingUp, ShieldCheck, Zap, PieChart, TreeDeciduous, Wallet, 
  Calendar, Lock, Layers, Calculator, Coins, BarChart3, 
  Users, UserCheck, Sparkles, MessageSquare, RefreshCw, ChevronRight 
} from 'lucide-react';

const App = () => {
  // --- THÔNG SỐ CỐ ĐỊNH ---
  const BASE_PRICE = 1000; 
  const fundData = {
    totalNav: 394978329,
    totalShares: 300000, 
    dcaAmount: 11000000,
    qdpAmount: 85000000
  };

  const navPerShare = fundData.totalNav / fundData.totalShares;
  const totalGrowth = ((navPerShare - BASE_PRICE) / BASE_PRICE * 100).toFixed(2);

  // --- TRỢ LÝ AI ---
  const [aiResponse, setAiResponse] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const apiKey = process.env.REACT_APP_GEMINI_API_KEY; 

  const callGemini = async (prompt) => {
    if (!apiKey) {
      setAiResponse("Lỗi: Chưa cấu hình API Key trên Vercel.");
      return;
    }
    setIsAiLoading(true);
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          systemInstruction: { parts: [{ text: `Bạn là trợ lý Quỹ LCM 2.0. NAV/CP hiện tại là ${navPerShare.toLocaleString()}đ.` }] }
        })
      });
      const result = await response.json();
      setAiResponse(result.candidates?.[0]?.content?.parts?.[0]?.text || "AI đang bận một chút, anh thử lại nhé.");
    } catch (err) {
      setAiResponse("Không thể kết nối với AI. Anh kiểm tra lại API Key nhé.");
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 font-sans text-slate-900">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="bg-[#5850EC] w-14 h-14 rounded-2xl text-white flex items-center justify-center font-black text-2xl shadow-xl">LT</div>
            <div>
              <h1 className="text-2xl font-black tracking-tighter uppercase">LCM VIETNAM</h1>
              <div className="text-[10px] font-black text-[#5850EC] uppercase tracking-[0.3em]">HuuTrong Partnership</div>
            </div>
          </div>
          <div className="bg-[#5850EC] text-white px-6 py-3 rounded-2xl text-[11px] font-black flex items-center gap-2 shadow-lg uppercase">
            <Zap size={16} className="text-amber-400 fill-amber-400" /> Kỷ luật LCM 2.0
          </div>
        </div>

        {/* Chỉ số */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-emerald-50 p-6 rounded-[2rem] border-b-4 border-emerald-500 relative overflow-hidden">
            <p className="text-emerald-600 text-[10px] font-black uppercase mb-1">NAV / Cổ phần</p>
            <h3 className="text-2xl font-black">{navPerShare.toLocaleString(undefined, {maximumFractionDigits: 0})}đ</h3>
            <Coins className="absolute -right-4 -bottom-4 text-emerald-200 w-20 h-20 opacity-40" />
          </div>
          <div className="bg-[#0F172A] p-6 rounded-[2rem] border-b-4 border-amber-500 text-center relative overflow-hidden text-white">
            <p className="text-slate-400 text-[10px] font-black uppercase mb-1">Tăng trưởng</p>
            <h3 className="text-2xl font-black text-emerald-400">+{totalGrowth}%</h3>
            <TrendingUp className="absolute -right-2 -bottom-2 text-white opacity-[0.05] w-20 h-20" />
          </div>
        </div>

        {/* AI Box */}
        <div className="bg-slate-900 rounded-[2.5rem] p-8 mb-8 text-white border-r-8 border-[#5850EC] relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="flex items-center gap-2 font-black uppercase text-xs mb-6">
              <Sparkles className="text-amber-400" /> Trợ lý chiến lược AI ✨
            </h3>
            <div className="flex flex-col md:flex-row gap-6">
              <button 
                onClick={() => callGemini("Phân tích hiệu suất Quỹ LCM và đưa ra lời khuyên.")}
                disabled={isAiLoading}
                className="bg-[#5850EC] hover:bg-indigo-600 px-8 py-4 rounded-2xl font-black text-[10px] uppercase transition-all shrink-0"
              >
                {isAiLoading ? "Đang tính..." : "Phân tích hiệu suất"}
              </button>
              <div className="flex-1 bg-white/5 border border-white/10 p-6 rounded-2xl italic text-slate-300 text-sm min-h-[100px]">
                {aiResponse || "Chào anh Trọng! Nhấn nút để em phân tích dữ liệu Quỹ hôm nay nhé."}
              </div>
            </div>
          </div>
        </div>

        <div className="text-center text-slate-400 text-[10px] font-black uppercase tracking-[0.5em] opacity-30 mt-20">
          LCM VIETNAM • CONFIDENTIAL DOCUMENT
        </div>
      </div>
    </div>
  );
};

export default App;
