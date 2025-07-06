import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updatePageStart, updatePageSuccess, updatePageFailure,} from "../redux/page/pageSlice";
import { CiShoppingTag } from "react-icons/ci"

function Services() {
  const { currentUser } = useSelector((state) => state.user);
  const { error, loading } = useSelector((state) => state.page);
  const isAdmin = currentUser?.isAdmin;

  const dispatch = useDispatch();
  const [services, setServices] = useState([]);
  const [formFields, setFormFields] = useState([]);
  const [successMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const fetchServices = async () => {
    try {
      const res = await fetch("/api/pages");
      const data = await res.json();
      const list = data?.services?.list || [];

      setServices(list);

      const initialFields = list.map((service) => ({
        title: service.title || "",
        content: service.content || "",
        skills: (service.skills || []).join(", "),
      }));

      setFormFields(initialFields.length > 0 ? initialFields : [{ title: "", content: "", skills: "" }]);
    } catch (err) {
      setErrorMsg("Failed to fetch services.");
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleChange = (index, e) => {
    const updatedFields = [...formFields];
    updatedFields[index][e.target.name] = e.target.value;
    setFormFields(updatedFields);
  };

  const handleAddField = () => {
    setFormFields([...formFields, { title: "", content: "", skills: "" }]);
  };

  const handleRemoveField = (index) => {
    const updatedFields = [...formFields];
    updatedFields.splice(index, 1);
    setFormFields(updatedFields);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const formatted = formFields.map((service) => ({
      title: service.title,
      content: service.content,
      skills: service.skills.split(",").map((s) => s.trim()).filter(Boolean),
    }));

    try {
      dispatch(updatePageStart());
      const res = await fetch("/api/pages/services", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ list: formatted }),
      });

      const data = await res.json();

      if (!res.ok) {
        dispatch(updatePageFailure(data.message));
        setErrorMsg(data.message || "Failed to update services.");
      } else {
        dispatch(updatePageSuccess(data));
        setSuccessMsg("Services updated successfully!");
        fetchServices();
      }
    } catch (err) {
      dispatch(updatePageFailure(err.message));
      setErrorMsg("An unexpected error occurred.");
    }
  };

  return (
    <div className="min-h-screen mt-24 px-4 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">
        <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Services
        </span>
      </h2>

      {isAdmin ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          {formFields.map((field, index) => (
            <div key={index} className="border p-4 rounded-lg shadow space-y-3">
              <input
                type="text"
                name="title"
                placeholder="Service Title"
                value={field.title}
                onChange={(e) => handleChange(index, e)}
                className="w-full p-2 border rounded"
              />
              <textarea
                name="content"
                placeholder="Service Description"
                value={field.content}
                onChange={(e) => handleChange(index, e)}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="skills"
                placeholder="Comma separated skills (e.g., React, Tailwind)"
                value={field.skills}
                onChange={(e) => handleChange(index, e)}
                className="w-full p-2 border rounded"
              />
              {formFields.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveField(index)}
                  className="text-red-500 hover:underline"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={handleAddField}
              className="bg-gray-200 text-sm px-3 py-1 rounded hover:bg-gray-300"
            >
              + Add Service
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded hover:opacity-90 disabled:opacity-60"
            >
              {loading ? "Saving..." : "Save Services"}
            </button>
          </div>

          {successMsg && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mt-4">
              {successMsg}
            </div>
          )}
          {errorMsg && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4">
              {errorMsg}
            </div>
          )}
        </form>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-10 px-2">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="w-full max-w-xl bg-white text-black p-6 rounded-xl shadow-md transition duration-300 transform hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] border border-transparent"
              style={{
                boxShadow:
                  "0 0 10px rgba(139,92,246,0.4), 0 0 20px rgba(232,121,249,0.3)",
              }}
            >
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                {service.title}
              </h3>
              <p className="text-base leading-relaxed mb-5">
                {service.content}
              </p>

              <div className="flex flex-wrap gap-3 mt-4">
                {service.skills.map((skill, sidx) => (
                  <span
                    key={sidx}
                    className="flex items-center gap-2 text-sm font-medium px-3 py-1 text-white rounded-md"
                    style={{
                      background:
                        "linear-gradient(to right, #6366f1, #8b5cf6, #ec4899)", 
                    }}
                  >
                    <CiShoppingTag className="text-white" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Services;