import React from "react";
import GlobalStyles from "./styles/GlobalStyles";
import StoryList from "./components/StoryList/StoryList";

/**
 * It includes global styles and the StoryList component.
 * @returns {JSX.Element} The rendered App component
 */
const App: React.FC = () => (
  <>
    <GlobalStyles />
    <StoryList />
  </>
);

export default App;
