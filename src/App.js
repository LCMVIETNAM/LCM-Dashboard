import React, { useState } from 'react';

// Định dạng giao diện trực tiếp để tránh lỗi CSS
const styles = {
  container: { padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#F0F2F5', minHeight: '100vh' },
  card: { maxWidth: '900px', margin: '0 auto', backgroundColor: 'white', borderRadius: '24px', padding: '30px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' },
  header: { borderBottom: '2px solid #EEE', paddingBottom: '20px', marginBottom: '30px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' },
  statBox: { padding: '20px', borderRadius: '20px', color: 'white' },
  aiSection: { backgroundColor: '#1A202C', color: 'white', padding: '25px', borderRadius: '24px', position: 'relative' },
  button: { backgroundColor: '#5850EC', color: 'white', border: 'none', padding: '12px 25px', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' }
};

const App = () => {
  const BASE_PRICE = 1000;
  const fundData = {
    totalNav: 394978329,
    totalShares: 300000,
    qdp: 85000000,
    dca: 11000000
  };

  const navPerShare = fundData.totalNav / fundData.totalShares;
  const totalGrowth = ((navPerShare - BASE_PRICE) / BASE_PRICE * 100).toFixed(2);

  const [aiResponse, setAiResponse] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const apiKey = process.env.REACT_APP_GEMINI_API_KEY;

  const callGemini = async () => {
    if (!apiKey) { setAiResponse("Lỗi: Anh chưa dán API Key vào Vercel rồi!"); return; }
    setIsAiLoading(true);
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: "Hãy phân tích hiệu suất quỹ tăng trưởng 31.66% và đưa ra 1 lời khuyên đầu tư ngắn gọn theo phong cách Warren Buffett." }] }] })
      });
      const result = await response.json();
      setAiResponse(result.candidates?.[0]?.content?.parts?.[0]?.text || "AI đang bận, anh bấm lại nhé!");
    } catch (e) { setAiResponse("Lỗi kết nối AI."); }
    finally { setIsAiLoading(false); }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={{ margin: 0, fontSize: '28px', color: '#1A202C' }}>LCM VIETNAM 2.0</h1>
          <p style={{ margin: '5px 0 0', color: '#5850EC', fontWeight: 'bold', letterSpacing: '2px', fontSize: '12px' }}>HUUTRONG PARTNERSHIP</p>
        </div>

        <div style={styles.grid}>
          <div style={{ ...styles.statBox, backgroundColor: '#059669' }}>
            <p style={{ margin: 0, fontSize: '11px', opacity: 0.8 }}>NAV / CỔ PHẦN</p>
            <h2 style={{ margin: '10px 0 0', fontSize: '24px' }}>{navPerShare.toLocaleString(undefined, {maximumFractionDigits: 0})}đ</h2>
          </div>
          <div style={{ ...styles.statBox, backgroundColor: '#1A202C' }}>
            <p style={{ margin: 0, fontSize: '11px', opacity:
