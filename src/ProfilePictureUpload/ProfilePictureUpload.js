import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const ProfilePictureUpload = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useContext(UserContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFilePreview, setSelectedFilePreview] = useState(null);

  console.log(userData.user.profilePicture);

  const handleFileSelect = (event) => {
    // Check if the event target has files

    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedFile(file);
      setSelectedFilePreview(URL.createObjectURL(file));
      console.log("Selected file:", event.target.files[0]);
    }
  };

  // URL.createObjectURL(event.target.files[0])

  const handleUpload = async () => {
    console.log(selectedFile);

    if (!selectedFile) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("profilePicture", selectedFile);
    formData.append("userId", userData?.user?.id);

    console.log("formData:", formData);

    // Check if the "profilePicture" field is present in formData
    if (!formData.has("profilePicture")) {
      alert("No file selected for profile picture");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4001/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        setSelectedFilePreview(selectedFilePreview + `?${Date.now()}`);
        // setUploadSuccess(true);
        alert("Profile picture uploaded successfully");
      }
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      alert("An error occurred while uploading the profile picture");
    }
  };

  useEffect(() => {
    if (!userData?.user) {
      setUserData(null);
      navigate("/login");
    }
  }, [userData, navigate]);

  return (
    <Container>
      <Wrap>
        <ChooseFile>
          <FileInputWrapper>
            {selectedFilePreview ? (
              <SelectedImage src={selectedFilePreview} /> // Display the selected file preview
            ) : userData?.user?.profilePicture ? (
              <SelectedImage
                src={`http://localhost:4001/uploads/${userData?.user?.profilePicture}`}
              />
            ) : (
              <PersonAddAltOutlinedIcon />
            )}
            <FileInput
              type="file"
              name="avatar"
              accept="image/*"
              onChange={handleFileSelect}
            />
          </FileInputWrapper>

          <br />
          <UploadButton onClick={handleUpload}>
            Upload Profile Picture
          </UploadButton>
        </ChooseFile>
      </Wrap>
    </Container>
  );
};

export default ProfilePictureUpload;

const Container = styled.section``;

const Wrap = styled.div``;

const ChooseFile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const FileInputWrapper = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: #f0f0f0;
  cursor: pointer;
  overflow: hidden;
  border: 5px solid rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: #f0f0f0;
    cursor: pointer;
    overflow: hidden;
  }

  svg {
    font-size: 90px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 18px;
    padding-top: 12px;

    @media (max-width: 768px) {
      font-size: 70px;
    }
  }
`;

const FileInput = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  margin: 800px;
`;

const SelectedImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const UploadButton = styled.div`
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #516cf0;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: green;
  }

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;
