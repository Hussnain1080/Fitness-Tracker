import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion' // Add this import
import Header from './components/Header'
import Navigation from './components/Navigation'
import Dashboard from './components/Dashboard'
import WorkoutTracker from './components/WorkoutTracker'
import ExerciseLibrary from './components/ExerciseLibrary'
import BMICalculator from './components/BMICalculator'
import WorkoutTimer from './components/WorkoutTimer'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [workouts, setWorkouts] = useState([]);

  const addWorkout = (workout) => {
    const newWorkout = {
      ...workout,
      id: Date.now(),
      date: new Date().toLocaleDateString(),
    };
    setWorkouts((prev) => [newWorkout, ...prev]);
  };

  const renderActiveComponent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard workouts={workouts} />;
      case "tracker":
        return <WorkoutTracker onAddWorkout={addWorkout} />;
      case "exercises":
        return <ExerciseLibrary />;
      case "bmi":
        return <BMICalculator />;
      case "timer":
        return <WorkoutTimer />;
      default:
        return <Dashboard workouts={workouts} />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <Header />
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <AnimatePresence mode="wait">
        <motion.main
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderActiveComponent()}
        </motion.main>
      </AnimatePresence>
    </div>
  );
}

export default App;
