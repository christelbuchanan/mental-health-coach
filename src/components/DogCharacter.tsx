import React, { useState, useEffect, useRef } from 'react'

interface DogCharacterProps {
  mood: string
}

const DogCharacter: React.FC<DogCharacterProps> = ({ mood }) => {
  const [bounce, setBounce] = useState(false)
  const [tailWag, setTailWag] = useState(false)
  const [earWiggle, setEarWiggle] = useState(false)
  const [blinking, setBlinking] = useState(false)
  const [panting, setPanting] = useState(false)
  const [isWearingHat, setIsWearingHat] = useState(false)
  const [isWearingBowtie, setIsWearingBowtie] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [scale, setScale] = useState(1)
  const [isBeingPet, setIsBeingPet] = useState(false)
  const [breathingPhase, setBreathingPhase] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const breathingRef = useRef<number>(0)

  // Set animations based on mood
  useEffect(() => {
    // Reset all animations
    setBounce(false)
    setTailWag(false)
    setEarWiggle(false)
    setPanting(false)
    
    // Apply animations based on mood
    if (mood === 'happy') {
      setTailWag(true)
      setPanting(true)
      setTimeout(() => setBounce(true), 300)
    } else if (mood === 'excited') {
      setBounce(true)
      setTailWag(true)
      setEarWiggle(true)
      setPanting(true)
    } else if (mood === 'thinking') {
      setEarWiggle(true)
    }
    
    // Blinking happens regardless of mood
    const blinkInterval = setInterval(() => {
      setBlinking(true)
      setTimeout(() => setBlinking(false), 200)
    }, 3000 + Math.random() * 2000) // Random blinking for more natural look
    
    return () => clearInterval(blinkInterval)
  }, [mood])

  // Subtle breathing animation
  useEffect(() => {
    const breathingAnimation = () => {
      breathingRef.current = requestAnimationFrame(breathingAnimation)
      setBreathingPhase(prev => (prev + 0.01) % (2 * Math.PI))
    }
    
    breathingRef.current = requestAnimationFrame(breathingAnimation)
    
    return () => {
      if (breathingRef.current) {
        cancelAnimationFrame(breathingRef.current)
      }
    }
  }, [])

  // Handle mouse movement for 3D effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    // Calculate rotation based on mouse position
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    const rotateX = (y - centerY) / 20
    const rotateY = (centerX - x) / 20
    
    // Apply 3D rotation
    if (containerRef.current) {
      containerRef.current.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
    }
  }
  
  // Reset rotation when mouse leaves
  const handleMouseLeave = () => {
    if (containerRef.current) {
      containerRef.current.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)'
    }
  }
  
  // Handle click for interaction
  const handleClick = (e: React.MouseEvent) => {
    // Determine which part was clicked
    const target = e.target as SVGElement
    const part = target.getAttribute('data-part')
    
    if (part === 'head' || part === 'fur') {
      // Pet the dog
      setIsBeingPet(true)
      setTimeout(() => setIsBeingPet(false), 1000)
      
      // Make dog happy when pet
      if (mood !== 'happy') {
        setTailWag(true)
        setTimeout(() => {
          if (mood !== 'happy') setTailWag(false)
        }, 2000)
      }
    } else if (part === 'ear') {
      // Wiggle ears when clicked
      setEarWiggle(true)
      setTimeout(() => {
        if (mood !== 'excited' && mood !== 'thinking') setEarWiggle(false)
      }, 1000)
    } else if (part === 'hat-area') {
      // Toggle hat
      setIsWearingHat(!isWearingHat)
    } else if (part === 'neck-area') {
      // Toggle bowtie
      setIsWearingBowtie(!isWearingBowtie)
    }
  }

  // Get the eye style based on mood and blinking state
  const getEyeStyle = () => {
    if (blinking) {
      return { height: '1px', transform: 'translateY(8px)' }
    }
    
    switch(mood) {
      case 'happy':
        return { height: '15px', borderRadius: '50%' }
      case 'thinking':
        return { height: '15px', width: '15px', borderRadius: '50%' }
      case 'excited':
        return { height: '18px', borderRadius: '50%', transform: 'scale(1.1)' }
      case 'concerned':
        return { height: '10px', borderRadius: '50%', transform: 'translateY(3px)' }
      default:
        return { height: '15px', borderRadius: '50%' }
    }
  }

  // Get mouth style based on mood
  const getMouthStyle = () => {
    if (panting) {
      return {
        d: 'M 40 80 Q 60 95 80 80 L 80 90 Q 60 105 40 90 Z',
        fill: '#FF9999',
        stroke: '#8B4513',
        strokeWidth: 2
      }
    }
    
    switch(mood) {
      case 'happy':
        return {
          d: 'M 30 75 Q 60 95 90 75',
          stroke: '#8B4513',
          strokeWidth: 3,
          fill: 'none'
        }
      case 'thinking':
        return {
          d: 'M 40 80 H 80',
          stroke: '#8B4513',
          strokeWidth: 3,
          fill: 'none'
        }
      case 'excited':
        return {
          d: 'M 30 75 Q 60 100 90 75',
          stroke: '#8B4513',
          strokeWidth: 4,
          fill: 'none'
        }
      case 'concerned':
        return {
          d: 'M 30 85 Q 60 75 90 85',
          stroke: '#8B4513',
          strokeWidth: 3,
          fill: 'none'
        }
      default:
        return {
          d: 'M 30 75 Q 60 95 90 75',
          stroke: '#8B4513',
          strokeWidth: 3,
          fill: 'none'
        }
    }
  }

  // Get tongue style based on mood
  const getTongueStyle = () => {
    if ((mood === 'happy' || mood === 'excited') && !panting) {
      return {
        visibility: 'visible',
        d: 'M 60 85 Q 65 95 60 105 Q 55 95 60 85',
        fill: '#FF9999'
      }
    }
    
    return {
      visibility: 'hidden',
      d: 'M 60 85 Q 65 95 60 105 Q 55 95 60 85',
      fill: '#FF9999'
    }
  }

  // Calculate breathing effect
  const breathingScale = 1 + Math.sin(breathingPhase) * 0.01

  return (
    <div 
      className="relative w-80 h-80 mx-auto cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      ref={containerRef}
      style={{
        transition: 'transform 0.1s ease-out',
        transformStyle: 'preserve-3d'
      }}
    >
      <div 
        className={`w-full h-full relative ${bounce ? 'animate-bounce' : ''}`}
        style={{ 
          animation: bounce ? 'bounce 1s infinite' : 'none',
          animationDuration: bounce ? '1s' : '0s',
          transform: `scale(${scale * breathingScale})`,
          transition: 'transform 0.3s ease'
        }}
      >
        <svg 
          viewBox="0 0 200 200" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          style={{ filter: 'drop-shadow(0 10px 8px rgba(0, 0, 0, 0.2))' }}
        >
          {/* Enhanced filters for 3D effect */}
          <filter id="shadow">
            <feDropShadow dx="0" dy="4" stdDeviation="3" floodOpacity="0.3" />
          </filter>
          
          <filter id="furTexture">
            <feTurbulence type="fractalNoise" baseFrequency="0.1" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" />
          </filter>
          
          {/* Gradients for realistic fur */}
          <defs>
            <radialGradient id="furGradient" cx="0.5" cy="0.5" r="0.5" fx="0.4" fy="0.4">
              <stop offset="0%" stopColor="#F9E7C8" />
              <stop offset="50%" stopColor="#F4D08F" />
              <stop offset="80%" stopColor="#E8C080" />
              <stop offset="100%" stopColor="#D4B070" />
            </radialGradient>
            
            <linearGradient id="hatGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#333" />
              <stop offset="100%" stopColor="#000" />
            </linearGradient>
            
            <linearGradient id="bowtieGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFD700" />
              <stop offset="100%" stopColor="#DAA520" />
            </linearGradient>
            
            <pattern id="furPattern" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M0,5 Q2.5,0 5,5 Q7.5,10 10,5" stroke="#E8C080" strokeWidth="0.5" fill="none" />
              <path d="M0,0 Q5,2.5 10,0" stroke="#E8C080" strokeWidth="0.5" fill="none" opacity="0.5" />
            </pattern>
          </defs>
          
          {/* Tail with fur texture */}
          <g>
            <path 
              d="M 160 100 Q 180 80 190 100 Q 200 120 180 130" 
              fill="url(#furGradient)" 
              stroke="#D4B070"
              strokeWidth="1"
              filter="url(#shadow)"
              style={{
                transformOrigin: '160px 100px',
                animation: tailWag ? 'wag 0.5s infinite alternate' : 'none'
              }}
              data-part="tail"
            />
            <path 
              d="M 160 100 Q 180 80 190 100 Q 200 120 180 130" 
              fill="url(#furPattern)"
              opacity="0.6"
              style={{
                transformOrigin: '160px 100px',
                animation: tailWag ? 'wag 0.5s infinite alternate' : 'none'
              }}
              data-part="fur"
            />
          </g>
          
          {/* Body with fur texture */}
          <g>
            <ellipse 
              cx="100" 
              cy="120" 
              rx="60" 
              ry="50" 
              fill="url(#furGradient)" 
              filter="url(#shadow)"
              data-part="body"
            />
            <ellipse 
              cx="100" 
              cy="120" 
              rx="60" 
              ry="50" 
              fill="url(#furPattern)"
              opacity="0.6"
              data-part="fur"
            />
          </g>
          
          {/* Neck area for bowtie */}
          <ellipse 
            cx="70" 
            cy="100" 
            rx="25" 
            ry="20" 
            fill="url(#furGradient)" 
            opacity="0"
            data-part="neck-area"
          />
          
          {/* Bowtie */}
          {isWearingBowtie && (
            <g filter="url(#shadow)">
              <path 
                d="M 55 100 L 65 95 L 75 100 L 65 105 Z" 
                fill="url(#bowtieGradient)" 
                stroke="#DAA520"
                strokeWidth="1"
                data-part="bowtie"
              />
              <path 
                d="M 75 100 L 85 95 L 95 100 L 85 105 Z" 
                fill="url(#bowtieGradient)" 
                stroke="#DAA520"
                strokeWidth="1"
                data-part="bowtie"
              />
              <rect x="73" y="98" width="4" height="4" fill="#FFF" data-part="bowtie" />
            </g>
          )}
          
          {/* Head with fur texture */}
          <g>
            <circle 
              cx="60" 
              cy="70" 
              r="40" 
              fill="url(#furGradient)" 
              filter="url(#shadow)"
              style={{
                transform: isBeingPet ? 'translateY(2px)' : 'none',
                transition: 'transform 0.2s ease'
              }}
              data-part="head"
            />
            <circle 
              cx="60" 
              cy="70" 
              r="40" 
              fill="url(#furPattern)"
              opacity="0.6"
              style={{
                transform: isBeingPet ? 'translateY(2px)' : 'none',
                transition: 'transform 0.2s ease'
              }}
              data-part="fur"
            />
          </g>
          
          {/* Hat area for clicking */}
          <circle 
            cx="60" 
            cy="40" 
            r="20" 
            fill="transparent" 
            data-part="hat-area"
          />
          
          {/* Top hat */}
          {isWearingHat && (
            <g filter="url(#shadow)">
              <rect 
                x="40" 
                y="30" 
                width="40" 
                height="5" 
                fill="url(#hatGradient)" 
                data-part="hat"
              />
              <rect 
                x="45" 
                y="10" 
                width="30" 
                height="20" 
                fill="url(#hatGradient)" 
                data-part="hat"
              />
              <rect 
                x="45" 
                y="28" 
                width="30" 
                height="2" 
                fill="#FFF" 
                data-part="hat"
              />
            </g>
          )}
          
          {/* Ears with fur texture */}
          <g>
            <ellipse 
              cx="30" 
              cy="40" 
              rx="15" 
              ry="25" 
              fill="url(#furGradient)" 
              stroke="#D4B070"
              strokeWidth="1"
              filter="url(#shadow)"
              style={{
                transformOrigin: '30px 45px',
                animation: earWiggle ? 'wiggle 0.5s infinite alternate' : 'none'
              }}
              data-part="ear"
            />
            <ellipse 
              cx="30" 
              cy="40" 
              rx="15" 
              ry="25" 
              fill="url(#furPattern)"
              opacity="0.6"
              style={{
                transformOrigin: '30px 45px',
                animation: earWiggle ? 'wiggle 0.5s infinite alternate' : 'none'
              }}
              data-part="fur"
            />
          </g>
          
          <g>
            <ellipse 
              cx="90" 
              cy="40" 
              rx="15" 
              ry="25" 
              fill="url(#furGradient)" 
              stroke="#D4B070"
              strokeWidth="1"
              filter="url(#shadow)"
              style={{
                transformOrigin: '90px 45px',
                animation: earWiggle ? 'wiggle 0.5s infinite alternate' : 'none',
                animationDelay: '0.1s'
              }}
              data-part="ear"
            />
            <ellipse 
              cx="90" 
              cy="40" 
              rx="15" 
              ry="25" 
              fill="url(#furPattern)"
              opacity="0.6"
              style={{
                transformOrigin: '90px 45px',
                animation: earWiggle ? 'wiggle 0.5s infinite alternate' : 'none',
                animationDelay: '0.1s'
              }}
              data-part="fur"
            />
          </g>
          
          {/* Enhanced fur texture - more detailed lines */}
          <g opacity="0.4" stroke="#D4B070" strokeWidth="0.5" data-part="fur">
            {/* Head fur */}
            <path d="M 40 60 Q 50 50 60 60" />
            <path d="M 60 60 Q 70 50 80 60" />
            <path d="M 30 80 Q 40 70 50 80" />
            <path d="M 70 80 Q 80 70 90 80" />
            <path d="M 20 60 Q 30 50 40 60" />
            <path d="M 80 60 Q 90 50 100 60" />
            
            {/* Body fur */}
            <path d="M 80 110 Q 90 100 100 110" />
            <path d="M 100 110 Q 110 100 120 110" />
            <path d="M 60 130 Q 70 120 80 130" />
            <path d="M 120 130 Q 130 120 140 130" />
            <path d="M 70 140 Q 80 130 90 140" />
            <path d="M 110 140 Q 120 130 130 140" />
            
            {/* Ear fur */}
            <path d="M 25 30 Q 30 25 35 30" />
            <path d="M 85 30 Q 90 25 95 30" />
            <path d="M 20 40 Q 25 35 30 40" />
            <path d="M 90 40 Q 95 35 100 40" />
          </g>
          
          {/* Additional fur wisps for more realism */}
          <g opacity="0.3" stroke="#E8C080" strokeWidth="0.7" data-part="fur">
            <path d="M 20 70 Q 15 65 20 60" />
            <path d="M 100 70 Q 105 65 100 60" />
            <path d="M 40 30 Q 35 25 30 20" />
            <path d="M 80 30 Q 85 25 90 20" />
            <path d="M 140 110 Q 145 105 150 110" />
            <path d="M 60 150 Q 65 145 70 150" />
            <path d="M 130 150 Q 135 145 140 150" />
          </g>
          
          {/* Eyes with highlights for 3D effect */}
          <g data-part="eyes">
            <ellipse 
              cx="45" 
              cy="65" 
              rx="5" 
              ry="8" 
              fill="#000" 
              style={getEyeStyle()}
            />
            <ellipse 
              cx="75" 
              cy="65" 
              rx="5" 
              ry="8" 
              fill="#000" 
              style={getEyeStyle()}
            />
            {/* Enhanced eye highlights */}
            <circle cx="43" cy="63" r="2" fill="#FFF" opacity="0.8" />
            <circle cx="73" cy="63" r="2" fill="#FFF" opacity="0.8" />
            <circle cx="44" cy="64" r="0.8" fill="#FFF" opacity="0.6" />
            <circle cx="74" cy="64" r="0.8" fill="#FFF" opacity="0.6" />
          </g>
          
          {/* Nose with enhanced highlights */}
          <g data-part="nose">
            <ellipse cx="60" cy="75" rx="10" ry="7" fill="#8B4513" />
            <ellipse cx="57" cy="73" rx="3" ry="2" fill="#D2691E" opacity="0.6" />
            <ellipse cx="58" cy="74" rx="1" ry="0.8" fill="#FFF" opacity="0.4" />
          </g>
          
          {/* Mouth */}
          <path {...getMouthStyle()} data-part="mouth" />
          
          {/* Tongue with more detail */}
          <g data-part="tongue">
            <path {...getTongueStyle()} />
            {panting && (
              <path 
                d="M 55 95 Q 60 100 65 95" 
                stroke="#E57373" 
                strokeWidth="1" 
                fill="none" 
                opacity="0.7"
              />
            )}
          </g>
          
          {/* Paws with enhanced details */}
          <g data-part="paws">
            <circle cx="70" cy="170" r="15" fill="url(#furGradient)" stroke="#D4B070" strokeWidth="1" filter="url(#shadow)" />
            <circle cx="130" cy="170" r="15" fill="url(#furGradient)" stroke="#D4B070" strokeWidth="1" filter="url(#shadow)" />
            
            {/* Paw pads */}
            <ellipse cx="67" cy="167" rx="5" ry="4" fill="#FFCCBC" opacity="0.8" />
            <ellipse cx="127" cy="167" rx="5" ry="4" fill="#FFCCBC" opacity="0.8" />
            
            {/* Toe beans */}
            <circle cx="63" cy="164" r="2" fill="#FFAB91" opacity="0.8" />
            <circle cx="67" cy="164" r="2" fill="#FFAB91" opacity="0.8" />
            <circle cx="71" cy="164" r="2" fill="#FFAB91" opacity="0.8" />
            
            <circle cx="123" cy="164" r="2" fill="#FFAB91" opacity="0.8" />
            <circle cx="127" cy="164" r="2" fill="#FFAB91" opacity="0.8" />
            <circle cx="131" cy="164" r="2" fill="#FFAB91" opacity="0.8" />
            
            {/* Fur on paws */}
            <circle cx="70" cy="170" r="15" fill="url(#furPattern)" opacity="0.5" />
            <circle cx="130" cy="170" r="15" fill="url(#furPattern)" opacity="0.5" />
          </g>
          
          {/* Spots with enhanced details */}
          <g data-part="spots">
            <ellipse cx="120" cy="100" rx="15" ry="10" fill="#F9E7C8" />
            <ellipse cx="80" cy="130" rx="12" ry="8" fill="#F9E7C8" />
            <ellipse cx="117" cy="97" rx="5" ry="3" fill="#FFF" opacity="0.4" />
            <ellipse cx="77" cy="127" rx="4" ry="2" fill="#FFF" opacity="0.4" />
            
            {/* Subtle fur pattern on spots */}
            <ellipse cx="120" cy="100" rx="15" ry="10" fill="url(#furPattern)" opacity="0.3" />
            <ellipse cx="80" cy="130" rx="12" ry="8" fill="url(#furPattern)" opacity="0.3" />
          </g>
        </svg>
      </div>
      
      {/* Mood indicator */}
      <div className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-md">
        {mood === 'happy' && <span className="text-2xl">😊</span>}
        {mood === 'thinking' && <span className="text-2xl">🤔</span>}
        {mood === 'excited' && <span className="text-2xl">🎉</span>}
        {mood === 'concerned' && <span className="text-2xl">😟</span>}
      </div>
      
      {/* Interaction hints */}
      <div className="absolute top-2 left-2 bg-white/80 rounded-md px-2 py-1 text-xs text-gray-600 shadow-sm">
        Try clicking different parts of Buddy!
      </div>
      
      {/* CSS Animations */}
      <style jsx>{`
        @keyframes wag {
          0% { transform: rotate(-10deg); }
          100% { transform: rotate(10deg); }
        }
        
        @keyframes wiggle {
          0% { transform: rotate(-5deg); }
          100% { transform: rotate(5deg); }
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes pant {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(0.8); }
        }
      `}</style>
    </div>
  )
}

export default DogCharacter
