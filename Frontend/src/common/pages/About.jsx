import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const About = () => {
  return (
    <div>
      <Navbar />

      <section className="pt-32 pb-20 max-w-5xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">About Us</h2>
        <p className="text-gray-600 leading-relaxed text-lg">
          Clickinnovate is a training and internship platform focused on providing
          hands-on learning with industry-grade projects, mentorship, and career support.
        </p>
      </section>

      <Footer />
    </div>
  );
};

export default About;
