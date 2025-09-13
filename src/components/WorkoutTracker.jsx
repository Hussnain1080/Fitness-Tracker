import { useState } from 'react'

function WorkoutTracker({ onAddWorkout }) {
  const [workoutName, setWorkoutName] = useState('')
  const [exercises, setExercises] = useState([])
  const [currentExercise, setCurrentExercise] = useState({
    name: '',
    sets: '',
    reps: '',
    weight: ''
  })
  const [duration, setDuration] = useState('')

  const addExercise = () => {
    if (currentExercise.name.trim()) {
      setExercises([...exercises, { ...currentExercise, id: Date.now() }])
      setCurrentExercise({ name: '', sets: '', reps: '', weight: '' })
    }
  }

  const removeExercise = (id) => {
    setExercises(exercises.filter(exercise => exercise.id !== id))
  }

  const saveWorkout = () => {
    if (workoutName.trim() && exercises.length > 0) {
      const workout = {
        name: workoutName,
        exercises,
        duration: parseInt(duration) || 0
      }
      onAddWorkout(workout)
      
      // Reset form
      setWorkoutName('')
      setExercises([])
      setDuration('')
      
      alert('Workout saved successfully!')
    } else {
      alert('Please add a workout name and at least one exercise.')
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Workout Tracker</h2>
        <p className="text-gray-600">Log your exercises, sets, reps, and weights</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Workout Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Workout Name
                </label>
                <input
                  type="text"
                  value={workoutName}
                  onChange={(e) => setWorkoutName(e.target.value)}
                  placeholder="e.g., Upper Body Strength"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="45"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Exercise</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Exercise Name
                </label>
                <input
                  type="text"
                  value={currentExercise.name}
                  onChange={(e) => setCurrentExercise({...currentExercise, name: e.target.value})}
                  placeholder="e.g., Bench Press"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sets</label>
                  <input
                    type="number"
                    value={currentExercise.sets}
                    onChange={(e) => setCurrentExercise({...currentExercise, sets: e.target.value})}
                    placeholder="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reps</label>
                  <input
                    type="number"
                    value={currentExercise.reps}
                    onChange={(e) => setCurrentExercise({...currentExercise, reps: e.target.value})}
                    placeholder="12"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Weight (lbs)</label>
                  <input
                    type="number"
                    value={currentExercise.weight}
                    onChange={(e) => setCurrentExercise({...currentExercise, weight: e.target.value})}
                    placeholder="135"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>
              <button
                onClick={addExercise}
                className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 w-full"
              >
                Add Exercise
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Current Workout</h3>
            <span className="text-sm text-gray-500">{exercises.length} exercises</span>
          </div>
          
          {exercises.length > 0 ? (
            <div className="space-y-3 mb-6">
              {exercises.map((exercise, index) => (
                <div key={exercise.id} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{exercise.name}</h4>
                    <button
                      onClick={() => removeExercise(exercise.id)}
                      className="text-red-600 hover:text-red-800 transition-colors duration-200"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>{exercise.sets} sets</span>
                    <span>{exercise.reps} reps</span>
                    {exercise.weight && <span>{exercise.weight} lbs</span>}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 mb-6">
              <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <p className="text-gray-500">No exercises added yet</p>
              <p className="text-sm text-gray-400">Add exercises to build your workout</p>
            </div>
          )}
          
          <button
            onClick={saveWorkout}
            disabled={!workoutName.trim() || exercises.length === 0}
            className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save Workout
          </button>
        </div>
      </div>
    </div>
  )
}

export default WorkoutTracker