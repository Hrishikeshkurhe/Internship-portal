import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Enquiry = () => {
  return (
    <div>
      <Navbar />

      <section className="pt-32 pb-20 text-center max-w-4xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-4">Enquiry</h2>
        <p className="text-gray-600 mb-6 text-lg">
          Need help? Contact our team anytime.
        </p>

        <a
          href="mailto:support@clickinnovate.com"
          className="px-8 py-3 bg-indigo-600 text-white rounded-lg"
        >
          Send Email
        </a>
      </section>

      <Footer />
    </div>
  );
};

export default Enquiry;
