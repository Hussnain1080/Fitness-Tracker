import { useState } from 'react';
import { motion } from 'framer-motion';

const exerciseData = {
  'Chest': [
    { name: 'Bench Press', difficulty: 'Intermediate', equipment: 'Barbell', description: 'Lie on bench, lower bar to chest, press up' },
    { name: 'Push-ups', difficulty: 'Beginner', equipment: 'Bodyweight', description: 'Classic upper body exercise using body weight' },
    { name: 'Dumbbell Flyes', difficulty: 'Intermediate', equipment: 'Dumbbells', description: 'Lying on bench, arc dumbbells from sides to center' },
    { name: 'Chest Dips', difficulty: 'Intermediate', equipment: 'Parallel Bars', description: 'Lower body between bars, push back up' }
  ],
  'Back': [
    { name: 'Pull-ups', difficulty: 'Intermediate', equipment: 'Pull-up Bar', description: 'Hang from bar, pull body up until chin clears bar' },
    { name: 'Deadlifts', difficulty: 'Advanced', equipment: 'Barbell', description: 'Lift barbell from floor to hip level, focus on form' },
    { name: 'Bent-over Rows', difficulty: 'Intermediate', equipment: 'Barbell', description: 'Bend over, row bar to lower chest' },
    { name: 'Lat Pulldowns', difficulty: 'Beginner', equipment: 'Cable Machine', description: 'Pull cable bar down to upper chest' }
  ],
  'Legs': [
    { name: 'Squats', difficulty: 'Beginner', equipment: 'Bodyweight/Barbell', description: 'Lower into sitting position, return to standing' },
    { name: 'Lunges', difficulty: 'Beginner', equipment: 'Bodyweight', description: 'Step forward into lunge, return to starting position' },
    { name: 'Leg Press', difficulty: 'Beginner', equipment: 'Leg Press Machine', description: 'Press weight away using legs on machine' },
    { name: 'Calf Raises', difficulty: 'Beginner', equipment: 'Bodyweight', description: 'Rise up on toes, lower slowly' }
  ],
  'Shoulders': [
    { name: 'Overhead Press', difficulty: 'Intermediate', equipment: 'Barbell', description: 'Press bar from shoulders to overhead' },
    { name: 'Lateral Raises', difficulty: 'Beginner', equipment: 'Dumbbells', description: 'Raise dumbbells to sides at shoulder height' },
    { name: 'Front Raises', difficulty: 'Beginner', equipment: 'Dumbbells', description: 'Raise dumbbells forward to shoulder height' },
    { name: 'Shrugs', difficulty: 'Beginner', equipment: 'Dumbbells', description: 'Lift shoulders up toward ears, lower slowly' }
  ],
  'Arms': [
    { name: 'Bicep Curls', difficulty: 'Beginner', equipment: 'Dumbbells', description: 'Curl weights toward shoulders, lower slowly' },
    { name: 'Tricep Dips', difficulty: 'Intermediate', equipment: 'Bodyweight', description: 'Lower body using arms, push back up' },
    { name: 'Hammer Curls', difficulty: 'Beginner', equipment: 'Dumbbells', description: 'Curl with neutral grip, thumbs up' },
    { name: 'Close-grip Push-ups', difficulty: 'Intermediate', equipment: 'Bodyweight', description: 'Push-ups with hands close together' }
  ],
  'Core': [
    { name: 'Plank', difficulty: 'Beginner', equipment: 'Bodyweight', description: 'Hold straight body position on forearms' },
    { name: 'Crunches', difficulty: 'Beginner', equipment: 'Bodyweight', description: 'Lift shoulders toward knees from lying position' },
    { name: 'Russian Twists', difficulty: 'Intermediate', equipment: 'Bodyweight', description: 'Rotate torso side to side while seated' },
    { name: 'Mountain Climbers', difficulty: 'Intermediate', equipment: 'Bodyweight', description: 'Alternate bringing knees to chest in plank position' }
  ]
}

function ExerciseLibrary() {
  const [activeCategory, setActiveCategory] = useState('Chest');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExercise, setSelectedExercise] = useState(null);

  const categories = Object.keys(exerciseData);

  const filteredExercises = exerciseData[activeCategory].filter(exercise =>
    exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="exercise-library"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2 
        className="text-2xl font-bold mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Exercise Library
      </motion.h2>
      
      <motion.p 
        className="mb-6 text-gray-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Browse exercises by muscle group and learn proper form
      </motion.p>
      
      <motion.div 
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <input
          type="text"
          placeholder="Search exercises"
          className="input-field"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </motion.div>
      
      <motion.h3 
        className="text-xl font-semibold mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        Categories
      </motion.h3>
      
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {categories.map(category => (
          <motion.button
            key={category}
            className={`card p-4 text-center font-medium ${activeCategory === category ? 'ring-2 ring-emerald-400' : ''}`}
            onClick={() => setActiveCategory(category)}
            variants={item}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {category}
          </motion.button>
        ))}
      </motion.div>
      
      {filteredExercises.length > 0 ? (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {filteredExercises.map((exercise, index) => (
            <motion.div
              key={`${activeCategory}-${index}`}
              className="card cursor-pointer"
              onClick={() => setSelectedExercise(exercise)}
              variants={item}
              whileHover={{ scale: 1.03, y: -5 }}
              whileTap={{ scale: 0.97 }}
            >
              <h4 className="text-lg font-semibold mb-2">{exercise.name}</h4>
              <div className="flex justify-between mb-2">
                <span className="text-sm bg-white/10 px-2 py-1 rounded">{exercise.difficulty}</span>
                <span className="text-sm bg-white/10 px-2 py-1 rounded">{exercise.equipment}</span>
              </div>
              <p className="text-gray-300">{exercise.description}</p>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.p 
          className="text-center py-8 text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          No exercises found. Try a different search term.
        </motion.p>
      )}
      
      {selectedExercise && (
        <motion.div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedExercise(null)}
        >
          <motion.div 
            className="card max-w-2xl w-full"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold mb-4">{selectedExercise.name}</h3>
            <div className="flex gap-3 mb-4">
              <span className="bg-white/10 px-3 py-1 rounded-full text-sm">{selectedExercise.difficulty}</span>
              <span className="bg-white/10 px-3 py-1 rounded-full text-sm">{selectedExercise.equipment}</span>
            </div>
            <p className="mb-6">{selectedExercise.description}</p>
            <div className="flex justify-end">
              <button 
                className="btn-primary"
                onClick={() => setSelectedExercise(null)}
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default ExerciseLibrary;