import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updatePageFailure, updatePageStart, updatePageSuccess } from "../redux/page/pageSlice";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../Firebase";

function Projects() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const isAdmin = currentUser?.isAdmin;

  const [projects, setProjects] = useState([]);
  const [inputFields, setInputFields] = useState([
    { title: "", content: "", image: "", link: "" },
  ]);
  const [imageFiles, setImageFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/pages");
      const data = await res.json();
      setProjects(data?.projects?.list || []);
      setInputFields(data?.projects?.list || []);
    } catch (err) {
      setErrorMsg("Failed to fetch projects.");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChange = (index, e) => {
    const values = [...inputFields];
    values[index][e.target.name] = e.target.value;
    setInputFields(values);
  };

  const handleImageChange = (index, file) => {
    const values = [...inputFields];
    const files = [...imageFiles];
    files[index] = file;
    setImageFiles(files);

    const uploadImage = async () => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      setUploading(true);

      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          console.error("Upload failed:", error);
          setUploading(false);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            values[index].image = downloadURL;
            setInputFields(values);
            setUploading(false);
          });
        }
      );
    };

    uploadImage();
  };

  const handleAddField = () => {
    setInputFields([...inputFields, { title: "", content: "", image: "", link: "" }]);
    setImageFiles([...imageFiles, null]);
  };

  const handleRemoveField = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
    const files = [...imageFiles];
    files.splice(index, 1);
    setImageFiles(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      dispatch(updatePageStart());
      const res = await fetch("/api/pages/projects", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ list: inputFields }),
      });

      const data = await res.json();

      if (!res.ok) {
        dispatch(updatePageFailure(data.message));
        setErrorMsg(data.message || "Failed to update projects.");
      } else {
        dispatch(updatePageSuccess(data));
        setSuccessMsg("Projects updated successfully!");
        fetchProjects();
      }
    } catch (err) {
      dispatch(updatePageFailure(err.message));
      setErrorMsg("An unexpected error occurred.");
    }
  };

  return (
    <div className="min-h-screen mt-24 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">
        <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Projects
        </span>
      </h2>

      {isAdmin ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          {inputFields.map((field, index) => (
            <div key={index} className="border p-4 rounded-lg shadow">
              <input
                type="text"
                name="title"
                placeholder="Project Title"
                value={field.title}
                onChange={(e) => handleChange(index, e)}
                className="w-full p-2 border rounded mb-2"
              />
              <textarea
                name="content"
                placeholder="Project Description"
                value={field.content}
                onChange={(e) => handleChange(index, e)}
                className="w-full p-2 border rounded mb-2"
              />
              <input
                type="text"
                name="link"
                placeholder="Project Link"
                value={field.link}
                onChange={(e) => handleChange(index, e)}
                className="w-full p-2 border rounded mb-2"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(index, e.target.files[0])}
                className="mb-2"
              />
              <button
                type="button"
                onClick={() => handleRemoveField(index)}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={handleAddField}
              className="bg-gray-200 text-sm px-3 py-1 rounded hover:bg-gray-300"
            >
              + Add Project
            </button>
            <button
              type="submit"
              disabled={uploading}
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded hover:opacity-90 disabled:opacity-60"
            >
              {uploading ? "Uploading..." : "Save Projects"}
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="relative rounded-lg overflow-hidden shadow-lg group"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-72 object-cover transform group-hover:scale-110 transition duration-300"
              />

              <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-center items-center p-4">
                <h3 className="text-white text-2xl font-bold mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-300 text-sm mb-4 text-center">
                  {project.content}
                </p>
                {project.link && (
                    <button className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-4 py-2 rounded cursor-pointer">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Project
                  </a>
                  </button>
                )}
              </div>

              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white text-center py-2 text-lg font-semibold transition duration-300 group-hover:opacity-0">
                {project.title}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Projects;
