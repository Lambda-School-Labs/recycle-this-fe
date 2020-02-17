import React, { useState } from "react";
import { withTheme } from "styled-components";
import Stepper from "../molecules/Stepper";
import styled from "styled-components";
import Button from "../atoms/Button";

import photoImg from "../images/photo_illustration.svg";
import locationImg from "../images/location_illustration.svg";

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.body};
`;

const Title = styled.h2`
  font-family: Muli;
  font-style: normal;
  font-weight: bold;
  text-align: center;
  font-size: 28px;
  color: ${({ theme }) => theme.text};

  margin-top: 20px;
  margin-bottom: 25px;
`;

const SubTitle = styled.h3`
  font-family: Muli;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 25px;
  text-align: center;

  color: ${({ theme }) => theme.text};
  margin-top: 30px;
  margin-bottom: 11px;
  margin-left: 30px;
  margin-right: 30px;
`;

const Img = styled.img`
  margin-bottom: ${props => props.marginBottom}px;
`;

const PText = styled.p`
  font-family: Muli;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 25px;
  text-align: center;

  color: ${({ theme }) => theme.text};

  margin-left: 60px;
  margin-right: 60px;
  margin-top: 0px;
  margin-bottom: ${props => props.marginBottom}px;
`;

const CenterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function renderPage(step, theme) {
  switch (step) {
    case 1:
      return (
        <CenterContainer>
          <Title>Trash Panda</Title>
          <PText marginBottom="60">
            Here to help you create better recycling habits.
          </PText>
          <Img marginBottom="38" src={theme.trashManImg} />
        </CenterContainer>
      );
    case 2:
      return (
        <CenterContainer>
          <SubTitle>Certain areas have different regulations.</SubTitle>
          <PText>
            Let us use your location to help you properly dispose of the item.
          </PText>
          <Img marginBottom="38" src={locationImg} />
        </CenterContainer>
      );
    case 3:
      return (
        <CenterContainer>
          <SubTitle>Snap a photo of the item you want to recycle.</SubTitle>
          <PText marginBottom="49">
            We’ll tell you what it’s made of and how to properly dispose of it.
          </PText>
          <Img marginBottom="60" src={photoImg} />
        </CenterContainer>
      );
  }
}

const TutorialPage = ({ getLocation, handleLocation, getCamera, theme }) => {
  const [step, setStep] = useState(1);

  console.log("Theme: ", theme);
  const handleNext = () => {
    switch (step) {
      case 3:
        //Ask for camera permission
        getCamera();
        break;
      case 2:
        //Ask for location permission
        getLocation(
          handleLocation,
          () => {
            setStep(3);
          },
          err => {
            if (err.message === "User denied Geolocation") {
              setStep(3);
            } else {
              console.log("Unable to retrieve position, error: ", err);
              alert("Error: ", err.message);
              setStep(3);
            }
          }
        );
        break;
      default:
        setStep(step + 1);
    }
  };

  return (
    <Container>
      {renderPage(step, theme)}
      <Stepper amount={3} currentStep={step} />
      <Button marginTop="75" marginBottom="70" onClick={handleNext}>
        Next
      </Button>
    </Container>
  );
};

export default withTheme(TutorialPage);
