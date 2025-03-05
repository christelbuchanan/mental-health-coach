import React, { useState } from 'react'
import { Heart, MessageCircle, Brain, Sparkles, Info } from 'lucide-react'
import DogCharacter from './components/DogCharacter'
import ChatInterface from './components/ChatInterface'
import MentalHealthTips from './components/MentalHealthTips'
import AboutSection from './components/AboutSection'
import ProgressTracker from './components/ProgressTracker'

function App() {
  const [activeTab, setActiveTab] = useState('chat')
  const [mood, setMood] = useState('happy')
  const [progress, setProgress] = useState({
    streak: 3,
    completedActivities: 12,
    moodHistory: [3, 4, 3, 5, 4, 4, 3]
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 flex flex-col">
      <header className="bg-white shadow-sm p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Heart className="text-pink-500" size={24} />
            <h1 className="text-xl font-bold text-purple-800">Pawsitive Mindset</h1>
          </div>
          <div className="text-sm text-purple-700 font-medium">
            Day streak: {progress.streak} 🔥
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto p-4 flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3 flex flex-col items-center">
          <DogCharacter mood={mood} />
          <div className="mt-4 text-center">
            <h2 className="text-xl font-bold text-purple-800">Buddy</h2>
            <p className="text-purple-600">Your Mental Health Companion</p>
          </div>
        </div>

        <div className="md:w-2/3 bg-white rounded-xl shadow-md overflow-hidden">
          <div className="flex border-b">
            <button 
              onClick={() => setActiveTab('chat')}
              className={`flex-1 py-3 px-4 flex justify-center items-center gap-2 ${activeTab === 'chat' ? 'bg-purple-100 text-purple-800 font-medium' : 'text-gray-600 hover:bg-purple-50'}`}
            >
              <MessageCircle size={18} />
              <span>Chat</span>
            </button>
            <button 
              onClick={() => setActiveTab('tips')}
              className={`flex-1 py-3 px-4 flex justify-center items-center gap-2 ${activeTab === 'tips' ? 'bg-purple-100 text-purple-800 font-medium' : 'text-gray-600 hover:bg-purple-50'}`}
            >
              <Brain size={18} />
              <span>Mental Health Tips</span>
            </button>
            <button 
              onClick={() => setActiveTab('progress')}
              className={`flex-1 py-3 px-4 flex justify-center items-center gap-2 ${activeTab === 'progress' ? 'bg-purple-100 text-purple-800 font-medium' : 'text-gray-600 hover:bg-purple-50'}`}
            >
              <Sparkles size={18} />
              <span>Progress</span>
            </button>
            <button 
              onClick={() => setActiveTab('about')}
              className={`flex-1 py-3 px-4 flex justify-center items-center gap-2 ${activeTab === 'about' ? 'bg-purple-100 text-purple-800 font-medium' : 'text-gray-600 hover:bg-purple-50'}`}
            >
              <Info size={18} />
              <span>About</span>
            </button>
          </div>

          <div className="p-4">
            {activeTab === 'chat' && <ChatInterface setMood={setMood} />}
            {activeTab === 'tips' && <MentalHealthTips />}
            {activeTab === 'progress' && <ProgressTracker progress={progress} />}
            {activeTab === 'about' && <AboutSection />}
          </div>
        </div>
      </main>

      <footer className="bg-white p-4 text-center text-sm text-gray-500">
        <p>Pawsitive Mindset - Your Mental Health Companion</p>
        <p className="text-xs mt-1">This is an educational tool and not a substitute for professional mental health care.</p>
      </footer>
    </div>
  )
}

export default App
