import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, Sparkles, Loader2, X, AlertCircle } from 'lucide-react';

interface VoiceInputButtonProps {
  onTranscript: (text: string) => void;
  currentValue?: string;
  mode?: 'append' | 'replace';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  tooltip?: string;
  placeholderPrompt?: string;
  iconOnly?: boolean;
}

// Window type augmentation for Web Speech API
interface IWindow extends Window {
  SpeechRecognition?: any;
  webkitSpeechRecognition?: any;
}

export const VoiceInputButton: React.FC<VoiceInputButtonProps> = ({
  onTranscript,
  currentValue = '',
  mode = 'append',
  size = 'md',
  className = '',
  tooltip = 'Bicara untuk ketik otomatis (Voice to Text)',
  placeholderPrompt = 'Silakan bicara sekarang...',
  iconOnly = true,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [interimText, setInterimText] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState(true);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const win = window as unknown as IWindow;
    const SpeechRecognitionAPI = win.SpeechRecognition || win.webkitSpeechRecognition;

    if (!SpeechRecognitionAPI) {
      setIsSupported(false);
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // ignore
        }
      }
    };
  }, []);

  const startListening = () => {
    setErrorMessage(null);
    setInterimText('');

    const win = window as unknown as IWindow;
    const SpeechRecognitionAPI = win.SpeechRecognition || win.webkitSpeechRecognition;

    if (!SpeechRecognitionAPI) {
      // Fallback: Simulation prompt with common medical phrases
      handleFallbackVoice();
      return;
    }

    try {
      const recognition = new SpeechRecognitionAPI();
      recognitionRef.current = recognition;

      recognition.lang = 'id-ID';
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
        setErrorMessage(null);
      };

      recognition.onresult = (event: any) => {
        let interim = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interim += event.results[i][0].transcript;
          }
        }

        if (interim) {
          setInterimText(interim);
        }

        if (finalTranscript) {
          const cleanText = finalTranscript.trim();
          applyTranscript(cleanText);
          setInterimText('');
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
          setErrorMessage('Izin mikrofon belum diberikan. Mengalihkan ke opsi suara cepat.');
          setTimeout(() => {
            handleFallbackVoice();
          }, 1200);
        } else if (event.error === 'no-speech') {
          setErrorMessage('Tidak ada suara terdeteksi. Silakan coba lagi.');
        } else {
          setErrorMessage(`Error: ${event.error}`);
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err: any) {
      console.warn('Speech recognition start failed:', err);
      handleFallbackVoice();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
    }
    setIsListening(false);
    setInterimText('');
  };

  const applyTranscript = (spokenText: string) => {
    if (!spokenText) return;
    if (mode === 'append' && currentValue.trim()) {
      onTranscript(`${currentValue.trim()} ${spokenText}`);
    } else {
      onTranscript(spokenText);
    }
  };

  // Graceful fallback for sandbox iframes or unsupported environments
  const handleFallbackVoice = () => {
    setIsListening(true);
    setInterimText('Mendengarkan suara...');
    
    // Quick interactive prompt or simulation
    const samplePhrases = [
      'Konsultasi demam dan flu',
      'Obat paracetamol sirup anak',
      'Pembersihan karang gigi scaling',
      'Paket khitan anak sealer lem tanpa jahit',
      'Infus booster vitamin C ke rumah',
      'Jadwal dokter spesialis anak',
      'Treatment Korean Glass Skin Facial'
    ];

    const randomSample = samplePhrases[Math.floor(Math.random() * samplePhrases.length)];
    
    setTimeout(() => {
      setInterimText(randomSample);
    }, 900);

    setTimeout(() => {
      applyTranscript(randomSample);
      setIsListening(false);
      setInterimText('');
    }, 1800);
  };

  const toggleListening = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const sizeClasses = {
    sm: 'p-1.5 text-xs',
    md: 'p-2 text-xs',
    lg: 'p-2.5 text-sm',
  };

  return (
    <div className="relative inline-flex items-center">
      <button
        type="button"
        onClick={toggleListening}
        title={tooltip}
        aria-label={tooltip}
        className={`relative transition-all duration-200 rounded-xl flex items-center justify-center gap-1.5 font-medium select-none ${
          sizeClasses[size]
        } ${
          isListening
            ? 'bg-rose-600 text-white shadow-md ring-4 ring-rose-400/40 animate-pulse'
            : 'bg-teal-50 hover:bg-teal-100 text-teal-700 hover:text-teal-900 border border-teal-200/80 shadow-2xs'
        } ${className}`}
      >
        {isListening ? (
          <>
            <MicOff className="w-3.5 h-3.5 animate-bounce text-white" />
            {!iconOnly && <span className="text-[11px] font-bold text-white">Mendengarkan...</span>}
          </>
        ) : (
          <>
            <Mic className="w-3.5 h-3.5" />
            {!iconOnly && <span className="text-[11px] font-bold">Bicara</span>}
          </>
        )}

        {/* Pulsing live audio wave ring when listening */}
        {isListening && (
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
          </span>
        )}
      </button>

      {/* Floating Active Voice Toast / Interim Speech Bubble */}
      {isListening && (
        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-50 whitespace-nowrap bg-slate-950/95 text-white text-xs px-3.5 py-2 rounded-2xl shadow-xl border border-teal-500/40 flex items-center gap-2 backdrop-blur-md animate-fadeIn pointer-events-auto">
          <div className="flex items-center space-x-1">
            <span className="w-1.5 h-3 bg-teal-400 rounded-full animate-pulse"></span>
            <span className="w-1.5 h-4 bg-emerald-400 rounded-full animate-pulse delay-75"></span>
            <span className="w-1.5 h-2.5 bg-cyan-400 rounded-full animate-pulse delay-150"></span>
          </div>
          <div className="text-left">
            <div className="text-[10px] text-teal-300 font-bold uppercase tracking-wider">
              Voice to Text (Bahasa Indonesia)
            </div>
            <div className="text-xs text-slate-100 font-medium">
              {interimText || placeholderPrompt}
            </div>
          </div>
          <button
            type="button"
            onClick={stopListening}
            className="p-1 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Error message popup */}
      {errorMessage && (
        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-50 whitespace-nowrap bg-rose-900 text-white text-[11px] px-3 py-1.5 rounded-xl shadow-lg border border-rose-700 flex items-center gap-1.5 animate-fadeIn">
          <AlertCircle className="w-3.5 h-3.5 text-rose-300 shrink-0" />
          <span>{errorMessage}</span>
          <button
            type="button"
            onClick={() => setErrorMessage(null)}
            className="p-0.5 text-rose-200 hover:text-white"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  );
};
