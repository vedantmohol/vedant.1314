import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updatePageFailure, updatePageStart, updatePageSuccess } from "../redux/page/pageSlice";
import { FaTwitter, FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";

function Contact() {
  const { currentUser } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.page);
  const dispatch = useDispatch();
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;


  const isAdmin = currentUser?.isAdmin;
  const [pageData, setPageData] = useState({ email: "", phone: "" });
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [contactInfo, setContactInfo] = useState({ email: "", phone: "" });
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [status, setStatus] = useState("");
  const [adminForm, setAdminForm] = useState({ email: "", phone: "" });
  const [successMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await fetch("/api/pages/");
        const data = await res.json();
        setPageData(data.contact || {});
        setContactInfo(data.contact || {});
        setAdminForm(data.contact || {});
      } catch (err) {
        setErrorMsg("Failed to fetch contact details");
      }
    };
    fetchContact();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAdminChange = (e) => {
    setAdminForm({ ...adminForm, [e.target.name]: e.target.value });
  };

  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg(null);
    setErrorMsg(null);

    try {
      dispatch(updatePageStart());
      const res = await fetch("/api/pages/contact", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(adminForm),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updatePageFailure(data.message));
        setErrorMsg(data.message || "Failed to update contact.");
      } else {
        dispatch(updatePageSuccess(data));
        setContactInfo(data);
        setSuccessMsg("Contact updated successfully!");
      }
    } catch (err) {
      dispatch(updatePageFailure(err.message));
      setErrorMsg("Something went wrong");
    }
  };

  const sendOtp = async () => {
    if (!formData.email.includes("@")) {
      return setStatus("Enter a valid email address first");
    }
    setSendingOtp(true);
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });
      const data = await res.json();
      if (res.ok) {
        setOtpSent(true);
        setStatus("OTP sent! Check your email.");
      } else {
        setStatus(data.message || "Failed to send OTP");
      }
    } catch (err) {
      setStatus("Failed to send OTP");
    } finally {
      setSendingOtp(false);
    }
  };

  const verifyOtp = async () => {
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, otp }),
      });
      const data = await res.json();
      if (res.ok && data.verified) {
        setOtpVerified(true);
        setStatus("Email verified successfully!");
      } else {
        setStatus(data.message || "Invalid OTP");
      }
    } catch (err) {
      setStatus("Verification failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otpVerified) {
      return setStatus("Please verify your email first using OTP");
    }
    setSendingMessage(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
      setOtp("");
      setOtpSent(false);
      setOtpVerified(false);
    } catch {
      setStatus("Failed to send message");
    }finally {
      setSendingMessage(false);
    }
  };

  return (
    <section className="min-h-screen pt-20 px-6 max-w-5xl mx-auto">
      <h2 className="text-5xl font-bold mb-4 text-center">
        Contact
        <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"> Me</span>
      </h2>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-6">
        Feel free to reach out for any collaborations or inquiries. I'm always open to new opportunities!
      </p>

      <div className="flex justify-center mt-5 gap-4">
        <a
          href="https://x.com/vedant_1314"
          target="_blank"
          className="p-3 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white"
        >
          <FaTwitter size={20} />
        </a>
        <a
          href="https://github.com/vedantmohol"
          target="_blank"
          className="p-3 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white"
        >
          <FaGithub size={20} />
        </a>
        <a
          href="https://www.instagram.com/vedant.1314"
          target="_blank"
          className="p-3 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white"
        >
          <FaInstagram size={20} />
        </a>
        <a
          href="https://www.linkedin.com/in/vedant-mohol-a79613271"
          target="_blank"
          className="p-3 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white"
        >
          <FaLinkedin size={20} />
        </a>
      </div>

      {isAdmin ? (
        <form onSubmit={handleAdminSubmit} className="bg-white shadow-md rounded-lg p-6 max-w-xl mx-auto space-y-4">
          <input
            type="email"
            name="email"
            value={adminForm.email}
            placeholder="Admin Email"
            onChange={handleAdminChange}
            className="w-full border border-gray-300 rounded p-2"
            required
          />
          <input
            type="text"
            name="phone"
            value={adminForm.phone}
            placeholder="Admin Phone"
            onChange={handleAdminChange}
            className="w-full border border-gray-300 rounded p-2"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded hover:opacity-90 disabled:opacity-60"
          >
            {loading ? "Saving..." : "Save Contact Info"}
          </button>
          {successMsg && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded">{successMsg}</div>}
          {errorMsg && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">{errorMsg}</div>}
        </form>
      ) : (
        <form onSubmit={handleSubmit} className="mt-5 bg-white p-6 shadow-lg rounded-md max-w-xl mx-auto">
          <h3 className="text-xl font-semibold mb-4">Send a Message</h3>

          <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded mb-4" required />

          <div className="flex gap-2">
            <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded mb-4" required disabled={otpSent || otpVerified} />
            {!otpVerified && (
              <button type="button" onClick={sendOtp} className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 rounded mb-4 flex items-center justify-center gap-2" disabled={sendingOtp}>
                {sendingOtp ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  "Send OTP"
                )}
              </button>
            )}
          </div>

          {otpSent && !otpVerified && (
            <div className="mb-4">
              <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} className="w-full p-3 border border-gray-300 rounded mb-2" />
              <button type="button" onClick={verifyOtp} className="bg-green-500 text-white px-4 rounded">Verify OTP</button>
            </div>
          )}

          <textarea name="message" placeholder="Your Message" rows="5" value={formData.message} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded mb-4" required></textarea>

          <button type="submit" className="bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 px-6 rounded hover:opacity-90" disabled={sendingMessage}>
            {sendingMessage ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white inline-block mr-2" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
                Sending...
              </>
            ) : (
              "Send Message"
            )}
          </button>

          {status && <p className="mt-4 text-center text-green-600 font-medium">{status}</p>}
        </form>
      )}
    </section>
  );
}

export default Contact;