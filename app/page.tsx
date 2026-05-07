'use client';

import { useState, useRef, useEffect } from 'react';

const mockSlides = [
  {
    id: 1,
    title: "次世代ネットワークインフラの導入",
    content: "場所を問わず安全にアクセスできる環境を構築するため、新たなセキュリティ基盤を導入します。これは今後の全社的なハードウェアリプレースの基盤ともなります。",
    icon: "◈",
    tag: "インフラ",
  },
  {
    id: 2,
    title: "クラウドネイティブな認証基盤",
    content: "従来のオンプレミス環境から脱却し、クラウドベースのID管理へ移行することで、より柔軟なアクセス制御を実現します。",
    icon: "⬡",
    tag: "セキュリティ",
  },
  {
    id: 3,
    title: "今後の研修の流れ",
    content: "本日の研修内容は以上です。不明点があれば右側のAIチューターに質問してください。理解できたら下部のボタンから完了報告を行ってください。",
    icon: "◎",
    tag: "まとめ",
  }
];

const mockUserName = "demo_user_01";

export default function TrainingMockup() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: 'こんにちは！本日の研修のAIチューターです。左のスライドを見ながら、分からないことがあれば何でも聞いてください。' }
  ]);
  const [input, setInput] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [slideAnimating, setSlideAnimating] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentSlide = mockSlides[currentSlideIndex];
  const isLastSlide = currentSlideIndex === mockSlides.length - 1;
  const progress = ((currentSlideIndex + 1) / mockSlides.length) * 100;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const changeSlide = (newIndex: number) => {
    if (newIndex < 0 || newIndex >= mockSlides.length || slideAnimating) return;
    setSlideAnimating(true);
    setTimeout(() => {
      setCurrentSlideIndex(newIndex);
      setSlideAnimating(false);
    }, 250);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input;
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        { role: 'ai', text: `ご質問ありがとうございます。「${currentSlide.title}」に関する補足ですね。（※デモ版のため固定応答です）` }
      ]);
    }, 1400);
  };

  const handleComplete = () => {
    console.log(`[API Mock] 完了報告: ユーザー=${mockUserName}, フラグ=true`);
    setIsCompleted(true);
  };

  return (
    <div style={{ fontFamily: "'Noto Sans JP', sans-serif" }} className="flex h-screen w-full overflow-hidden bg-[#0d0f14] text-white">

      {/* ── Left Panel ── */}
      <div className="w-1/2 flex flex-col p-6 gap-5 border-r border-white/[0.06]">

        {/* Header */}
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-xs font-bold shadow-lg shadow-violet-500/30">T</div>
            <span className="text-sm font-semibold tracking-wide text-white/70">TrainingOS</span>
          </div>
          <div className="text-xs text-white/30 font-mono">{currentSlideIndex + 1} / {mockSlides.length}</div>
        </div>

        {/* Progress Bar */}
        <div className="relative h-0.5 bg-white/[0.06] rounded-full overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-violet-500 to-indigo-400 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Slide Card */}
        <div
          className={`flex-1 relative rounded-2xl overflow-hidden transition-opacity duration-250 ${slideAnimating ? 'opacity-0' : 'opacity-100'}`}
          style={{
            background: 'linear-gradient(145deg, #161922 0%, #111318 100%)',
            border: '1px solid rgba(255,255,255,0.07)',
            boxShadow: '0 0 0 1px rgba(255,255,255,0.03), 0 40px 80px rgba(0,0,0,0.4)',
          }}
        >
          {/* Ambient glow */}
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-violet-600/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-10 w-48 h-48 rounded-full bg-indigo-600/8 blur-3xl pointer-events-none" />

          <div className="relative h-full flex flex-col p-10 justify-between">
            {/* Tag */}
            <div className="flex items-start justify-between">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-violet-500/15 text-violet-300 border border-violet-500/20">
                {currentSlide.tag}
              </span>
              <span className="text-4xl opacity-20 select-none">{currentSlide.icon}</span>
            </div>

            {/* Content */}
            <div className="space-y-5">
              <h1 className="text-2xl font-bold leading-snug tracking-tight text-white">
                {currentSlide.title}
              </h1>
              <p className="text-base leading-relaxed text-white/55 font-light">
                {currentSlide.content}
              </p>
            </div>

            {/* Slide dots */}
            <div className="flex gap-2">
              {mockSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => changeSlide(i)}
                  className={`h-1 rounded-full transition-all duration-300 ${i === currentSlideIndex ? 'w-6 bg-violet-400' : 'w-1.5 bg-white/20 hover:bg-white/40'}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-3">
          <button
            onClick={() => changeSlide(currentSlideIndex - 1)}
            disabled={currentSlideIndex === 0}
            className="flex-1 py-3 rounded-xl text-sm font-medium transition-all duration-200 disabled:opacity-20 disabled:cursor-not-allowed"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            ← 前へ
          </button>
          <button
            onClick={() => changeSlide(currentSlideIndex + 1)}
            disabled={currentSlideIndex === mockSlides.length - 1}
            className="flex-1 py-3 rounded-xl text-sm font-medium transition-all duration-200 disabled:opacity-20 disabled:cursor-not-allowed"
            style={{
              background: 'linear-gradient(135deg, rgba(139,92,246,0.3) 0%, rgba(99,102,241,0.3) 100%)',
              border: '1px solid rgba(139,92,246,0.3)',
            }}
          >
            次へ →
          </button>
        </div>

        {/* Complete Button */}
        <div
          className="transition-all duration-500 overflow-hidden"
          style={{ maxHeight: isLastSlide ? '120px' : '0px', opacity: isLastSlide ? 1 : 0 }}
        >
          <button
            onClick={handleComplete}
            disabled={isCompleted}
            className="w-full py-4 rounded-xl text-sm font-bold tracking-wide transition-all duration-300 relative overflow-hidden group"
            style={
              isCompleted
                ? { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.3)' }
                : {
                    background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
                    border: '1px solid rgba(22,163,74,0.5)',
                    boxShadow: '0 0 24px rgba(22,163,74,0.25)',
                  }
            }
          >
            {!isCompleted && (
              <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-xl" />
            )}
            <span className="relative">
              {isCompleted ? '✓  研修完了報告済み' : '研修の完了を報告する'}
            </span>
          </button>
          {isCompleted && (
            <button
              onClick={() => setIsCompleted(false)}
              className="w-full mt-2 text-xs text-white/20 hover:text-white/40 transition-colors py-1"
            >
              [デモ] リセット
            </button>
          )}
        </div>
      </div>

      {/* ── Right Panel: Chat ── */}
      <div className="w-1/2 flex flex-col">

        {/* Chat Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]"
          style={{ background: 'rgba(255,255,255,0.02)' }}>
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-sm shadow-lg shadow-indigo-500/20">
                ✦
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#0d0f14]" />
            </div>
            <div>
              <div className="text-sm font-semibold">AI チューター</div>
              <div className="text-xs text-white/30">オンライン</div>
            </div>
          </div>
          <div className="text-xs font-mono px-2.5 py-1 rounded-lg bg-white/5 text-white/30 border border-white/[0.06]">
            {mockUserName}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4"
          style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.1) transparent' }}>
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in`}
              style={{ animation: 'fadeUp 0.3s ease forwards', animationDelay: '0ms' }}>
              {msg.role === 'ai' && (
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs mr-2.5 mt-0.5 flex-shrink-0 shadow-sm shadow-indigo-500/20">
                  ✦
                </div>
              )}
              <div
                className="max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed"
                style={
                  msg.role === 'user'
                    ? {
                        background: 'linear-gradient(135deg, rgba(139,92,246,0.35) 0%, rgba(99,102,241,0.35) 100%)',
                        border: '1px solid rgba(139,92,246,0.3)',
                        borderBottomRightRadius: '6px',
                      }
                    : {
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.07)',
                        color: 'rgba(255,255,255,0.8)',
                        borderBottomLeftRadius: '6px',
                      }
                }
              >
                {msg.text}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex justify-start items-end gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs flex-shrink-0 shadow-sm shadow-indigo-500/20">
                ✦
              </div>
              <div className="px-4 py-3.5 rounded-2xl rounded-bl-md"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="flex gap-1 items-center">
                  {[0, 1, 2].map(i => (
                    <span key={i} className="w-1.5 h-1.5 rounded-full bg-white/40"
                      style={{ animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite` }} />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="px-6 pb-6 pt-3 border-t border-white/[0.06]">
          <form onSubmit={handleSendMessage} className="flex gap-3 items-end">
            <div className="flex-1 relative">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="質問を入力してください..."
                className="w-full px-4 py-3.5 rounded-xl text-sm bg-white/[0.06] border border-white/[0.08] placeholder-white/20 text-white outline-none transition-all duration-200 focus:border-violet-500/40 focus:bg-white/[0.08]"
                style={{ caretColor: '#8b5cf6' }}
              />
            </div>
            <button
              type="submit"
              disabled={!input.trim()}
              className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200 disabled:opacity-30"
              style={{
                background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
                boxShadow: input.trim() ? '0 0 16px rgba(139,92,246,0.35)' : 'none',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M14 8L2 2l3 6-3 6 12-6z" fill="white" />
              </svg>
            </button>
          </form>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;600;700&display=swap');
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-4px); }
        }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
      `}</style>
    </div>
  );
}
