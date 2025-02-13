import React, { useEffect, useState } from "react";
import "./Story.css";

interface StoryProps {
  image: string;
  onNext: () => void;
  onPrevious: () => void;
  onClose: () => void;
  duration?: number;
}

/**
 * Story Component
 * @param {Object} props - Component props
 * @param {string} props.image - The image URL for the story
 * @param {Function} props.onNext - Function to call when the next button is clicked
 * @param {Function} props.onPrevious - Function to call when the previous button is clicked
 * @param {Function} props.onClose - Function to call when the close button is clicked
 * @returns {JSX.Element} Story component
 */
const Story: React.FC<StoryProps> = ({
  image,
  onNext,
  onPrevious,
  onClose,
  duration = 5000,
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);
    const interval = duration / 100;
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          onNext();
          return 100;
        }
        return prev + 1;
      });
    }, interval);

    return () => clearInterval(progressTimer);
  }, [image]);

  return (
    <div className="story-container">
      <button className="story-close" onClick={onClose}>
        X
      </button>
      <img src={image} alt="Story" className="story-image" />
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>
      <div
        className="story-nav left"
        data-testid="left-nav"
        onClick={onPrevious}
      ></div>
      <div
        className="story-nav right"
        data-testid="right-nav"
        onClick={onNext}
      ></div>
    </div>
  );
};

export default Story;
