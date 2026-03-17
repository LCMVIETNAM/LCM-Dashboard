import React, { useState } from 'react';

const App = () => {
  // --- THÔNG SỐ QUỸ LCM ---
  const BASE_PRICE = 1000;
  const fundData = {
    totalNav: 394978329,
    totalShares: 300000,
    qdp: 85000000,
    dca: 11000000
  };

  const navPerShare = fundData.totalNav / fundData.totalShares;
  const totalGrowth = ((navPerShare - BASE_PRICE) / BASE_PRICE * 100).toFixed(2);

  // --- TRỢ LÝ AI ---
  const [aiResponse, setAiResponse] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const apiKey = process.env.REACT_APP_GEMINI_API_KEY;

  const callGemini = async () => {
    if (!apiKey) { setAiResponse("Lỗi: Anh chưa cấu hình API Key trên Vercel."); return; }
    setIsAiLoading(true);
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          contents: [{ parts: [{ text: `Phân tích hiệu suất quỹ tăng trưởng ${totalGrowth}% theo phong cách Warren Buffett.` }] }] 
        })
      });
      const result = await response.json();
      setAiResponse(result.candidates?.[0]?.content?.parts?.[0]?.text || "AI đang bận, anh bấm lại nhé!");
    } catch (e) { setAiResponse("Lỗi kết nối AI."); }
    finally { setIsAiLoading(false); }
  };

  return (
    <div style={{ backgroundColor: '#f3f4f6', minHeight: '100vh', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: 'white', borderRadius: '24px', padding: '30px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
        
        {/* Header */}
        <div style={{ marginBottom: '30px', borderBottom: '1px solid #e5e7eb', paddingBottom: '15px' }}>
          <h1 style={{ margin: 0, fontSize: '24px', color: '#111827', fontWeight: '900' }}>LCM VIETNAM 2.0</h1>
          <p style={{ margin: 0, color: '#4f46e5', fontWeight: 'bold', fontSize: '12px', letterSpacing: '2px' }}>HUU TRONG PARTNERSHIP</p>
        </div>

        {/* Chỉ số chính */}
        <div style={{ display: 'grid', gap: '15px', marginBottom: '30px' }}>
          <div style={{ backgroundColor: '#ecfdf5', padding: '20px', borderRadius: '20px', border: '1px solid #10b981' }}>
            <p style={{ margin: 0, fontSize: '10px', color: '#059669', fontWeight: 'bold' }}>NAV / CỔ PHẦN</p>
            <h2 style={{ margin: '5px 0 0', fontSize: '28px', color: '#064e3b' }}>{navPerShare.toLocaleString(undefined, {maximumFractionDigits: 0})}đ</h2>
          </div>

          <div style={{ backgroundColor: '#111827', padding: '20px', borderRadius: '20px', color: 'white' }}>
            <p style={{ margin: 0, fontSize: '10px', color: '#9ca3af', fontWeight: 'bold' }}>TĂNG TRƯỞNG</p>
            <h2 style={{ margin: '5px 0 0', fontSize: '28px', color: '#34d399' }}>+{totalGrowth}%</h2>
          </div>
        </div>

        {/* AI Box */}
        <div style={{ backgroundColor: '#1e293b', padding: '25px', borderRadius: '24px', color: 'white' }}>
          <h3 style={{ margin: '0 0 15px 0', fontSize: '14px' }}>✨ TRỢ LÝ CHIẾN LƯỢC AI</h3>
          <button 
            onClick={callGemini}
            style={{ width: '100%', backgroundColor: '#4f46e5', color: 'white', border: 'none', padding: '12px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', marginBottom: '15px' }}
          >
            {isAiLoading ? "ĐANG PHÂN TÍCH..." : "PHÂN TÍCH HIỆU SUẤT ✨"}
          </button>
          <div style={{ padding: '15px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '12px', fontSize: '13px', fontStyle: 'italic', lineHeight: '1.5', color: '#cbd5e1' }}>
            {aiResponse || "Chào anh Trọng! Nhấn nút để em soi xét danh mục Quỹ."}
          </div>
        </div>

        <p style={{ textAlign: 'center', marginTop: '30px', fontSize: '10px', color: '#9ca3af', letterSpacing: '3px' }}>LCM VIETNAM • 2026</p>
      </div>
    </div>
  );
};

export default App;
