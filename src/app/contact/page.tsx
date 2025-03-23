"use client";
import React, { useState } from "react";
import styles from "./contact.module.css";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    console.log("Form Data Submitted:", formData);

 
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <>
      <h1 className={styles.h1}>CONTACT US</h1>

      <div className={styles.container}>
        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <ul>
            <li>
              <label htmlFor="name">Nom :</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ajouter votre nom..."
                required
              />
            </li>
            <li>
              <label htmlFor="mail">E-mail :</label>
              <input
                type="email"
                id="mail"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Votre e-mail..."
                required
              />
            </li>
            <li>
              <label htmlFor="msg">Message :</label>
              <textarea
                id="msg"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Votre message..."
                required
              ></textarea>
            </li>
            <li>
              <button type="submit">Envoyer</button>
            </li>
          </ul>
        </form>
      </div>
    </>
  );
};

export default Contact;
