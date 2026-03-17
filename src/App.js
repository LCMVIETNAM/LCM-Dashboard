import React, { useState } from 'react';
import { 
  TrendingUp, ShieldCheck, Zap, PieChart, TreeDeciduous, Wallet, 
  Calendar, Lock, Layers, Calculator, Coins, BarChart3, 
  Users, UserCheck, Sparkles, MessageSquare, RefreshCw, ChevronRight 
} from 'lucide-react';

const App = () => {
  // --- THÔNG SỐ CỦA QUỸ LCM VIETNAM 2.0 ---
  const BASE_PRICE = 1000; 
  const reportDate = "17/03/2026";
  const closingDate = "28/02/2026";
  
  const fundData = {
    totalNav: 394978329,
    totalShares: 300000, 
    dcaAmount: 11000000,
    qdpAmount: 85000000
  };

  const navPerShare = fundData.totalNav / fundData.totalShares;
  const totalGrowth = ((navPerShare - BASE_PRICE) / BASE_PRICE * 100).toFixed(2);

  // --- QUẢN LÝ CỔ ĐÔNG ---
  const shareholders = [
    { name: "NGƯỜI A", shares: 150000, color: "bg-purple-500" },
    { name: "NGƯỜI B", shares: 90000, color: "bg-indigo-500" },
    { name: "NGƯỜI C", shares: 60000, color: "bg-fuchsia-500" },
  ];

  // --- DANH MỤC VIP WATCHLIST ---
  const coreStocks = [
    { ticker: "HPG", sector: "Thép", weight: 25, moat: "Chi phí thấp" },
    { ticker: "FPT", sector: "Công nghệ", weight: 20, moat: "Xuất khẩu phần mềm" },
    { ticker: "NLG", sector: "BĐS", weight: 15, moat: "Sạch tài chính" },
    { ticker: "ACB", sector: "Ngân hàng", weight: 20, moat: "Quản trị rủi ro" },
    { ticker: "TPB", sector: "Ngân hàng", weight: 20, moat: "Ngân hàng số" },
  ];

  const subStocks = ["NTC", "PTB", "SGN", "QNS", "QTP"];

  // --- TRỢ LÝ AI (KẾT NỐI BẢO MẬT) ---
  const [aiResponse, setAiResponse] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  
  // Lấy API Key từ biến môi trường của Vercel (giúp bảo mật)
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
          systemInstruction: { parts: [{ text: `Bạn là trợ lý Quỹ LCM 2.0 của anh Trọng. NAV/CP hiện tại: ${navPerShare.toLocaleString()}đ.` }] }
        })
      });
      const result = await response.json();
      setAiResponse(result.candidates?.[0]?.content?.parts?.[0]?.text || "AI đang bận, anh thử lại nhé.");
    } catch (err) {
      setAiResponse("Không thể kết nối với AI. Anh kiểm tra lại API Key nhé.");
    } finally {
      setIsAiLoading(false);
    }
  };

  // --- LOGIC TÍNH TOÁN VỐN ---
  const [investAmount, setInvestAmount] = useState(10000000);
  const estimatedShares = investAmount / navPerShare;

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black text-slate-900 uppercase">LCM VIETNAM</h1>
            <p className="text-[#5850EC] font-bold tracking-widest text-xs">HUUTRONG PARTNERSHIP</p>
          </div>
          <div className="bg-[#5850EC] text-white px-4 py-2 rounded-xl text-xs font-bold uppercase">
            Báo cáo: {reportDate}
          </div>
        </div>

        {/* Chỉ số chính */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-3xl shadow-sm border-b-4 border-emerald-500 text-center">
            <p className="text-xs font-bold text-slate-400 uppercase">NAV / Cổ phần</p>
            <h2 className="text-2xl font-black text-emerald-600">{navPerShare.toLocaleString(undefined, {maximumFractionDigits: 0})}đ</h2>
          </div>
          <div className="bg-[#0F172A] p-6 rounded-3xl shadow-sm border-b-4 border-amber-500 text-center">
            <p className="text-xs font-bold text-slate-400 uppercase">Tăng trưởng</p>
            <h2 className="text-2xl font-black text-emerald-400">+{totalGrowth}%</h2>
          </div>
          {/* Anh có thể thêm các thẻ khác tương tự ở đây */}
        </div>

        {/* Trợ lý AI */}
        <div className="bg-slate-900 rounded-[2.5rem] p-8 mb-8 text-white border-r-8 border-[#5850EC]">
          <h3 className="flex items-center gap-2 font-black uppercase mb-4">
            <Sparkles className="text-amber-400" /> Trợ lý chiến lược AI
          </h3>
          <div className="flex flex-col md:flex-row gap-6">
            <button 
              onClick={() => callGemini("Phân tích tình hình quỹ hiện tại")}
              className="bg-[#5850EC] px-6 py-3 rounded-2xl font-bold text-sm hover:bg-indigo-700 transition-all"
            >
              Phân tích hiệu suất ✨
            </button>
            <div className="flex-1 bg-white/5 p-6 rounded-2xl italic text-slate-300 text-sm min-h-[100px]">
              {isAiLoading ? "AI đang suy nghĩ..." : aiResponse || "Nhấn nút để AI bắt đầu tư vấn cho anh..."}
            </div>
          </div>
        </div>

        {/* Phần còn lại của giao diện (Danh mục, Quản trị vốn...) anh giữ nguyên như code cũ */}
        <div className="text-center text-slate-400 text-[10px] mt-20 uppercase tracking-[0.5em]">
          LCM VIETNAM • CONFIDENTIAL
        </div>
      </div>
    </div>
  );
};

export default App;
