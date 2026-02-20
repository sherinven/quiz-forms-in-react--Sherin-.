import { useState } from "react";
import "./index.css";

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    age: "",
    password: "",
    confirmPassword: "",
    gender: "",
    role: "Student",
    studentId: "",
    acceptTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.fullName || formData.fullName.length < 3)
      newErrors.fullName =
        "Full name is required and must be at least 3 characters";

    if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "A valid email is required";

    if (formData.age < 18)
      newErrors.age = "Age must be at least 18";

    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords must match";

    if (!formData.gender)
      newErrors.gender = "Please select a gender";

    if (formData.role === "Student" && !formData.studentId)
      newErrors.studentId = "Student ID is required";

    if (!formData.acceptTerms)
      newErrors.acceptTerms = "You must accept the terms";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSubmittedData(formData);
    }
  };

  return (
    <div className="form-container">
      <h1>Registration Form</h1>

      <form onSubmit={handleSubmit}>
        <h3>Basic Info</h3>

        <label>Full Name</label>
        <input name="fullName" onChange={handleChange} />
        {errors.fullName && <p className="error">{errors.fullName}</p>}

        <label>Email</label>
        <input name="email" onChange={handleChange} />
        {errors.email && <p className="error">{errors.email}</p>}

        <label>Age</label>
        <input type="number" name="age" onChange={handleChange} />
        {errors.age && <p className="error">{errors.age}</p>}

        <h3>Account Info</h3>

        <label>Password</label>
        <input type="password" name="password" onChange={handleChange} />
        {errors.password && <p className="error">{errors.password}</p>}

        <label>Confirm Password</label>
        <input type="password" name="confirmPassword" onChange={handleChange} />
        {errors.confirmPassword && (
          <p className="error">{errors.confirmPassword}</p>
        )}

        <h3>Profile Info</h3>

        <label>Gender</label>
        <div>
          <input type="radio" name="gender" value="Male" onChange={handleChange} /> Male
          <input type="radio" name="gender" value="Female" onChange={handleChange} /> Female
        </div>
        {errors.gender && <p className="error">{errors.gender}</p>}

        <label>Role</label>
        <select name="role" onChange={handleChange}>
          <option value="Student">Student</option>
          <option value="Teacher">Teacher</option>
        </select>

        {formData.role === "Student" && (
          <>
            <label>Student ID</label>
            <input name="studentId" onChange={handleChange} />
            {errors.studentId && <p className="error">{errors.studentId}</p>}
          </>
        )}

        <h3>Terms</h3>

        <label>
          <input type="checkbox" name="acceptTerms" onChange={handleChange} />
          I agree to the Terms and Conditions
        </label>
        {errors.acceptTerms && <p className="error">{errors.acceptTerms}</p>}

        <button type="submit">Register</button>
      </form>

      {submittedData && (
        <div className="summary">
          <h3>Registration Summary</h3>
          <p>Full Name: {submittedData.fullName}</p>
          <p>Email: {submittedData.email}</p>
          <p>Age: {submittedData.age}</p>
          <p>Gender: {submittedData.gender}</p>
          <p>Role: {submittedData.role}</p>
          {submittedData.role === "Student" && (
            <p>Student ID: {submittedData.studentId}</p>
          )}
          <p>Accepted Terms: Yes</p>
        </div>
      )}
    </div>
  );
}