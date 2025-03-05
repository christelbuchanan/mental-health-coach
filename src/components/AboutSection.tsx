import React from 'react'
import { Heart, Shield, BookOpen } from 'lucide-react'

const AboutSection: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-purple-800 mb-4">About Pawsitive Mindset</h2>
      
      <div className="bg-purple-50 rounded-xl p-6 mb-6">
        <div className="flex items-center mb-4">
          <div className="bg-white p-3 rounded-full mr-4 shadow-sm">
            <Heart className="text-pink-500" size={24} />
          </div>
          <h3 className="text-xl font-semibold text-purple-800">Our Mission</h3>
        </div>
        
        <p className="text-gray-700 mb-4">
          Pawsitive Mindset was created to make mental health support accessible, engaging, and stigma-free. 
          Our friendly goldendoodle companion, Buddy, is here to guide you through your mental wellness journey 
          with evidence-based techniques and a supportive presence.
        </p>
        
        <p className="text-gray-700">
          We believe that small, consistent steps lead to meaningful change in mental wellbeing. 
          Through daily check-ins, practical tips, and progress tracking, we aim to help you build 
          resilience and develop healthy mental habits.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-blue-50 rounded-xl p-6">
          <div className="flex items-center mb-4">
            <div className="bg-white p-3 rounded-full mr-4 shadow-sm">
              <Shield className="text-blue-500" size={24} />
            </div>
            <h3 className="text-lg font-semibold text-blue-800">Privacy & Safety</h3>
          </div>
          
          <p className="text-gray-700">
            Your privacy matters to us. Pawsitive Mindset is designed with your confidentiality in mind. 
            Your conversations with Buddy are private and stored locally on your device.
          </p>
          
          <div className="mt-4 p-3 bg-white rounded-lg text-sm text-gray-600">
            <p><strong>Important Note:</strong> While Buddy is here to support you, he is not a replacement for 
            professional mental health care. If you're experiencing a crisis or need immediate help, 
            please contact a mental health professional or crisis helpline.</p>
          </div>
        </div>
        
        <div className="bg-green-50 rounded-xl p-6">
          <div className="flex items-center mb-4">
            <div className="bg-white p-3 rounded-full mr-4 shadow-sm">
              <BookOpen className="text-green-500" size={24} />
            </div>
            <h3 className="text-lg font-semibold text-green-800">Our Approach</h3>
          </div>
          
          <p className="text-gray-700 mb-3">
            Buddy combines elements from evidence-based approaches including:
          </p>
          
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="text-green-600 mr-2">•</span>
              <span className="text-gray-700"><strong>Cognitive Behavioral Techniques</strong> - Identifying and reshaping thought patterns</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">•</span>
              <span className="text-gray-700"><strong>Mindfulness Practices</strong> - Staying present and developing awareness</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">•</span>
              <span className="text-gray-700"><strong>Positive Psychology</strong> - Focusing on strengths and wellbeing</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="bg-purple-100 rounded-lg p-6 text-center">
        <h3 className="text-lg font-semibold text-purple-800 mb-2">Get Started Today</h3>
        <p className="text-gray-700 mb-4">
          Begin your mental wellness journey with Buddy. Check in daily, track your progress, 
          and build healthy mental habits one step at a time.
        </p>
        <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors">
          Chat with Buddy
        </button>
      </div>
    </div>
  )
}

export default AboutSection
