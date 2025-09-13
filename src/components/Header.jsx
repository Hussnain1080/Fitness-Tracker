import { motion } from 'framer-motion';

function Header() {
  return (
    <motion.header 
      className="py-6 mb-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1 
        className="text-4xl font-bold mb-2 shimmer-animation"
        whileHover={{ scale: 1.02 }}
      >
        FitTracker
      </motion.h1>
      <motion.p 
        className="text-gray-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Your Personal Fitness Companion
      </motion.p>
    </motion.header>
  );
}

export default Header;
