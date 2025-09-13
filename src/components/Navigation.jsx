import { motion } from 'framer-motion';

function Navigation({ activeTab, setActiveTab }) {
  const navItems = [
    { id: "dashboard", label: "Dashboard" },
    { id: "tracker", label: "Workout Tracker" },
    { id: "exercises", label: "Exercise Library" },
    { id: "bmi", label: "BMI Calculator" },
    { id: "timer", label: "Workout Timer" },
  ];

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
    <motion.nav 
      className="flex overflow-x-auto py-2 mb-8 border-b border-white/10"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {navItems.map((item) => (
        <motion.button
          key={item.id}
          className={`px-4 py-2 mx-1 rounded-xl whitespace-nowrap transition-all ${activeTab === item.id ? 'bg-white/20 shadow-lg' : 'bg-transparent hover:bg-white/10'}`}
          onClick={() => setActiveTab(item.id)}
          variants={item}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {item.label}
        </motion.button>
      ))}
    </motion.nav>
  );
}

export default Navigation;