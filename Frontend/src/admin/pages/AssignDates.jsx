import { useState, useEffect ,useContext } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import { SidebarContext } from "../../context/SidebarContext";

const AssignDates = () => {
  const [forms, setForms] = useState([]);
  const [uniqueStudents, setUniqueStudents] = useState([]);

  const [selectedStudentEmail, setSelectedStudentEmail] = useState("");
  const [domainsForStudent, setDomainsForStudent] = useState([]);
  const [selectedFormId, setSelectedFormId] = useState("");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Load all applied internship forms
  const loadData = async () => {
    try {
      const { data } = await axiosInstance.get("/student-report/all");
      setForms(data);

      // extract unique students
      const unique = [
        ...new Map(data.map((s) => [s.email, s])).values(),
      ];
      setUniqueStudents(unique);
    } catch {
      toast.error("Failed to load student data");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // When a student is selected → load all domains they applied to
  const onStudentSelect = (email) => {
    setSelectedStudentEmail(email);

    const allDomains = forms.filter((f) => f.email === email);
    setDomainsForStudent(allDomains);
  };

  const handleAssign = async () => {
    if (!selectedFormId || !startDate || !endDate) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      await axiosInstance.put("/dates/assign", {
        internshipId: selectedFormId,
        startDate,
        endDate,
      });

      toast.success("Dates assigned successfully!");
      loadData();
    } catch {
      toast.error("Error assigning dates");
    }
  };
 const { hidden } = useContext(SidebarContext);
  return (
    <div className={`min-h-screen bg-white p-8 ${!hidden ? "ml-84" : "ml-10"} transition-all duration-300`}>
      <h2 className="text-3xl font-bold text-gray-900 ml-20 mb-2">Assign Internship Dates</h2>
<br></br>
      {/* Select Student */}
      <select
        className="border p-3 rounded w-full mb-4"
        onChange={(e) => onStudentSelect(e.target.value)}
      >
        <option value="">Select Student</option>
        {uniqueStudents.map((s) => (
          <option key={s._id} value={s.email}>
            {s.name}
          </option>
        ))}
      </select>

      {/* Select Domain */}
      <select
        className="border p-3 rounded w-full mb-4"
        onChange={(e) => setSelectedFormId(e.target.value)}
        disabled={!selectedStudentEmail}
      >
        <option value="">Select Internship Domain</option>
        {domainsForStudent.map((d) => (
          <option key={d._id} value={d._id}>
            {d.internshipDomain}
          </option>
        ))}
      </select>

      {/* Start Date */}
      <label>Start Date:</label>
      <input
        type="date"
        className="border p-3 rounded w-full mb-4"
        onChange={(e) => setStartDate(e.target.value)}
      />

      {/* End Date */}
      <label>End Date:</label>
      <input
        type="date"
        className="border p-3 rounded w-full mb-4"
        onChange={(e) => setEndDate(e.target.value)}
      />

      <button
        onClick={handleAssign}
        className="bg-blue-600 text-white p-3 rounded w-full"
      >
        Assign Dates
      </button>
    </div>
  );
};

export default AssignDates;
