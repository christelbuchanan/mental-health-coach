import React, { useState } from 'react'
import { ArrowRight, ArrowLeft } from 'lucide-react'

const MentalHealthTips: React.FC = () => {
  const [currentCategory, setCurrentCategory] = useState('daily')
  
  const categories = [
    { id: 'daily', name: 'Daily Practices' },
    { id: 'anxiety', name: 'Anxiety Management' },
    { id: 'mood', name: 'Mood Boosters' },
    { id: 'sleep', name: 'Sleep Hygiene' },
    { id: 'stress', name: 'Stress Relief' }
  ]
  
  const tips = {
    daily: [
      {
        title: "Practice Mindfulness",
        description: "Take 5 minutes each day to sit quietly and focus on your breath. Notice sensations, thoughts, and feelings without judgment.",
        icon: "🧘‍♀️"
      },
      {
        title: "Gratitude Journal",
        description: "Write down three things you're grateful for each day. This simple practice can shift your focus to the positive aspects of life.",
        icon: "📓"
      },
      {
        title: "Move Your Body",
        description: "Even a short 10-minute walk can boost your mood and energy levels through the release of endorphins.",
        icon: "🚶‍♂️"
      }
    ],
    anxiety: [
      {
        title: "4-7-8 Breathing",
        description: "Inhale for 4 seconds, hold for 7 seconds, exhale for 8 seconds. This pattern helps activate your parasympathetic nervous system.",
        icon: "🫁"
      },
      {
        title: "Grounding Technique",
        description: "Use the 5-4-3-2-1 method: Acknowledge 5 things you see, 4 things you can touch, 3 things you hear, 2 things you smell, and 1 thing you taste.",
        icon: "🌱"
      },
      {
        title: "Worry Time",
        description: "Schedule a specific 15-minute 'worry time' each day. When worries arise outside this time, note them down for later.",
        icon: "⏰"
      }
    ],
    mood: [
      {
        title: "Nature Connection",
        description: "Spend time in natural settings. Research shows even 20 minutes in nature can significantly improve mood.",
        icon: "🌳"
      },
      {
        title: "Acts of Kindness",
        description: "Doing something nice for others boosts your own happiness. Try one small act of kindness each day.",
        icon: "💝"
      },
      {
        title: "Creative Expression",
        description: "Engage in creative activities like drawing, writing, or music. These activities can help process emotions and boost mood.",
        icon: "🎨"
      }
    ],
    sleep: [
      {
        title: "Consistent Schedule",
        description: "Go to bed and wake up at the same time every day, even on weekends, to regulate your body's internal clock.",
        icon: "🛌"
      },
      {
        title: "Screen-Free Hour",
        description: "Avoid screens at least one hour before bedtime. The blue light can interfere with melatonin production.",
        icon: "📱"
      },
      {
        title: "Bedtime Routine",
        description: "Create a relaxing pre-sleep ritual: reading, gentle stretching, or a warm bath can signal to your body it's time to wind down.",
        icon: "🌙"
      }
    ],
    stress: [
      {
        title: "Progressive Muscle Relaxation",
        description: "Tense and then release each muscle group in your body, starting from your toes and working up to your head.",
        icon: "💪"
      },
      {
        title: "Limit News Consumption",
        description: "Set boundaries around how much news you consume, especially before bedtime or first thing in the morning.",
        icon: "📰"
      },
      {
        title: "Connect Socially",
        description: "Reach out to a friend or family member. Social connection is one of the strongest buffers against stress.",
        icon: "👥"
      }
    ]
  }

  const [currentTipIndex, setCurrentTipIndex] = useState(0)
  
  const nextTip = () => {
    setCurrentTipIndex((prev) => 
      prev < tips[currentCategory as keyof typeof tips].length - 1 ? prev + 1 : 0
    )
  }
  
  const prevTip = () => {
    setCurrentTipIndex((prev) => 
      prev > 0 ? prev - 1 : tips[currentCategory as keyof typeof tips].length - 1
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-purple-800 mb-4">Mental Health Tips</h2>
      
      <div className="flex overflow-x-auto pb-2 mb-6 gap-2">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => {
              setCurrentCategory(category.id)
              setCurrentTipIndex(0)
            }}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              currentCategory === category.id 
                ? 'bg-purple-600 text-white' 
                : 'bg-purple-100 text-purple-800 hover:bg-purple-200'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
      
      <div className="bg-purple-50 rounded-xl p-6 relative">
        <div className="text-center mb-4">
          <span className="text-4xl">{tips[currentCategory as keyof typeof tips][currentTipIndex].icon}</span>
          <h3 className="text-xl font-bold text-purple-800 mt-2">
            {tips[currentCategory as keyof typeof tips][currentTipIndex].title}
          </h3>
        </div>
        
        <p className="text-gray-700 text-center">
          {tips[currentCategory as keyof typeof tips][currentTipIndex].description}
        </p>
        
        <div className="flex justify-between mt-6">
          <button 
            onClick={prevTip}
            className="p-2 rounded-full bg-white shadow hover:bg-gray-100"
          >
            <ArrowLeft size={20} className="text-purple-800" />
          </button>
          
          <div className="flex gap-1">
            {tips[currentCategory as keyof typeof tips].map((_, index) => (
              <div 
                key={index} 
                className={`w-2 h-2 rounded-full ${
                  index === currentTipIndex ? 'bg-purple-600' : 'bg-purple-200'
                }`}
              ></div>
            ))}
          </div>
          
          <button 
            onClick={nextTip}
            className="p-2 rounded-full bg-white shadow hover:bg-gray-100"
          >
            <ArrowRight size={20} className="text-purple-800" />
          </button>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <p className="text-sm text-blue-800">
          <strong>Remember:</strong> These tips are meant to support your mental wellbeing, but they're not a replacement for professional help. If you're struggling, please reach out to a mental health professional.
        </p>
      </div>
    </div>
  )
}

export default MentalHealthTips
