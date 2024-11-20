import React from 'react';
import SectionTitle from '../../components/SectionTitle';
import { useSelector } from 'react-redux';

function Contact() {
  const { portfolioData } = useSelector((state) => state.root);
  const { contact } = portfolioData;

  // Create a copy of the contact object and remove the _id property
  const { _id, ...contactWithoutId } = contact;

  return (
    <div>
      <SectionTitle title="Contact" />

      <div className="flex sm:flex-col items-center justify-between">
        <div className="flex flex-col">
          <p className="text-teritiary">{'{'}</p>
          {Object.keys(contactWithoutId).map((key) => (
            <p key={key} className="ml-5">
              <span className="text-teritiary">{key}:</span>{" "}
              <span className="text-teritiary">{contactWithoutId[key]}</span>
            </p>
          ))}
          <p className="text-white">{'}'}</p>
        </div>
        <div className="h-[300px] sm:flex-col">
          <lottie-player
            src="https://lottie.host/eb922eed-2046-44c4-94f6-e76b7cb77f96/Ue8gnOJT7H.json"
            background="##fff"
            speed="1"
            autoplay
          ></lottie-player>
        </div>
      </div>
    </div>
  );
}

export default Contact;
