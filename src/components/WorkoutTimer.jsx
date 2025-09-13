import { useState, useEffect, useRef } from 'react'

function WorkoutTimer() {
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [mode, setMode] = useState('stopwatch') // stopwatch or timer
  const [timerDuration, setTimerDuration] = useState(300) // 5 minutes default
  const intervalRef = useRef(null)

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => {
          if (mode === 'timer') {
            if (prevTime <= 1) {
              setIsRunning(false)
              alert('Timer finished!')
              return 0
            }
            return prevTime - 1
          } else {
            return prevTime + 1
          }
        })
      }, 1000)
    } else {
      clearInterval(intervalRef.current)
    }

    return () => clearInterval(intervalRef.current)
  }, [isRunning, mode])

  const startStop = () => {
    setIsRunning(!isRunning)
  }

  const resetTimer = () => {
    setIsRunning(false)
    setTime(mode === 'timer' ? timerDuration : 0)
    clearInterval(intervalRef.current)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    
    if (hours > 0) {
      return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getTimerColor = () => {
    if (mode === 'timer' && time <= 10) return 'text-red-600'
    if (isRunning) return 'text-green-600'
    return 'text-gray-900'
  }

  const presetTimers = [
    { name: 'Quick HIIT', duration: 240 },
    { name: 'Tabata Round', duration: 20 },
    { name: 'Rest Period', duration: 60 },
    { name: 'Long Cardio', duration: 1800 }
  ]

  const applyPreset = (preset) => {
    setMode('timer')
    setTimerDuration(preset.duration)
    setTime(preset.duration)
    setIsRunning(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Workout Timer</h2>
        <p className="text-gray-600">Track your workout time with stopwatch and countdown timers</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200 text-center">
            <div className="mb-6">
              <div className="flex justify-center space-x-4 mb-4">
                <button
                  onClick={() => setMode('stopwatch')}
                  className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                    mode === 'stopwatch'
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Stopwatch
                </button>
                <button
                  onClick={() => setMode('timer')}
                  className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                    mode === 'timer'
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Timer
                </button>
              </div>
            </div>

            <div className={`text-6xl md:text-8xl font-mono font-bold mb-6 ${getTimerColor()}`}>
              {mode === 'stopwatch' ? formatDuration(time) : formatTime(time)}
            </div>

            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={startStop}
                className={`px-8 py-4 rounded-lg font-medium transition-colors duration-200 ${
                  isRunning
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
              >
                {isRunning ? 'Pause' : 'Start'}
              </button>
              <button
                onClick={resetTimer}
                className="px-6 py-4 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors duration-200"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {mode === 'timer' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Timer Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration (seconds)
                  </label>
                  <input
                    type="number"
                    value={timerDuration}
                    onChange={(e) => {
                      const value = parseInt(e.target.value) || 0
                      setTimerDuration(value)
                      if (!isRunning) setTime(value)
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                    disabled={isRunning}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Presets</h3>
            <div className="space-y-2">
              {presetTimers.map((preset, index) => (
                <button
                  key={index}
                  onClick={() => applyPreset(preset)}
                  disabled={isRunning}
                  className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="font-medium text-gray-900">{preset.name}</div>
                  <div className="text-sm text-gray-600">
                    {formatTime(preset.duration)}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WorkoutTimer