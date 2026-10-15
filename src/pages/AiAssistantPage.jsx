import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Bot, 
  ShieldCheck, 
  Clock 
} from 'lucide-react';
import { useCarbon } from '../context/CarbonContext';
import { generateSmartRecommendations, answerStudentQuestion } from '../services/aiAssistantService';

export default function AiAssistantPage() {
  const { baseline, activities } = useCarbon();
  const { recommendations, highestCategory } = generateSmartRecommendations(baseline, activities);

  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: `Namaskara Chetan! I'm your EcoSphere AI Sustainability Coach for BMSCE (Basavanagudi, Bengaluru). I've analyzed your academic year profile (${baseline.total.toLocaleString()} kg CO₂e). In the South Bengaluru college context, your largest impact area is ${highestCategory.toUpperCase()} (~${baseline.breakdown[highestCategory]} kg). How can I help you optimize your Namma Metro Green Line commute, hostel geyser power, or canteen diet today?`,
      tags: ['BMSCE Bengaluru', 'Namma Metro', 'BESCOM Grid']
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (textToSend) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userMsg = { sender: 'user', text: query };
    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      const response = answerStudentQuestion(query, baseline);
      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: response.answer,
          savings: response.estimatedSavings,
          tags: response.tags
        }
      ]);
      setIsTyping(false);
    }, 550);
  };

  const samplePrompts = [
    'How does taking Namma Metro compare to riding my Activa to BMSCE?',
    'What are the best hostel electricity saving tips for Bengaluru weather?',
    'Why is a South Indian mess meal (Idli/Dosa/Rice) low in carbon?',
    'How can selling old VTU exam notes to a Basavanagudi Gujri shop help?'
  ];

  return (
    <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '4rem' }}>
      
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', color: '#059669', fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          <Sparkles size={16} /> BMSCE Bengaluru Campus Eco Advisor
        </div>
        <h1 style={{ fontSize: '2.25rem', color: '#0f172a' }}>AI Sustainability Assistant</h1>
        <p style={{ fontSize: '0.9375rem', color: '#64748b' }}>
          Real-time, scientifically grounded lifestyle recommendations tailored for BMSCE students in Basavanagudi and South Bengaluru.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: '2rem',
        alignItems: 'start'
      }}>
        
        {/* CHAT INTERACTION COLUMN */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '620px', padding: '0', overflow: 'hidden' }}>
          
          {/* Chat Header */}
          <div style={{
            padding: '1rem 1.5rem',
            borderBottom: '1px solid #e2e8f0',
            backgroundColor: '#f8fafc',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '2.25rem',
                height: '2.25rem',
                borderRadius: '0.5rem',
                backgroundColor: '#ecfdf5',
                color: '#059669',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Bot size={20} />
              </div>
              <div>
                <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#0f172a' }}>EcoSphere BMSCE Advisor</div>
                <div style={{ fontSize: '0.75rem', color: '#059669', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981' }} /> Connected to Chetan Rao's Profile
                </div>
              </div>
            </div>

            <span className="badge badge-emerald" style={{ fontSize: '0.7rem' }}>
              Namma Metro Ready
            </span>
          </div>

          {/* Messages Area */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            {messages.map((m, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  gap: '0.75rem',
                  alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%'
                }}
              >
                {m.sender === 'bot' && (
                  <div style={{
                    width: '2rem',
                    height: '2rem',
                    borderRadius: '50%',
                    backgroundColor: '#ecfdf5',
                    color: '#059669',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '2px'
                  }}>
                    <Bot size={16} />
                  </div>
                )}

                <div style={{
                  padding: '1rem',
                  borderRadius: '1rem',
                  backgroundColor: m.sender === 'user' ? '#059669' : '#f8fafc',
                  color: m.sender === 'user' ? '#ffffff' : '#1e293b',
                  border: m.sender === 'user' ? 'none' : '1px solid #e2e8f0',
                  fontSize: '0.9rem',
                  lineHeight: 1.5,
                  whiteSpace: 'pre-line'
                }}>
                  {m.text}

                  {m.savings && (
                    <div style={{
                      marginTop: '0.75rem',
                      padding: '0.5rem 0.75rem',
                      backgroundColor: '#ecfdf5',
                      borderRadius: '0.5rem',
                      color: '#065f46',
                      fontWeight: 700,
                      fontSize: '0.8125rem'
                    }}>
                      🌱 Estimated Savings: {m.savings}
                    </div>
                  )}

                  {m.tags && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginTop: '0.5rem' }}>
                      {m.tags.map((t, tidx) => (
                        <span key={tidx} style={{
                          fontSize: '0.7rem',
                          padding: '0.125rem 0.375rem',
                          borderRadius: '4px',
                          backgroundColor: m.sender === 'user' ? 'rgba(255,255,255,0.2)' : '#e2e8f0',
                          color: m.sender === 'user' ? '#ffffff' : '#475569'
                        }}>
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', color: '#64748b', fontSize: '0.8125rem', marginLeft: '2.75rem' }}>
                <span className="badge badge-emerald">Analyzing Namma Metro & BESCOM factors...</span>
              </div>
            )}
          </div>

          {/* Quick Prompts */}
          <div style={{ padding: '0.5rem 1rem', borderTop: '1px solid #f1f5f9', display: 'flex', gap: '0.5rem', overflowX: 'auto' }}>
            {samplePrompts.slice(0, 2).map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(p)}
                style={{
                  fontSize: '0.75rem',
                  whiteSpace: 'nowrap',
                  padding: '0.375rem 0.75rem',
                  backgroundColor: '#f1f5f9',
                  color: '#475569',
                  borderRadius: '9999px',
                  fontWeight: 600
                }}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            style={{
              padding: '1rem',
              borderTop: '1px solid #e2e8f0',
              backgroundColor: '#ffffff',
              display: 'flex',
              gap: '0.75rem'
            }}
          >
            <input
              type="text"
              placeholder="Ask about Namma Metro Green Line, BMSCE hostel power, or canteen..."
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              className="form-input"
              style={{ flex: 1 }}
            />
            <button
              type="submit"
              className="btn-primary"
              style={{ padding: '0.625rem 1.25rem' }}
            >
              <Send size={16} />
            </button>
          </form>

        </div>

        {/* TOP CURATED RECOMMENDATIONS COLUMN */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', color: '#0f172a' }}>BMSCE Action Plan</h3>
              <p style={{ fontSize: '0.8125rem', color: '#64748b' }}>Curated for South Bengaluru student routines</p>
            </div>
            <span className="badge badge-emerald">{recommendations.length} Action Items</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {recommendations.map((rec) => (
              <div key={rec.id} className="card" style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <span className={`badge ${
                    rec.category === 'food' ? 'badge-emerald' :
                    rec.category === 'transport' ? 'badge-blue' :
                    rec.category === 'energy' ? 'badge-amber' : 'badge-purple'
                  }`}>
                    {rec.category}
                  </span>
                  <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.75rem', color: '#64748b' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '2px' }}><Clock size={12} /> {rec.difficulty}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '2px', color: '#059669', fontWeight: 600 }}>{rec.costSavings}</span>
                  </div>
                </div>

                <h4 style={{ fontSize: '1.05rem', color: '#0f172a', marginBottom: '0.5rem' }}>
                  {rec.title}
                </h4>

                <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.5, marginBottom: '0.875rem' }}>
                  {rec.summary}
                </p>

                <div style={{
                  padding: '0.625rem 0.875rem',
                  backgroundColor: '#f0fdf4',
                  borderRadius: '0.5rem',
                  border: '1px solid #bbf7d0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '0.8125rem'
                }}>
                  <span style={{ fontWeight: 700, color: '#166534' }}>
                    Avoids ~{rec.impactKg} kg CO₂ / yr
                  </span>
                  <span style={{ fontSize: '0.7rem', color: '#15803d' }}>
                    Ref: {rec.sourceRef}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1.5rem', fontSize: '0.8125rem', color: '#64748b' }}>
            <ShieldCheck size={16} color="#059669" />
            <span>All AI prompts are processed client-side with zero student PII transmitted.</span>
          </div>
        </div>

      </div>

    </div>
  );
}
