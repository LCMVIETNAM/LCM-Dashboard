import React, { useState } from 'react';

const App = () => {
  // --- DỮ LIỆU QUỸ ---
  const BASE_PRICE = 1000;
  const fundData = {
    totalNav: 394978329,
    totalShares: 300000,
    qdp: 85000000
  };

  const navPerShare = fundData.totalNav / fundData.totalShares;
  const totalGrowth = ((navPerShare - BASE_PRICE) / BASE_PRICE * 100).toFixed(2);

  // --- XỬ LÝ AI ---
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
          contents: [{ parts: [{ text: `Phân tích hiệu suất quỹ tăng trưởng ${totalGrowth}% theo phong cách đầu tư giá trị.` }] }] 
        })
      });
      const result = await response.json();
      setAiResponse(result.candidates?.[0]?.content?.parts?.[0]?.text || "AI đang bận, anh bấm lại nhé!");
    } catch (e) { setAiResponse("Lỗi kết nối AI."); }
    finally { setIsAiLoading(false); }
  };

  // --- PHẦN GIAO DIỆN (ĐÃ FIX LỖI TRÀN CHỮ) ---
  return (
    <div style={{ backgroundColor: '#f0f2f5', minHeight: '100vh', padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ width: '100%', maxWidth: '500px', backgroundColor: 'white', borderRadius: '30px', padding: '30px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', marginTop: '20px' }}>
        
        {/* Tiêu đề */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ margin: '0', fontSize: '28px', fontWeight: '900', color: '#1a202c', letterSpacing: '-1px' }}>LCM VIETNAM</h1>
          <p style={{ margin: '5px 0 0', color: '#4f46e5', fontWeight: 'bold', fontSize: '12px', letterSpacing: '3px' }}>HUU TRONG PARTNERSHIP</p>
        </div>

        {/* Chỉ số chính */}
        <div style={{ marginBottom: '20px', backgroundColor: '#ecfdf5', padding: '25px', borderRadius: '25px', borderLeft: '8px solid #10b981' }}>
          <p style={{ margin: '0', fontSize: '11px', color: '#059669', fontWeight: 'bold', textTransform: 'uppercase' }}>NAV / Cổ phần</p>
          <h2 style={{ margin: '10px 0 0', fontSize: '32px', color: '#064e3b', fontWeight: '900' }}>{navPerShare.toLocaleString(undefined, {maximumFractionDigits: 0})}đ</h2>
        </div>

        <div style={{ marginBottom: '40px', backgroundColor: '#111827', padding: '25px', borderRadius: '25px', borderLeft: '8px solid #f59e0b' }}>
          <p style={{ margin: '0', fontSize: '11px', color: '#9ca3af', fontWeight: 'bold', textTransform: 'uppercase' }}>Tỷ lệ tăng trưởng</p>
          <h2 style={{ margin: '10px 0 0', fontSize: '32px', color: '#10b981', fontWeight: '900' }}>+{totalGrowth}%</h2>
        </div>

        {/* Khu vực AI */}
        <div style={{ backgroundColor: '#1e293b', padding: '30px', borderRadius: '30px', color: 'white' }}>
          <h3 style={{ margin: '0 0 20px 0', fontSize: '14px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px' }}>✨ TRỢ LÝ CHIẾN LƯỢC AI</h3>
          <button 
            onClick={callGemini}
            style={{ width: '100%', backgroundColor: '#4f46e5', color: 'white', border: 'none', padding: '15px', borderRadius: '15px', fontWeight: 'bold', cursor: 'pointer', marginBottom: '20px', fontSize: '14px' }}
          >
            {isAiLoading ? "ĐANG PHÂN TÍCH..." : "PHÂN TÍCH HIỆU SUẤT ✨"}
          </button>
          <div style={{ padding: '20px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '15px', fontSize: '14px', fontStyle: 'italic', lineHeight: '1.6', color: '#cbd5e1', minHeight: '80px' }}>
            {aiResponse || "Chào anh Trọng! Nhấn nút để em soi xét danh mục Quỹ."}
          </div>
        </div>

        <p style={{ textAlign: 'center', marginTop: '40px', fontSize: '10px', color: '#9ca3af', letterSpacing: '4px', fontWeight: 'bold' }}>LCM VIETNAM • 2026</p>
      </div>
    </div>
  );
};

export default App;
