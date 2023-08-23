import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const AskQuestion = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useContext(UserContext);
  const [formData, setFormData] = useState({
    question: "",
    question_description: "",
    email: userData.user?.user_email,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4001/api/questions",
        formData
      );

      navigate("/");
    } catch (error) {
      console.error("Error submitting question:", error);
    }
  };

  useEffect(() => {
    // Check if the user is logged out
    if (!userData.user) {
      navigate("/login"); // Redirect to the login page
    }
  }, [userData.user, navigate]);

  return (
    <Container>
      <ListWrapper>
        <h2>Steps to write a good question</h2>
        <ul>
          <li>Summerize your problem in a one-line title.</li>
          <li>Descripe your problem in more detail.</li>
          <li>Descripe what your tried and what you expected to happen.</li>
          <li>Review your question and post it to the site</li>
        </ul>
      </ListWrapper>
      <PublicQuestion>
        <h2>Ask public question</h2>
        <p>Go to Question Page</p>
        <form>
          <input
            type="text"
            placeholder="Title"
            name="question"
            value={formData.question}
            onChange={handleInputChange}
          />
          <br />
          <textarea
            placeholder="Question Description..."
            rows={8}
            cols={30}
            name="question_description"
            value={formData.question_description}
            onChange={handleInputChange}
          />
          <br />

          <button type="submit" onClick={handleSubmit}>
            Post Your question
          </button>
        </form>
      </PublicQuestion>
    </Container>
  );
};

export default AskQuestion;

const Container = styled.div`
  height: 100vh;
`;

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  align-items: center;
  justify-content: center;
`;

const PublicQuestion = styled.div`
  max-width: 800px;
  padding-bottom: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: white;
  box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.12);
  -webkit-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.12);
  -moz-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.12);
  margin: 0 auto;

  @media (max-width: 768px) {
    width: 400px;
  }
  p {
    margin-top: 10px; // Adjust this value to your preference
  }
  h2 {
    padding-top: 20;
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    background: white;

    input {
      width: 670px;
      margin-left: 50px;
      margin-right: 50px;
      padding-top: 15px;
      padding-bottom: 15px;
      padding-left: 20px;
      border-radius: 5px;
      border: 1px solid rgba(0, 0, 0, 0.25);
      @media (max-width: 768px) {
        width: 300px;
        margin-left: 20px;

      }
    }

    textarea {
      /* width: 672px; */
      width: 670px;
      border: 1px solid rgba(0, 0, 0, 0.25);
      padding-left: 20px;
      padding-top: 15px;
      border-radius: 5px;
      margin-left: 50px;
      resize: none;
      @media (max-width: 768px) {
        width: 300px;
        margin-left: 20px;
      }
    }
    button {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      background: #516cf0;
      color: #ffffff;
      border: none;
      padding: 15px 40px;
      border-radius: 5px;
      font-size: 15px;
      letter-spacing: 1.2px;
      margin-left: 48px;
      &:hover {
        cursor: pointer;
        background: #fe8402;
      }
      @media (max-width: 768px) {
      margin: 0 auto;
    }
    }

  }
`;
