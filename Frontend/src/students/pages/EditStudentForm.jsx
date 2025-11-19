import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

const EditStudentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const fetchForm = async () => {
      const { data } = await axiosInstance.get("/admin/forms");
      const found = data.find((item) => item._id === id);
      setFormData(found);
    };
    fetchForm();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axiosInstance.put(`/admin/edit/${id}`, formData);
    alert("Form updated successfully!");
    navigate(-1);
  };

  if (!formData)
    return (
      <div className=" flex justify-center items-center h-screen">
        <h2 className="text-xl text-gray-600">Loading...</h2>
      </div>
    );

  return (
    <div className=" min-h-screen bg-gray-100 p-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Edit Student Form</h2>
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
        >
          ← Back
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 shadow-lg rounded max-w-2xl"
      >
        {Object.keys(formData)
          .filter((key) => !["_id", "__v", "createdAt", "student"].includes(key))
          .map((key) => (
            <div key={key} className="mb-4">
              <label className="block font-medium mb-1 capitalize">
                {key.replace(/([A-Z])/g, " $1")}
              </label>
              <input
                type="text"
                value={formData[key]}
                onChange={(e) =>
                  setFormData({ ...formData, [key]: e.target.value })
                }
                className="w-full border rounded p-2"
              />
            </div>
          ))}
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditStudentForm;
