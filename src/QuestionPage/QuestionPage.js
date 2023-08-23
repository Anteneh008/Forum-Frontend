import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axios from "axios";

const QuestionPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const question = searchParams.get("question");
  const questionDescription = searchParams.get("questionDescription");
  const questionId = searchParams.get("question_id");
  const [userData, setUserData] = useContext(UserContext);
  const [formData, setFormData] = useState({
    answer: "",
    email:  userData.user?.user_email || "",
    question_id: questionId,
  });
  const [answers, setAnswers] = useState([]);

  console.log(answers)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const fetchAnswers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4001/api/get-answers/${questionId}`
      );

      setAnswers(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching answers:", error);
    }
  };

  const submitAnswer = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4001/api/submit-answer",
        formData
      );

      // Handle success
      console.log("Answer submitted:", response.data);
      fetchAnswers();
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };

  useEffect(() => {
    // Fetch answers for the specific question using questionId
    fetchAnswers();
  }, [questionId]);

  useEffect(() => {
    // Check if the user is logged out
    if (!userData.user) {
      navigate("/login"); // Redirect to the login page
    }
  }, [userData.user, navigate]);

    const formatTimeDifference = (timestamp) => {
    const currentTime = new Date();
    // console.log(currentTime)
    const postedTime = new Date(timestamp);
    // console.log(postedTime)

    const timeDifference = currentTime - postedTime;
    const minutes = Math.floor(timeDifference / (1000 * 60));
    if (minutes < 60) {
      return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
    }

    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    if (hours < 24) {
      return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    }

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  };

  return (
    <Container>
      <Header>
        <h2>Question</h2>
        <p>{question}</p>
        <small>{questionDescription}</small>
      </Header>
      <AnswerFrom>
        <h2>Answer from the community</h2>
      </AnswerFrom>
      <PostQuestion>
        {answers.map((answer, index) => (
          <QuestionsList key={index}>
            <User>
              <AccountCircleOutlinedIcon />
              <h4>{answer.user_name}</h4>
            </User>

            <p>{answer.answer}</p>
            <p>{formatTimeDifference(answer.timestamp)}</p>
          </QuestionsList>
        ))}
      </PostQuestion>
      <PublicAnswer>
        <h2>Answer The Top Question</h2>
        <p>Go to Question Page</p>
        <form>
          <br />
          <textarea
            placeholder="Your Answer..."
            rows={8}
            cols={30}
            name="answer"
            value={formData.answer}
            onChange={handleInputChange}
          />
          <br />

          <button type="submit" onClick={submitAnswer}>
            Post Your Answer
          </button>
        </form>
      </PublicAnswer>
    </Container>
  );
};

export default QuestionPage;

const Container = styled.section`
  height: 100%;
  margin-bottom: 60px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 330px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  margin-right: 340px;
  padding-bottom: 20px;
  @media (max-width: 768px) {
    margin: 0 auto;
    width: 400px;
  }

  @media (min-width: 769px) and (max-width: 992px) {
    width: 600px;
    margin: 0 auto;
  }
`;

const AnswerFrom = styled.div`
  margin-left: 330px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  margin-right: 340px;

  @media (max-width: 768px) {
    margin: 0 auto;
    font-size: 16px;
    width: 400px;
  }

  @media (min-width: 769px) and (max-width: 992px) {
    width: 600px;
    margin: 0 auto;
  }
`;

const PostQuestion = styled.div`
  margin: 0 auto;
  width: 850px;

  h4 {
    text-align: left;
    padding-bottom: 10px;
    width: 750;
  }

  @media (max-width: 768px) {
    width: 400px;
  }
  @media (min-width: 769px) and (max-width: 992px) {
    width: 600px;
    margin: 0 auto;
  }
`;

const QuestionsList = styled.div`
  margin-bottom: 50px;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  justify-content: center;
  gap: 40px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  p {
    flex-wrap: wrap;
  }
  
  svg {
    font-size: 40px;
  }
`;

const User = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  svg {
    font-size: 70px;
  }
`;

const PublicAnswer = styled.div`
  max-width: 850px;
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
    margin-top: 40px;
  }
  @media (min-width: 769px) and (max-width: 992px) {
    width: 600px;
    margin: 0 auto;
  }
  p {
    margin-top: 10px; // Adjust this value to your preference
  }
  h2 {
    padding-top: 40px;
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    background: white;

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
        margin-left: 10px;
      }
      @media (min-width: 769px) and (max-width: 992px) {
        width: 500px;
        margin-left: 10px;
      }
    }
    button {
      margin-bottom: 50px;
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
