import React, { useState, useEffect, useCallback } from "react";
import Story from "../Story/Story";
import useFetchStories from "../../hooks/useFetchStories";
import "./StoryList.css";

const duration = 5000;

/**
 * StoryList component
 * This component displays a list of stories and allows the user to view them individually.
 * @returns {JSX.Element} StoryList component
 */
const StoryList: React.FC = () => {
  const { stories, loading } = useFetchStories();
  const [currentStoryIndex, setCurrentStoryIndex] = useState<number | null>(
    null,
  );

  // Function to navigate to the next story
  const nextStory = useCallback(() => {
    if (currentStoryIndex !== null && currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
    } else {
      setCurrentStoryIndex(null); // Close the story viewer after the last story
    }
  }, [currentStoryIndex, stories.length]);

  // Function to navigate to the previous story
  const previousStory = useCallback(() => {
    if (currentStoryIndex !== null && currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
    } else {
      setCurrentStoryIndex(null); // Close the story viewer after the first story
    }
  }, [currentStoryIndex]);

  // Function to close the currently viewed story
  const closeStory = useCallback(() => {
    setCurrentStoryIndex(null);
  }, []);

  // Automatically advance to the next story after a set duration
  useEffect(() => {
    if (currentStoryIndex !== null) {
      const timer = setTimeout(() => {
        nextStory();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [currentStoryIndex, stories, nextStory]);

  if (loading) return <div>Loading...</div>;

  // Render the list of story thumbnails and the story viewer
  return (
    <>
      <div className="story-list-container">
        {stories.map((story, index) => (
          <img
            key={story.id}
            src={story.download_url}
            alt={`Story ${index + 1}`}
            onClick={() => setCurrentStoryIndex(index)}
            className="story-thumbnail"
          />
        ))}
        {currentStoryIndex !== null && (
          <div className="story-viewer">
            <Story
              image={stories[currentStoryIndex].download_url}
              onNext={nextStory}
              onPrevious={previousStory}
              onClose={closeStory}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default StoryList;
