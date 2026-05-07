// app/page.tsx
'use client';

import { useState } from 'react';

// モック用のスライドデータ
const mockSlides = [
  {
    id: 1,
    title: "次世代ネットワークインフラの導入",
    content: "場所を問わず安全にアクセスできる環境を構築するため、新たなセキュリティ基盤を導入します。これは今後の全社的なハードウェアリプレースの基盤ともなります。",
  },
  {
    id: 2,
    title: "クラウドネイティブな認証基盤",
    content: "従来のオンプレミス環境から脱却し、クラウドベースのID管理へ移行することで、より柔軟なアクセス制御を実現します。",
  },
  { // 分かりやすくするためスライドを1枚追加しました
    id: 3,
    title: "今後の研修の流れ",
    content: "本日の研修内容は以上です。不明点があれば右側のAIチューターに質問してください。理解できたら下部のボタンから完了報告を行ってください。",
  }
];

export default function TrainingMockup() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [messages, setMessages] = useState<{role: 'user'|'ai', text: string}[]>([
    { role: 'ai', text: 'こんにちは！本日の研修のAIチューターです。左のスライドを見ながら、分からないことがあれば何でも聞いてください。' }
  ]);
  const [input, setInput] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  
  const mockUserName = "demo_user_01";
  const currentSlide = mockSlides[currentSlideIndex];

  // 最後のスライドかどうかを判定するフラグ
  const isLastSlide = currentSlideIndex === mockSlides.length - 1;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages = [...messages, { role: 'user', text: input }];
    setMessages(newMessages);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: 'ai', text: `ご質問ありがとうございます。現在の「${currentSlide.title}」に関する補足ですね。（※デモ版のため固定応答です）` }
      ]);
    }, 1000);
  };

  const handleComplete = () => {
    console.log(`[API Mock] 完了報告を送信しました。 ユーザー: ${mockUserName}, フラグ: true`);
    setIsCompleted(true);
  };

  const handleReset = () => {
    setIsCompleted(false);
    console.log(`[API Mock] ステータスをリセットしました。`);
  };

  return (
    <div className="flex h-screen w-full bg-gray-50 text-gray-800">
      
      {/* 左画面：スライドビュー */}
      <div className="w-1/2 p-8 flex flex-col justify-between border-r border-gray-200">
        <div className="flex-1 bg-white shadow-lg rounded-xl flex flex-col items-center justify-center p-12 text-center transition-all duration-300">
          <h1 className="text-3xl font-bold mb-6 text-blue-600">{currentSlide.title}</h1>
          <p className="text-lg leading-relaxed">{currentSlide.content}</p>
        </div>
        
        {/* スライド操作と完了報告エリア */}
        <div className="mt-6 space-y-8">
          {/* スライド操作ボタン */}
          <div className="flex justify-between items-center">
            <button 
              onClick={() => setCurrentSlideIndex(prev => Math.max(0, prev - 1))}
              disabled={currentSlideIndex === 0}
              className="px-6 py-2 bg-gray-200 rounded-lg disabled:opacity-50 transition-colors hover:bg-gray-300"
            >
              前のスライド
            </button>
            <span className="font-medium text-gray-500">{currentSlideIndex + 1} / {mockSlides.length}</span>
            <button 
              onClick={() => setCurrentSlideIndex(prev => Math.min(mockSlides.length - 1, prev + 1))}
              disabled={currentSlideIndex === mockSlides.length - 1}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 transition-colors hover:bg-blue-700"
            >
              次のスライド
            </button>
          </div>

          {/* ★ 変更：完了ボタンエリア（最後のスライドの時だけ表示） */}
          <div className={`pt-6 border-t border-gray-200 transition-opacity duration-500 ${isLastSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className="flex flex-col items-center gap-3">
              <button
                onClick={handleComplete}
                disabled={isCompleted}
                className={`w-full py-4 text-lg font-bold rounded-xl transition-all duration-300 ${
                  isCompleted
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-green-600 text-white hover:bg-green-700 shadow-md hover:shadow-lg'
                }`}
              >
                {isCompleted ? '✓ 研修完了報告済' : '研修の完了を報告する'}
              </button>

              <div className="h-6">
                {isCompleted && isLastSlide && (
                  <button
                    onClick={handleReset}
                    className="text-sm text-gray-400 hover:text-gray-600 underline"
                  >
                    [デモ用] 完了ステータスをリセット
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 右画面：チャットビュー */}
      <div className="w-1/2 flex flex-col bg-white">
        <div className="p-4 border-b border-gray-200 bg-gray-50 font-bold flex justify-between items-center">
          <span>AI チューター</span>
          <span className="text-xs text-gray-500 font-normal">ログイン中: {mockUserName}</span>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-4 rounded-xl ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'}`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-gray-200">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="質問を入力..."
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              送信
            </button>
          </form>
        </div>
      </div>

    </div>
  );
}