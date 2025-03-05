import React from 'react'
import { Award, Calendar, TrendingUp } from 'lucide-react'

interface ProgressTrackerProps {
  progress: {
    streak: number
    completedActivities: number
    moodHistory: number[]
  }
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ progress }) => {
  // Calculate average mood
  const averageMood = progress.moodHistory.reduce((sum, mood) => sum + mood, 0) / progress.moodHistory.length
  
  // Get mood trend (improving, steady, declining)
  const getMoodTrend = () => {
    if (progress.moodHistory.length < 3) return 'Not enough data'
    
    const recentMoods = progress.moodHistory.slice(-3)
    const firstHalf = recentMoods[0]
    const secondHalf = recentMoods[2]
    
    if (secondHalf - firstHalf > 0.5) return 'Improving'
    if (firstHalf - secondHalf > 0.5) return 'Declining'
    return 'Steady'
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-purple-800 mb-4">Your Progress</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-purple-50 rounded-lg p-4 flex items-center">
          <div className="bg-purple-100 p-3 rounded-full mr-4">
            <Calendar className="text-purple-600" size={24} />
          </div>
          <div>
            <p className="text-sm text-purple-600">Day Streak</p>
            <p className="text-2xl font-bold text-purple-800">{progress.streak} days</p>
          </div>
        </div>
        
        <div className="bg-blue-50 rounded-lg p-4 flex items-center">
          <div className="bg-blue-100 p-3 rounded-full mr-4">
            <Award className="text-blue-600" size={24} />
          </div>
          <div>
            <p className="text-sm text-blue-600">Activities Completed</p>
            <p className="text-2xl font-bold text-blue-800">{progress.completedActivities}</p>
          </div>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4 flex items-center">
          <div className="bg-green-100 p-3 rounded-full mr-4">
            <TrendingUp className="text-green-600" size={24} />
          </div>
          <div>
            <p className="text-sm text-green-600">Mood Trend</p>
            <p className="text-2xl font-bold text-green-800">{getMoodTrend()}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Mood History</h3>
        <div className="h-40 flex items-end justify-between">
          {progress.moodHistory.map((mood, index) => (
            <div key={index} className="flex flex-col items-center">
              <div 
                className="w-8 bg-purple-500 rounded-t-md" 
                style={{ 
                  height: `${mood * 15}px`,
                  opacity: 0.5 + (index / progress.moodHistory.length) * 0.5
                }}
              ></div>
              <p className="text-xs text-gray-500 mt-1">Day {index + 1}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>1 - Low</span>
          <span>5 - High</span>
        </div>
      </div>
      
      <div className="bg-purple-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-purple-800 mb-2">Your Achievements</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="bg-white rounded-lg p-3 text-center shadow-sm">
            <div className="text-2xl mb-1">🌱</div>
            <p className="text-sm font-medium text-gray-700">First Steps</p>
            <p className="text-xs text-gray-500">Started your journey</p>
          </div>
          
          <div className="bg-white rounded-lg p-3 text-center shadow-sm">
            <div className="text-2xl mb-1">🔥</div>
            <p className="text-sm font-medium text-gray-700">3-Day Streak</p>
            <p className="text-xs text-gray-500">Consistent check-ins</p>
          </div>
          
          <div className="bg-white rounded-lg p-3 text-center shadow-sm opacity-50">
            <div className="text-2xl mb-1">🧠</div>
            <p className="text-sm font-medium text-gray-700">Mind Master</p>
            <p className="text-xs text-gray-500">Complete 5 activities</p>
          </div>
          
          <div className="bg-white rounded-lg p-3 text-center shadow-sm opacity-50">
            <div className="text-2xl mb-1">⭐</div>
            <p className="text-sm font-medium text-gray-700">Rising Star</p>
            <p className="text-xs text-gray-500">7-day mood improvement</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProgressTracker
