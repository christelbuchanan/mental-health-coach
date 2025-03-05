import React, { useState, useEffect, useRef } from 'react'
import { Send, RefreshCw } from 'lucide-react'

interface ChatInterfaceProps {
  setMood: (mood: string) => void
}

interface Message {
  id: number
  sender: 'user' | 'buddy'
  text: string
  timestamp: Date
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ setMood }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'buddy',
      text: "Hi there! I'm Buddy, your mental health companion. How are you feeling today?",
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Predefined responses based on user input keywords
  const responses = {
    greeting: [
      "Hello! It's great to see you today!",
      "Hi there! How can I help you with your mental wellness today?",
      "Hey friend! I'm here to support you."
    ],
    sad: [
      "I'm sorry to hear you're feeling down. Remember that it's okay to not be okay sometimes. Would you like to talk about what's bothering you?",
      "I understand feeling sad can be tough. What's one small thing that might bring you a bit of joy today?",
      "It sounds like you're having a difficult time. Remember that feelings come and go like clouds in the sky. This will pass too."
    ],
    anxious: [
      "When you're feeling anxious, try taking a few deep breaths. Breathe in for 4 counts, hold for 7, and exhale for 8. Would you like to try that together?",
      "Anxiety can be overwhelming. Let's ground ourselves - can you name 5 things you can see right now?",
      "I understand anxiety can be challenging. Remember that your thoughts are not facts, and this feeling will pass."
    ],
    happy: [
      "That's wonderful to hear! What's bringing you joy today?",
      "I'm so glad you're feeling good! Celebrating these moments is important for our mental health.",
      "That's great news! Positive emotions are worth savoring - maybe take a moment to really appreciate this feeling?"
    ],
    tired: [
      "Being tired can really affect our mental state. Have you been able to get enough rest lately?",
      "Rest is so important for mental health. Could you take a short break or maybe plan for an earlier bedtime tonight?",
      "Our bodies and minds need proper rest. Is there something specific that's been disrupting your sleep or energy levels?"
    ],
    default: [
      "I'm here to listen and support you. Would you like to tell me more?",
      "Thank you for sharing that with me. How does that make you feel?",
      "I appreciate you opening up. Is there anything specific you'd like guidance on?"
    ]
  }

  // Function to determine response based on user input
  const getResponse = (input: string) => {
    const lowerInput = input.toLowerCase()
    
    if (lowerInput.match(/hi|hello|hey|howdy/)) {
      setMood('happy')
      return getRandomResponse('greeting')
    } else if (lowerInput.match(/sad|down|unhappy|depressed|blue/)) {
      setMood('concerned')
      return getRandomResponse('sad')
    } else if (lowerInput.match(/anxious|worried|nervous|stress|afraid|scared/)) {
      setMood('concerned')
      return getRandomResponse('anxious')
    } else if (lowerInput.match(/happy|good|great|excellent|amazing|joy|wonderful/)) {
      setMood('excited')
      return getRandomResponse('happy')
    } else if (lowerInput.match(/tired|exhausted|sleepy|fatigue/)) {
      setMood('thinking')
      return getRandomResponse('tired')
    } else {
      setMood('thinking')
      return getRandomResponse('default')
    }
  }

  const getRandomResponse = (category: keyof typeof responses) => {
    const categoryResponses = responses[category]
    return categoryResponses[Math.floor(Math.random() * categoryResponses.length)]
  }

  const handleSendMessage = () => {
    if (input.trim() === '') return

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      sender: 'user',
      text: input,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    setInput('')
    
    // Simulate Buddy typing
    setIsTyping(true)
    
    // Add Buddy's response after a delay
    setTimeout(() => {
      const buddyMessage: Message = {
        id: messages.length + 2,
        sender: 'buddy',
        text: getResponse(input),
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, buddyMessage])
      setIsTyping(false)
    }, 1500)
  }

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="flex flex-col h-[500px]">
      <div className="flex-1 overflow-y-auto mb-4 pr-2">
        {messages.map(message => (
          <div 
            key={message.id} 
            className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] rounded-lg p-3 ${
                message.sender === 'user' 
                  ? 'bg-purple-600 text-white rounded-tr-none' 
                  : 'bg-gray-100 text-gray-800 rounded-tl-none'
              }`}
            >
              <p>{message.text}</p>
              <p className="text-xs mt-1 opacity-70">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start mb-4">
            <div className="bg-gray-100 text-gray-800 rounded-lg rounded-tl-none p-3">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef}></div>
      </div>
      
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Type your message here..."
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          onClick={handleSendMessage}
          className="bg-purple-600 text-white rounded-lg p-2 hover:bg-purple-700 transition-colors"
          disabled={input.trim() === ''}
        >
          <Send size={20} />
        </button>
        <button
          onClick={() => {
            setMessages([{
              id: 1,
              sender: 'buddy',
              text: "Hi there! I'm Buddy, your mental health companion. How are you feeling today?",
              timestamp: new Date()
            }])
            setMood('happy')
          }}
          className="bg-gray-200 text-gray-700 rounded-lg p-2 hover:bg-gray-300 transition-colors"
          title="Reset conversation"
        >
          <RefreshCw size={20} />
        </button>
      </div>
    </div>
  )
}

export default ChatInterface
