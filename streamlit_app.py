import React, { useState } from 'react';
import { 
  TrendingUp, 
  ShieldCheck, 
  Zap, 
  PieChart, 
  TreeDeciduous, 
  Wallet, 
  Calendar, 
  CheckCircle2, 
  Lock, 
  Layers, 
  Calculator, 
  Coins,
  BarChart3,
  Users,
  UserCheck,
  Sparkles,
  MessageSquare,
  RefreshCw,
  ChevronRight
} from 'lucide-react';

const App = () => {
  // --- THÔNG SỐ CỐ ĐỊNH (CONFIG) ---
  const BASE_PRICE = 1000; // Mệnh giá khởi điểm: 1.000đ/cp
  const reportDate = "17/03/2026";
  const closingDate = "28/02/2026";
  
  const fundData = {
    totalNav: 394978329,
    totalShares: 300000, 
    dcaAmount: 11000000,
    qdpAmount: 85000000
  };

  // --- QUY ĐỔI CHỈ SỐ ---
  const navPerShare = fundData.totalNav / fundData.totalShares;
  const totalGrowth = ((navPerShare - BASE_PRICE) / BASE_PRICE * 100).toFixed(2);

  // --- DỮ LIỆU CỔ ĐÔNG ---
  const shareholders = [
    { name: "NGƯỜI A", shares: 150000, color: "bg-purple-500" },
    { name: "NGƯỜI B", shares: 90000, color: "bg-indigo-500" },
    { name: "NGƯỜI C", shares: 60000, color: "bg-fuchsia-500" },
  ];

  // --- DANH MỤC TÀI SẢN ---
  const coreStocks = [
    { ticker: "HPG", sector: "Thép", weight: 25, moat: "Chi phí thấp & Chuỗi giá trị" },
    { ticker: "FPT", sector: "Công nghệ", weight: 20, moat: "Hệ sinh thái & Xuất khẩu phần mềm" },
    { ticker: "NLG", sector: "BĐS", weight: 15, moat: "Sạch tài chính & Sản phẩm thực" },
    { ticker: "ACB", sector: "Ngân hàng", weight: 20, moat: "Quản trị rủi ro hàng đầu" },
    { ticker: "TPB", sector: "Ngân hàng", weight: 20, moat: "Tiên phong Ngân hàng số" },
  ];

  const subStocks = ["NTC", "PTB", "SGN", "QNS", "QTP"];

  // --- TRỢ LÝ CHIẾN LƯỢC AI (GEMINI) ---
  const [aiResponse, setAiResponse] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");

  const apiKey = ""; // API key được môi trường cung cấp

  const callGemini = async (prompt) => {
    setIsAiLoading(true);
    setAiError("");
    setAiResponse("");

    const systemPrompt = `Bạn là chuyên gia phân tích đầu tư cao cấp của Quỹ LCM VIETNAM.
    Triết lý: Đầu tư giá trị (Warren Buffett) và chiến lược HUUTRONG PARTNERSHIP.
    Dữ liệu: NAV/CP = ${navPerShare.toLocaleString()}đ, Tăng trưởng = ${totalGrowth}%.
    Danh mục Core: HPG, FPT, NLG, ACB, TPB.
    Hãy phản hồi bằng tiếng Việt, súc tích, chuyên nghiệp và truyền cảm hứng.`;

    const fetchWithRetry = async (retries = 5, delay = 1000) => {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            systemInstruction: { parts: [{ text: systemPrompt }] }
          })
        });
        if (!response.ok) throw new Error('API Error');
        return await response.json();
      } catch (err) {
        if (retries > 0) {
          await new Promise(res => setTimeout(res, delay));
          return fetchWithRetry(retries - 1, delay * 2);
        }
        throw err;
      }
    };

    try {
      const result = await fetchWithRetry();
      const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
      setAiResponse(text || "AI không phản hồi.");
    } catch (err) {
      setAiError("Lỗi kết nối AI. Vui lòng kiểm tra lại.");
    } finally {
      setIsAiLoading(false);
    }
  };

  // --- LOGIC TÍNH TOÁN VỐN ---
  const [investAmount, setInvestAmount] = useState(10000000);
  const handleInvestChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setInvestAmount(value === "" ? 0 : parseInt(value, 10));
  };
  const estimatedShares = investAmount / navPerShare;

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 p-4 md:p-8">
      {/* HEADER: LCM VIETNAM / HUUTRONG PARTNERSHIP */}
      <div className="max-w-6xl mx-auto mb-10 flex flex-col md:flex-row md:items-start justify-between gap-6 px-2">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="bg-[#5850EC] w-14 h-14 rounded-[1.25rem] text-white flex items-center justify-center font-black text-2xl shadow-xl shadow-indigo-100 shrink-0">
              LT
            </div>
            <div>
              <h1 className="text-[28px] font-black tracking-tighter text-[#1E293B] leading-none uppercase">
                LCM VIETNAM
              </h1>
              <div className="text-[11px] font-black text-[#5850EC] uppercase tracking-[0.4em] mt-1.5">
                HUUTRONG PARTNERSHIP
              </div>
            </div>
          </div>
          <div className="space-y-1 ml-1">
            <div className="flex items-center gap-2 text-[13px] font-black text-slate-600 uppercase tracking-wide">
              <Calendar size={15} className="text-[#5850EC]" /> BÁO CÁO ĐỊNH KỲ • {reportDate}
            </div>
            <div className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
              (SỐ LIỆU CHỐT SỔ NGÀY {closingDate})
            </div>
          </div>
        </div>
        
        <div className="flex gap-2 self-end md:self-start">
          <div className="bg-[#5850EC] text-white px-6 py-3 rounded-2xl text-[11px] font-black flex items-center gap-2 shadow-lg shadow-indigo-100 uppercase">
            <Zap size={16} className="text-amber-400 fill-amber-400" /> KỶ LUẬT LCM 2.0
          </div>
        </div>
      </div>

      {/* 4 THẺ CHỈ SỐ CHÍNH */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-yellow-50 p-6 rounded-[2.5rem] border border-yellow-100 shadow-sm relative overflow-hidden border-b-4 border-yellow-400">
          <p className="text-yellow-600 text-[10px] font-black uppercase tracking-widest mb-1 opacity-70">Tổng NAV Quỹ</p>
          <h3 className="text-[22px] font-black text-yellow-800 tracking-tight">{fundData.totalNav.toLocaleString()}đ</h3>
          <BarChart3 className="absolute -right-4 -bottom-4 text-yellow-200 w-24 h-24" />
        </div>
        
        <div className="bg-purple-50 p-6 rounded-[2.5rem] border border-purple-100 shadow-sm relative overflow-hidden border-b-4 border-purple-500">
          <p className="text-purple-600 text-[10px] font-black uppercase tracking-widest mb-1 opacity-70">Cổ phần lưu hành</p>
          <h3 className="text-[22px] font-black text-purple-800 tracking-tight">{fundData.totalShares.toLocaleString()} LCM</h3>
          <PieChart className="absolute -right-4 -bottom-4 text-purple-200 w-24 h-24" />
        </div>

        <div className="bg-emerald-50 p-6 rounded-[2.5rem] border border-emerald-100 shadow-sm relative overflow-hidden border-b-4 border-emerald-500">
          <p className="text-emerald-500 text-[10px] font-black uppercase tracking-widest mb-1 opacity-70">NAV / Cổ phần</p>
          <h3 className="text-[26px] font-black text-emerald-700 tracking-tight">{navPerShare.toLocaleString(undefined, {maximumFractionDigits: 0})}đ</h3>
          <Coins className="absolute -right-4 -bottom-4 text-emerald-200 w-24 h-24" />
        </div>

        <div className="bg-[#0F172A] p-6 rounded-[2.5rem] border border-slate-800 shadow-xl border-b-4 border-amber-500 text-center flex flex-col justify-center relative overflow-hidden">
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1 italic opacity-80">Tăng trưởng từ gốc</p>
          <h3 className="text-[28px] font-black tracking-tight text-emerald-400">+{totalGrowth}%</h3>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-tighter italic opacity-60">(Mốc 1.000đ/cp)</p>
          <TrendingUp className="absolute -right-2 -bottom-2 text-white opacity-[0.03] w-20 h-20" />
        </div>
      </div>

      {/* AI STRATEGY ASSISTANT ✨ */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-[2.5rem] border border-slate-800 p-8 shadow-2xl relative overflow-hidden border-r-8 border-[#5850EC]">
          <div className="relative z-10 flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-[#5850EC] p-2 rounded-xl shadow-lg">
                  <Sparkles className="text-white" size={24} />
                </div>
                <h2 className="text-white font-black uppercase tracking-widest text-sm">Trợ lý Chiến lược AI ✨</h2>
              </div>
              <p className="text-slate-400 text-xs font-medium leading-relaxed mb-6 italic">
                Phân tích dữ liệu & Soạn thông điệp cổ đông chuyên nghiệp cùng Gemini AI.
              </p>
              <div className="space-y-3">
                <button 
                  onClick={() => callGemini("Phân tích hiệu suất tăng trưởng quỹ và đưa ra 3 lời khuyên chiến lược.")}
                  disabled={isAiLoading}
                  className="w-full flex items-center justify-between bg-white/5 hover:bg-white/10 border border-white/10 p-3 rounded-2xl transition-all group"
                >
                  <span className="text-white text-[11px] font-black uppercase tracking-tight">Phân tích hiệu suất ✨</span>
                  <ChevronRight size={16} className="text-[#5850EC] group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => callGemini("Soạn một bức thư ngắn gửi các cổ đông A, B, C về tình hình tài sản và triết lý nắm giữ cổ thụ.")}
                  disabled={isAiLoading}
                  className="w-full flex items-center justify-between bg-white/5 hover:bg-white/10 border border-white/10 p-3 rounded-2xl transition-all group"
                >
                  <span className="text-white text-[11px] font-black uppercase tracking-tight">Thư gửi cổ đông ✨</span>
                  <ChevronRight size={16} className="text-[#5850EC] group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            <div className="flex-1 bg-white/5 border border-white/10 rounded-[2rem] p-6 min-h-[180px] flex flex-col overflow-hidden relative">
              {isAiLoading ? (
                <div className="flex-1 flex flex-col items-center justify-center space-y-4 animate-pulse">
                  <RefreshCw className="text-[#5850EC] animate-spin" size={32} />
                  <p className="text-[#5850EC] text-[10px] font-black uppercase tracking-widest">Đang tính toán chiến lược...</p>
                </div>
              ) : aiError ? (
                <div className="flex-1 flex items-center justify-center text-rose-500 font-bold text-xs uppercase">{aiError}</div>
              ) : aiResponse ? (
                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar text-slate-300 text-[13px] leading-relaxed whitespace-pre-line italic font-medium">
                  {aiResponse}
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center opacity-30">
                  <MessageSquare className="text-slate-500 mb-2" size={40} />
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest italic">Chọn chức năng để AI bắt đầu tư vấn</p>
                </div>
              )}
            </div>
          </div>
          <Sparkles className="absolute -right-4 -bottom-4 text-white opacity-[0.02] w-60 h-60" />
        </div>
      </div>

      {/* CƠ CẤU SỞ HỮU CỔ ĐÔNG */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <Users className="text-purple-600" size={20} />
            <h2 className="text-sm font-black uppercase tracking-widest text-slate-800 tracking-[0.1em]">Cơ cấu sở hữu cổ đông</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {shareholders.map((person, idx) => (
              <div key={idx} className="relative group">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-black text-slate-400 uppercase flex items-center gap-2">
                    <UserCheck size={14} className="text-purple-400" /> {person.name}
                  </span>
                  <span className="text-xs font-black text-purple-700 px-2 py-0.5 bg-purple-50 rounded-lg">
                    {((person.shares / fundData.totalShares) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-[22px] font-black text-slate-800 tracking-tight">{person.shares.toLocaleString()}</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">LCM</span>
                </div>
                <div className="mt-4 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-50 shadow-inner">
                  <div 
                    className={`h-full ${person.color} transition-all duration-1000 shadow-[0_0_8px_rgba(168,85,247,0.3)]`} 
                    style={{ width: `${(person.shares / fundData.totalShares) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BODY CONTENT */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          
          {/* ƯỚC TÍNH GÓP VỐN (LCM) */}
          <div className="bg-amber-400 rounded-[2.5rem] p-8 text-slate-900 shadow-xl shadow-amber-200/50 relative overflow-hidden border border-amber-300">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <Calculator size={140} />
            </div>
            <div className="relative z-10">
              <h2 className="text-xl font-black mb-1 flex items-center gap-3 tracking-tight uppercase">
                <Calculator size={24} className="text-amber-900" /> ƯỚC TÍNH GÓP VỐN (LCM)
              </h2>
              <p className="text-amber-900/70 text-[11px] mb-8 font-black leading-relaxed uppercase tracking-widest italic leading-none">
                Tính toán lượng cổ phần theo giá trị NAV chốt sổ hiện tại.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-900 block opacity-60">SỐ TIỀN NẠP DỰ KIẾN (VND)</label>
                  <div className="relative group">
                    <input 
                      type="text" 
                      value={investAmount.toLocaleString('en-US')} 
                      onChange={handleInvestChange}
                      className="w-full bg-white/40 border-2 border-amber-600/30 rounded-2xl p-4 text-3xl font-black text-slate-900 outline-none focus:border-[#5850EC] focus:bg-white/60 transition-all text-center shadow-inner"
                    />
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 font-black text-amber-900 text-xl">đ</div>
                  </div>
                </div>
                <div className="bg-amber-500/20 backdrop-blur-md border border-amber-600/20 rounded-[2rem] p-7 text-center shadow-inner">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-900 mb-2 opacity-60">SỐ LCM DỰ KIẾN NHẬN ĐƯỢC</p>
                  <div className="text-[40px] font-black text-slate-900 tracking-tighter leading-none mb-2">
                    {Math.floor(estimatedShares).toLocaleString()}
                  </div>
                  <div className="text-[10px] font-black text-amber-900 uppercase tracking-widest opacity-60 italic">Cổ phần quy đổi</div>
                </div>
              </div>
            </div>
          </div>

          {/* DANH MỤC CORE */}
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-white">
              <h2 className="text-xl font-black flex items-center gap-3 text-slate-800 uppercase tracking-tighter">
                <TreeDeciduous className="text-emerald-600" /> Danh mục tài sản CORE
              </h2>
              <div className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[10px] font-black tracking-widest">CHỦ LỰC</div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Cổ phiếu</th>
                    <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Tỷ trọng</th>
                    <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Lợi thế (Moat)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {coreStocks.map((stock, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-5">
                        <div className="font-black text-slate-800 text-[17px] tracking-tight">{stock.ticker}</div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{stock.sector}</div>
                      </td>
                      <td className="p-5 text-center">
                        <span className="px-3 py-1 bg-white text-slate-600 rounded-lg font-black text-[12px] border border-slate-200 shadow-sm">{stock.weight}%</span>
                      </td>
                      <td className="p-5 text-[13px] font-medium text-slate-500 italic leading-snug">{stock.moat}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* DANH MỤC VỆ TINH */}
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 p-8">
            <h2 className="text-lg font-black flex items-center gap-3 text-slate-800 uppercase tracking-tighter mb-6">
              <Layers className="text-amber-500" /> Danh mục tài sản VỆ TINH (SUB)
            </h2>
            <div className="flex flex-wrap gap-4 items-center">
              {subStocks.map((ticker, idx) => (
                <div key={idx} className="flex items-center gap-2.5 bg-slate-50 border border-slate-100 px-7 py-4 rounded-2xl group hover:border-amber-400 hover:bg-white transition-all shadow-sm">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.4)]"></div>
                  <span className="font-black text-slate-700 text-lg tracking-tight group-hover:text-amber-600 uppercase">{ticker}</span>
                </div>
              ))}
              <div className="flex-1 text-right">
                <p className="text-[10px] font-black text-slate-300 uppercase italic tracking-widest">Luân phiên chiến thuật</p>
              </div>
            </div>
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="space-y-8">
          {/* QUẢN TRỊ VỐN */}
          <div className="bg-[#1E293B] rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden border-b-8 border-[#5850EC]">
            <h2 className="text-lg font-black mb-10 flex items-center gap-2 justify-center relative z-10 uppercase tracking-tighter">
              <Wallet className="text-[#5850EC]" /> QUẢN TRỊ VỐN
            </h2>
            <div className="space-y-8 relative z-10">
              <div className="bg-slate-800/60 rounded-[2rem] p-6 border border-slate-700/50 shadow-inner group">
                <p className="text-[10px] font-black text-slate-400 uppercase mb-2 tracking-[0.2em]">Quỹ Dự Phòng (QDP)</p>
                <div className="flex justify-between items-end mb-3">
                  <p className="text-2xl font-black text-white tracking-tight">{fundData.qdpAmount.toLocaleString()}đ</p>
                  <Lock size={18} className="text-amber-400 mb-1 group-hover:animate-bounce" />
                </div>
                <div className="mt-2 h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-700/30">
                  <div className="bg-[#5850EC] h-full w-[21%] shadow-[0_0_12px_rgba(88,80,236,0.5)]"></div>
                </div>
                <p className="text-[9px] text-slate-500 font-black uppercase mt-3 italic tracking-wider opacity-60 text-center">Khóa két - Đợi sập sâu</p>
              </div>
              <div className="bg-emerald-500/10 rounded-[2rem] p-6 border border-emerald-500/20 shadow-inner group">
                <p className="text-[10px] font-black text-emerald-400 uppercase mb-2 tracking-[0.2em]">Túi Định Kỳ</p>
                <div className="flex justify-between items-center">
                  <p className="text-2xl font-black text-emerald-400 tracking-tight">{fundData.dcaAmount.toLocaleString()}đ</p>
                  <Zap size={18} className="text-amber-400 opacity-30 group-hover:opacity-100" />
                </div>
              </div>
            </div>
            <ShieldCheck size={160} className="absolute -bottom-12 -right-12 text-white opacity-[0.02] pointer-events-none" />
          </div>
          
          {/* PARTNER CARD */}
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 p-10 text-center border-b-8 border-[#5850EC] relative overflow-hidden group">
            <h3 className="font-black mb-5 text-xl text-[#1E293B] uppercase italic tracking-tighter relative z-10">Tâm Thế Đối Tác</h3>
            <div className="w-12 h-1.5 bg-[#5850EC] mx-auto mb-6 rounded-full opacity-30 group-hover:w-20 transition-all"></div>
            <p className="text-[15px] font-black text-slate-500 italic leading-relaxed relative z-10 px-1">"Giá là thứ bạn trả, giá trị là thứ bạn nhận được."</p>
            <div className="mt-10 pt-10 border-t border-slate-50 relative z-10">
              <div className="text-[10px] font-black text-[#5850EC] uppercase tracking-[0.3em] mb-2 opacity-60">Managing Partner</div>
              <div className="text-[22px] font-black tracking-[0.1em] text-[#1E293B] uppercase leading-none">TRAN HUU TRONG</div>
            </div>
            <TrendingUp size={100} className="absolute -bottom-6 -left-6 text-slate-50 opacity-40 group-hover:scale-110 transition-transform duration-700" />
          </div>
        </div>
      </div>

      <footer className="max-w-6xl mx-auto mt-16 text-center text-slate-400 text-[11px] font-black uppercase tracking-[0.8em] opacity-30 pb-12">
        LCM VIETNAM • HUUTRONG PARTNERSHIP • CONFIDENTIAL DOCUMENT
      </footer>

      {/* CUSTOM STYLES */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(88, 80, 236, 0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(88, 80, 236, 0.4); }
      `}</style>
    </div>
  );
};

export default App;
