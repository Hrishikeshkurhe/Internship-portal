import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Team = () => {
  return (
    <div>
      <Navbar />

      <section className="pt-32 pb-20 max-w-5xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">Team</h2>
        <p className="text-lg text-gray-600">
          We provide resume building, mock interviews, technical training,
          internship certification, and placement assistance.
        </p>
      </section>

      <Footer />
    </div>
  );
};

export default Team;
