import React, { useState, useEffect } from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import styles from "./userForm.module.css";

const UserForm = ({ user, onSubmit, onCancel, isAddingNew }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    company: { name: "" },
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        username: user.username || "",
        company: { name: user.company?.name || "" },
      });
    } else {
      setFormData({
        name: "",
        email: "",
        username: "",
        company: { name: "" },
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'company') {
      setFormData((prevState) => ({
        ...prevState,
        company: { ...prevState.company, name: value },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name?.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const submitData = {
        name: formData.name,
        email: formData.email,
        username: formData.username,
        company: { name: formData.company.name }
      };

      await onSubmit(submitData);
    } catch (error) {
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.formTitle}>
        {isAddingNew ? "Add New User" : "Edit User"}
      </h2>

      <div className={styles.inputGroup}>
        <label htmlFor="name" className={styles.label}>
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          className={styles.input}
        />
        {errors.name && (
          <p className={styles.errorMessage}>
            <ExclamationTriangleIcon className={styles.errorIcon} />
            {errors.name}
          </p>
        )}
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="email" className={styles.label}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className={styles.input}
        />
        {errors.email && (
          <p className={styles.errorMessage}>
            <ExclamationTriangleIcon className={styles.errorIcon} />
            {errors.email}
          </p>
        )}
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="username" className={styles.label}>
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          value={formData.username}
          onChange={handleChange}
          className={styles.input}
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="company" className={styles.label}>
          Company Name
        </label>
        <input
          id="company"
          name="company"
          type="text"
          value={formData.company.name}
          onChange={handleChange}
          className={styles.input}
        />
      </div>

      <div className={styles.buttonGroup}>
        <button
          type="button"
          onClick={onCancel}
          className={`${styles.button} ${styles.secondaryButton}`}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={`${styles.button} ${styles.primaryButton} ${
            isSubmitting ? styles.disabled : ""
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting
            ? isAddingNew
              ? "Adding..."
              : "Saving..."
            : isAddingNew
            ? "Add User"
            : "Save Changes"}
        </button>
      </div>
    </form>
  );
};

export default UserForm;