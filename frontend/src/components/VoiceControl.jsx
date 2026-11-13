import React, { useState } from 'react';
import { Mic, MicOff, Sparkles, Loader2, Check } from 'lucide-react';
import { aiService } from '../services/aiService';

export const VoiceControl = ({ onListingParsed }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [parsing, setParsing] = useState(false);
  const [success, setSuccess] = useState(false);

  const startVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. Please use Google Chrome or Edge.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'hi-IN'; // Default to Hindi, also captures English/Hinglish
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsRecording(true);
      setTranscript('');
      setSuccess(false);
    };

    recognition.onresult = async (event) => {
      const capturedText = event.results[0][0].transcript;
      setTranscript(capturedText);
      setIsRecording(false);
      
      // Parse speech into structured crop listing
      setParsing(true);
      try {
        const res = await aiService.parseVoiceListing(capturedText);
        if (res.data) {
          setSuccess(true);
          if (onListingParsed) {
            onListingParsed(res.data);
          }
        }
      } catch (err) {
        console.error('Voice listing parse error:', err);
      } finally {
        setParsing(false);
      }
    };

    recognition.onerror = (e) => {
      console.error('Speech recognition error:', e);
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();
  };

  return (
    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-3.5 my-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-amber-300" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <span>Voice AI Listing</span>
              <span className="text-[10px] bg-emerald-200 text-emerald-800 px-1 rounded font-bold">बोलकर बेचें</span>
            </h4>
            <p className="text-[11px] text-slate-500">
              Speak in Hindi or English (e.g. "मेरे पास 50 क्विंटल शरबती गेहूँ ₹2400 में है")
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={startVoiceInput}
          disabled={parsing}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
            isRecording
              ? 'bg-red-500 text-white animate-pulse'
              : 'bg-emerald-700 text-white hover:bg-emerald-800'
          }`}
        >
          {parsing ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Analyzing...</span>
            </>
          ) : isRecording ? (
            <>
              <MicOff className="w-3.5 h-3.5" />
              <span>Listening...</span>
            </>
          ) : success ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-200" />
              <span>Filled!</span>
            </>
          ) : (
            <>
              <Mic className="w-3.5 h-3.5" />
              <span>Speak</span>
            </>
          )}
        </button>
      </div>

      {transcript && (
        <div className="mt-2 text-[11px] bg-white/80 p-2 rounded-lg border border-emerald-100 text-slate-700 italic">
          "{transcript}"
        </div>
      )}
    </div>
  );
};
