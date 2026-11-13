import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, X, Bot, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { aiService } from '../services/aiService';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export const KisanMitraFab = () => {
  const { user, role } = useAuth();
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: language === 'hi'
        ? 'नमस्ते! मैं किसान मित्र एआई हूँ। मैं आपकी फसल, मंडी भाव, रोग नियंत्रण और प्लेटफॉर्म पर सहायता के लिए तैयार हूँ। आप मुझसे क्या पूछना चाहते हैं?'
        : 'Namaste! I am Kisan Mitra AI. I am here to help you with crop advice, mandi prices, disease remedies, and Farmlink operations. How can I help you today?'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechSynthesisActive, setSpeechSynthesisActive] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Quick prompt suggestions
  const quickPrompts = [
    { hi: 'गेहूँ में पीला रतुआ का इलाज क्या है?', en: 'How to control yellow rust in wheat?' },
    { hi: 'आज का आलू और प्याज का मंडी भाव?', en: 'Current mandi rate for potato and onion?' },
    { hi: 'फसल बेचने का सही समय क्या है?', en: 'When is the best time to sell my crop?' },
    { hi: 'एस्क्रो सुरक्षित भुगतान कैसे काम करता है?', en: 'How does escrow payout release work?' }
  ];

  const handleSendMessage = async (textToSend = null) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMessage = { sender: 'user', text };
    setMessages(prev => [...prev, userMessage]);
    if (!textToSend) setInputText('');
    setLoading(true);

    try {
      const langParam = language === 'hi' ? 'HI' : 'EN';
      const roleParam = role || 'FARMER';
      const res = await aiService.chatWithKisanMitra(text, langParam, roleParam);
      
      const botReply = res.data?.response || 'I am ready to help. Please try asking again.';
      setMessages(prev => [...prev, { sender: 'bot', text: botReply }]);

      // Text to speech if active
      if (speechSynthesisActive && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(botReply);
        utterance.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
        window.speechSynthesis.speak(utterance);
      }
    } catch {
      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: 'क्षमा करें, किसान मित्र सर्वर से संपर्क नहीं हो सका। कृपया पुनः प्रयास करें।'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Web Speech API Voice Recognition (STT)
  const toggleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. Please type your message.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      setInputText(speechResult);
      handleSendMessage(speechResult);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 md:bottom-8 right-4 z-40 bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-bold px-4 py-2.5 rounded-full shadow-elevated flex items-center gap-2 hover:scale-105 active:scale-95 transition-all group border-2 border-white/50"
        title="Kisan Mitra AI Assistant"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>
        <Sparkles className="w-4 h-4 text-amber-300" />
        <span className="text-xs tracking-wide font-sans">Kisan Mitra AI</span>
      </button>

      {/* Slide-in Chat Drawer / Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end sm:p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="w-full sm:w-[420px] h-[85vh] sm:h-[620px] bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-slide-up border border-slate-200">
            
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-700 to-emerald-600 px-4 py-3.5 text-white flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm leading-tight flex items-center gap-1.5">
                    <span>Kisan Mitra AI</span>
                    <span className="text-[10px] bg-amber-400 text-amber-950 font-extrabold px-1.5 py-0.2 rounded">Gemini</span>
                  </h3>
                  <p className="text-[11px] text-emerald-100">Agricultural Guidance & Support</p>
                </div>
              </div>
              
              <div className="flex items-center gap-1">
                {/* TTS Toggle */}
                <button
                  onClick={() => setSpeechSynthesisActive(!speechSynthesisActive)}
                  title={speechSynthesisActive ? 'Mute AI Voice' : 'Enable AI Voice'}
                  className="p-1.5 rounded-full hover:bg-white/20 text-white/90 transition-colors"
                >
                  {speechSynthesisActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-red-200" />}
                </button>
                {/* Close */}
                <button
                  onClick={() => {
                    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
                    setIsOpen(false);
                  }}
                  className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Quick Prompts Bar */}
            <div className="px-3 py-2 bg-emerald-50/70 border-b border-emerald-100 overflow-x-auto flex gap-2 scrollbar-none text-[11px]">
              {quickPrompts.map((p, idx) => {
                const label = language === 'hi' ? p.hi : p.en;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(label)}
                    className="whitespace-nowrap bg-white border border-emerald-200 text-emerald-800 px-2.5 py-1 rounded-full font-medium hover:bg-emerald-100 transition-colors shadow-2xs"
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Message Feed */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-emerald-700 text-white rounded-br-none shadow-sm'
                        : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-2xs'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{m.text}</p>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-none px-3.5 py-2.5 text-xs text-slate-500 flex items-center gap-2 shadow-2xs">
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>Kisan Mitra is thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-white border-t border-slate-200">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                {/* Voice Input Mic */}
                <button
                  type="button"
                  onClick={toggleVoiceInput}
                  title="Voice input (Speech to Text)"
                  className={`p-2.5 rounded-xl border transition-all ${
                    isListening
                      ? 'bg-red-500 text-white border-red-600 animate-pulse'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-emerald-50 hover:text-emerald-700'
                  }`}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>

                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={language === 'hi' ? 'यहाँ अपना प्रश्न लिखें...' : 'Type your question here...'}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />

                <button
                  type="submit"
                  disabled={!inputText.trim() || loading}
                  className="bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white p-2.5 rounded-xl shadow-sm transition-all"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
