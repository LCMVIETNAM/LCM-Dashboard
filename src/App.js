import React, { useState } from 'react';
import { TrendingUp, Zap, Coins, Sparkles } from 'lucide-react';

const App = () => {
  const BASE_PRICE = 1000; 
  const fundData = {
    totalNav: 394978329,
    totalShares: 300000, 
  };

  const navPerShare = fundData.totalNav / fundData.totalShares;
  const totalGrowth = ((navPerShare - BASE_PRICE) / BASE_PRICE * 100).toFixed(2);

  const [aiResponse, setAiResponse] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const apiKey = process.env.REACT_APP_GEMINI_API_KEY; 

  const callGemini = async (prompt) => {
    if (!apiKey) {
      setAiResponse("Lỗi: Chưa cấu hình API Key.");
      return;
    }
    setIsAiLoading(true);
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          systemInstruction: { parts: [{ text: `Bạn là trợ lý Quỹ LCM 2.0.` }] }
        })
      });
      const result = await response.json();
      setAiResponse(result.candidates?.[0]?.content?.parts?.[0]?.text || "AI đang bận.");
    } catch (err) {
      setAiResponse("Lỗi kết nối AI.");
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', backgroundColor: '#F8FAFC', minHeight: '100vh' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: 'white', padding: '30px', borderRadius: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <h1 style={{ color: '#1E293B', marginBottom: '5px' }}>LCM VIETNAM</h1>
        <p style={{ color: '#5850EC', fontWeight: 'bold', fontSize: '12px', letterSpacing: '2px', marginBottom: '30px' }}>HUUTRONG PARTNERSHIP</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
          <div style={{ backgroundColor: '#ECFDF5', padding: '20px', borderRadius: '16px' }}>
            <p style={{ fontSize: '10px', fontWeight: 'bold', color: '#059669', margin: '0 0 10px 0' }}>NAV / CỔ PHẦN</p>
            <h2 style={{ fontSize: '24px', margin: 0 }}>{navPerShare.toLocaleString(undefined, {maximumFractionDigits: 0})}đ</h2>
          </div>
          <div style={{ backgroundColor: '#0F172A', padding: '20px', borderRadius: '16px', color: 'white' }}>
            <p style={{ fontSize: '10px', fontWeight: 'bold', color: '#94A3B8', margin: '0 0 10px 0' }}>TĂNG TRƯỞNG</p>
            <h2 style={{ fontSize: '24px', margin: 0, color: '#34D399' }}>+{totalGrowth}%</h2>
          </div>
        </div>

        <div style={{ backgroundColor: '#1E293B', padding: '25px', borderRadius: '20px', color: 'white' }}>
          <h3 style={{ fontSize: '14px', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={16} color="#FBBF24" /> TRỢ LÝ CHIẾN LƯỢC AI
          </h3>
          <button 
            onClick={() => callGemini("Phân tích quỹ")}
            style={{ backgroundColor: '#5850EC', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', marginBottom: '15px' }}
          >
            {isAiLoading ? "Đang tính..." : "Phân tích ngay ✨"}
          </button>
          <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '12px', fontSize: '14px', fontStyle: 'italic', color: '#CBD5E1' }}>
            {aiResponse || "Chào anh Trọng! Nhấn nút để em phân tích dữ liệu."}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
