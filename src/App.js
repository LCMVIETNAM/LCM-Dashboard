import React, { useState } from 'react';

const App = () => {
  const [aiResponse, setAiResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const stats = { nav: 1316, growth: 31.66, qdp: "85.000.000" };

  const callAI = async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.REACT_APP_GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: "Phân tích quỹ tăng trưởng 31.66% ngắn gọn." }] }] })
      });
      const data = await res.json();
      setAiResponse(data.candidates[0].content.parts[0].text);
    } catch (e) { setAiResponse("Lỗi kết nối AI."); }
    setLoading(false);
  };

  return (
    <div style={{ backgroundColor: '#f0f2f5', minHeight: '100vh', padding: '20px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '500px', margin: '0 auto', backgroundColor: 'white', borderRadius: '30px', padding: '30px', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '5px' }}>LCM VIETNAM</h1>
        <p style={{ textAlign: 'center', color: '#4f46e5', fontWeight: 'bold', fontSize: '12px', marginBottom: '30px' }}>HUU TRONG PARTNERSHIP</p>
        
        <div style={{ backgroundColor: '#ecfdf5', padding: '20px', borderRadius: '20px', marginBottom: '15px' }}>
          <small style={{ color: '#059669', fontWeight: 'bold' }}>NAV / CỔ PHẦN</small>
          <h2 style={{ margin: '5px 0 0' }}>{stats.nav.toLocaleString()}đ</h2>
        </div>

        <div style={{ backgroundColor: '#111827', padding: '20px', borderRadius: '20px', color: 'white', marginBottom: '30px' }}>
          <small style={{ color: '#9ca3af', fontWeight: 'bold' }}>TĂNG TRƯỞNG</small>
          <h2 style={{ margin: '5px 0 0', color: '#34d399' }}>+{stats.growth}%</h2>
        </div>

        <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '20px', color: 'white' }}>
          <button onClick={callAI} style={{ width: '100%', padding: '12px', borderRadius: '12px', border: 'none', backgroundColor: '#4f46e5', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>
            {loading ? "ĐANG SOI XÉT..." : "PHÂN TÍCH AI ✨"}
          </button>
          <p style={{ fontSize: '13px', fontStyle: 'italic', marginTop: '15px', color: '#cbd5e1' }}>{aiResponse || "Chào anh Trọng!"}</p>
        </div>
      </div>
    </div>
  );
};
export default App;
