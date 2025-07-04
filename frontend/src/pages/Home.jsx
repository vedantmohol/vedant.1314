import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../Firebase.js";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { updatePageFailure, updatePageStart, updatePageSuccess } from "../redux/page/pageSlice.js";

function Home() {
  const { currentUser } = useSelector((state) => state.user);
  const { error, loading } = useSelector((state) => state.page);
  const isAdmin = currentUser?.isAdmin;
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const filePickerRef = useRef();
  const [imageFileUploadingProgress, setImageFileUploadingProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updatepageSuccess, setUpdatepageSuccess] = useState(null);
  const [updatePageError, setUpdatePageError] = useState(null);
  const [formData, setFormData] = useState({});
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);

  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    setImageFileUploading(true);
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadingProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError(
          "Could not upload image (File must be less than 2MB"
        );
        setImageFileUploadingProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, image: downloadURL });
          setImageFileUploading(false);
        });
      }
    );
  };

  const handlePdfChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          alert("Failed to upload PDF");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setPdfUrl(downloadURL);
            setFormData((prev) => ({ ...prev, pdf: downloadURL }));
          });
        }
      );
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdatePageError(null);
    setUpdatepageSuccess(null);
    if (Object.keys(formData).length === 0) {
      setUpdatePageError("No changes made");
      return;
    }

    if (imageFileUploading) {
      setUpdatePageError("Please wait for image to upload");
      return;
    }

    try {
      dispatch(updatePageStart());
      const res = await fetch("/api/pages/home", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        dispatch(updatePageFailure(data.message));
        setImageFileUploadError(data.message);
      } else {
        dispatch(updatePageSuccess(data));
        setUpdatepageSuccess("Page updated successfully!");
      }
    } catch (error) {
      dispatch(updatePageFailure(error.message));
    }
  };

  return (
    <div className="min-h-screen mt-20">
      {isAdmin ? (
        <div>
          <form
            onSubmit={handleSubmit}
            className="flex p-3 max-w-5xl mx-auto flex-col md:flex-row md:items-center gap-10"
          >
            <div className="flex-1">
              <h2 className="font-semibold text-3xl">
                Hello , Myself <span className="">Vedant</span>
              </h2>
              <input
                type="text"
                id="text"
                placeholder="Enter details : Eg, A software developer"
                onChange={handleChange}
                className="border p-3 h-full w-full rounded mt-5"
              />
              <input
                type="file"
                accept="application/pdf"
                onChange={handlePdfChange}
                className="mt-5"
              />
              <button
                type="submit"
                className="bg-gradient-to-r mt-5 from-purple-500 to-blue-500 text-white py-2 px-4 rounded hover:opacity-90 disabled:opacity-50"
                disabled={loading || imageFileUploading}
              >
                {loading ? "Loading..." : "Update"}
              </button>
            </div>
            <input
              className="flex-1"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              ref={filePickerRef}
              hidden
            />
            <div
              className="relative w-64 h-64 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
              onClick={() => filePickerRef.current.click()}
            >
              {imageFileUploadingProgress && (
                <CircularProgressbar
                  value={imageFileUploadingProgress || 0}
                  text={`${imageFileUploadingProgress}`}
                  strokeWidth={5}
                  styles={{
                    root: {
                      width: "100%",
                      height: "100%",
                      position: "absolute",
                      top: 0,
                      left: 0,
                    },
                    path: {
                      stroke: `rgba(62, 152, 199, ${
                        imageFileUploadingProgress / 100
                      })`,
                    },
                  }}
                />
              )}
              <img
                src={imageFileUrl}
                className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
                  imageFileUploadingProgress &&
                  imageFileUploadingProgress < 100 &&
                  "opacity-60"
                }`}
              />
            </div>
            {imageFileUploadError && (
              <div
                className="mt-5 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <span className="block sm:inline">{imageFileUploadError}</span>
              </div>
            )}
          </form>
          {updatepageSuccess && (
            <div
              className="mt-5 max-w-md mx-auto bg-green-100 border border-green-400 text-green-700 px-4 py-4 rounded relative"
              role="alert"
            >
              <span className="block sm:inline">{updatepageSuccess}</span>
            </div>
          )}

          {updatePageError && (
            <div
              className="mt-5 max-w-md mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-4 rounded relative"
              role="alert"
            >
              <span className="block sm:inline">{updatePageError}</span>
            </div>
          )}

          {error && (
            <div
              className="mt-5 max-w-md mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-4 rounded relative"
              role="alert"
            >
              <span className="block sm:inline">{error}</span>
            </div>
          )}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Home;