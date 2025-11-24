import { useEffect, useState, useContext } from "react";
import axiosInstance from "../../utils/axiosInstance";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  hover: {
    y: -8,
    scale: 1.02,
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  }
};

const heroVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

const statsVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const blobVariants = {
  animate: {
    scale: [1, 1.2, 1],
    opacity: [0.2, 0.3, 0.2],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const skeletonVariants = {
  initial: { opacity: 0.6 },
  animate: {
    opacity: [0.6, 1, 0.6],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Animated Section Component
const AnimatedSection = ({ children, className = "", delay = 0 }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.section
      ref={ref}
      className={className}
      variants={sectionVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ delay }}
    >
      {children}
    </motion.section>
  );
};

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchCourses = async () => {
    try {
      const { data } = await axiosInstance.get("/courses");
      setCourses(data);
    } catch (err) {
      console.error("Error fetching courses:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleApply = () => {
    if (!user) {
      navigate("/login");
    } else {
      navigate("/student-form");
    }
  };

  const getRandomGradient = () => {
    const gradients = [
      "from-purple-500 to-pink-500",
      "from-blue-500 to-cyan-500",
      "from-green-500 to-emerald-500",
      "from-orange-500 to-red-500",
      "from-indigo-500 to-purple-500",
      "from-teal-500 to-blue-500"
    ];
    return gradients[Math.floor(Math.random() * gradients.length)];
  };

  const formatDuration = (duration) => {
    if (duration.includes('month') || duration.includes('week')) {
      return duration;
    }
    if (!isNaN(duration)) {
      return `${duration} weeks`;
    }
    return duration;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-300 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div 
          className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl"
          variants={blobVariants}
          animate="animate"
        ></motion.div>
        <motion.div 
          className="absolute top-20 right-10 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl"
          variants={blobVariants}
          animate="animate"
          transition={{ delay: 2 }}
        ></motion.div>
        <motion.div 
          className="absolute bottom-20 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl"
          variants={blobVariants}
          animate="animate"
          transition={{ delay: 4 }}
        ></motion.div>
      </div>
      
      <Navbar />

      {/* Hero Section */}
      <AnimatedSection className="pt-28 pb-16 text-black" delay={0.2}>
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h1 
            className="text-7xl font-black mb-6"
            variants={heroVariants}
          >
            Discover Your Perfect <motion.span 
              className="text-purple-600"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >Internship</motion.span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-black max-w-2xl mx-auto leading-relaxed mb-8"
            variants={heroVariants}
            transition={{ delay: 0.3 }}
          >
            Kickstart your career with hands-on experience in top companies. 
            Learn, grow, and build your professional network.
          </motion.p>
          
          {/* Stats */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 bg-gray-900 text-purple-600 rounded-2xl p-10 gap-8 mt-12 max-w-2xl mx-auto"
            variants={containerVariants}
          >
            {[
              { number: "500+", text: "Successful Placements" },
              { number: "50+", text: "Partner Companies" },
              { number: "4.8/5", text: "Student Rating" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                variants={statsVariants}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                <div className="text-3xl font-bold mb-2">{stat.number}</div>
                <div className="text-white">{stat.text}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Courses Section */}
      <AnimatedSection className="py-20 max-w-7xl mx-auto px-6" delay={0.4}>
        <motion.div 
          className="text-center mb-16"
          variants={containerVariants}
        >
          <motion.h2 
            className="text-4xl font-bold text-gray-900 mb-4"
            variants={itemVariants}
          >
            Available Internships
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Choose from our carefully curated internship programs designed to 
            give you real-world experience and industry exposure.
          </motion.p>
        </motion.div>

        <AnimatePresence mode="wait">
          {loading ? (
            // Loading Skeleton
            <motion.div 
              key="loading"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {[...Array(6)].map((_, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg p-6"
                  variants={skeletonVariants}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="h-48 bg-gray-300 rounded-xl mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-3"></div>
                  <div className="h-4 bg-gray-300 rounded mb-3 w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-4 w-1/2"></div>
                  <div className="h-10 bg-gray-300 rounded"></div>
                </motion.div>
              ))}
            </motion.div>
          ) : courses.length === 0 ? (
            // Empty State
            <motion.div 
              key="empty"
              className="text-center py-16"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="max-w-md mx-auto">
                <motion.div 
                  className="w-32 h-32 bg-gradient-to-r from-purple-200 to-indigo-200 rounded-full flex items-center justify-center mx-auto mb-6"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.svg 
                    className="w-16 h-16 text-purple-500" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    animate={{ rotate: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </motion.svg>
                </motion.div>
                <motion.h3 
                  className="text-2xl font-bold text-gray-900 mb-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  No Internships Available
                </motion.h3>
                <motion.p 
                  className="text-gray-600 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  We're currently updating our internship programs. 
                  Check back soon for new opportunities!
                </motion.p>
                <motion.button 
                  onClick={fetchCourses}
                  className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Refresh Opportunities
                </motion.button>
              </div>
            </motion.div>
          ) : (
            // Courses Grid
            <motion.div 
              key="courses"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {courses.map((item, index) => (
                <motion.div
                  key={item._id}
                  className="group bg-white rounded-2xl shadow-lg overflow-hidden"
                  variants={cardVariants}
                  whileHover="hover"
                  custom={index}
                  layout
                >
                  {/* Animated Gradient Header */}
                  <motion.div 
                    className={`h-3 bg-gradient-to-r ${getRandomGradient()}`}
                    whileHover={{
                      scaleX: 1.1,
                      originX: 0,
                      transition: { duration: 0.3 }
                    }}
                  />
                  
                  <div className="p-6">
                    {/* Title */}
                    <motion.h3 
                      className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors duration-300 line-clamp-2"
                      whileHover={{ x: 5 }}
                    >
                      {item.title}
                    </motion.h3>

                    {/* Description */}
                    <motion.p 
                      className="text-gray-600 mb-4 line-clamp-3 leading-relaxed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                    >
                      {item.description}
                    </motion.p>

                    {/* Details Grid */}
                    <motion.div 
                      className="grid grid-cols-2 gap-4 mb-6"
                      variants={containerVariants}
                    >
                      <motion.div 
                        className="flex items-center space-x-2"
                        variants={itemVariants}
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                          <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Duration</div>
                          <div className="text-sm font-semibold text-gray-900">
                            {formatDuration(item.duration)}
                          </div>
                        </div>
                      </motion.div>

                      <motion.div 
                        className="flex items-center space-x-2"
                        variants={itemVariants}
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Fees</div>
                          <div className="text-sm font-semibold text-gray-900">
                            ₹{item.fees}
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>

                    {/* Additional Info */}
                    <motion.div 
                      className="flex items-center justify-between mb-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.4 }}
                    >
                      <div className="flex items-center space-x-2">
                        <motion.div 
                          className="w-2 h-2 bg-green-500 rounded-full"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <span className="text-sm text-gray-600">Immediate Joining</span>
                      </div>
                      <div className="flex items-center space-x-1 text-yellow-500">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                        <span className="text-sm font-semibold">4.8</span>
                      </div>
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div 
                      className="flex space-x-3"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                    >
                      <motion.button 
                        onClick={handleApply}
                        className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                        whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(139, 92, 246, 0.4)" }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Apply Now
                      </motion.button>
                      <motion.button 
                        className="w-12 h-12 border-2 border-gray-300 text-gray-600 rounded-xl flex items-center justify-center hover:border-purple-500 hover:text-purple-500 transition-colors duration-300"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </motion.button>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA Section */}
        {courses.length > 0 && (
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <motion.div 
              className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl p-8 text-white"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-bold mb-4">
                Can't Find What You're Looking For?
              </h3>
              <p className="text-purple-100 mb-6 max-w-md mx-auto">
                Let us know your interests and we'll help you find the perfect internship match.
              </p>
              <motion.button 
                className="bg-white text-purple-600 px-8 py-3 rounded-xl font-semibold hover:bg-purple-50 transition-colors duration-300 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Personalized Recommendations
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatedSection>

      <Footer />
    </div>
  );
};

export default Courses;