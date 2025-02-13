# Instagram Stories Clone

This project is a simplified version of the Instagram Stories feature built using TypeScript and React.js. It allows users to view a series of "stories" – short, temporary posts that display for a set duration.

## Features

- View a list of stories in a horizontally scrollable list.
- Automatically advance to the next story after a set duration (5 seconds).
- Manually navigate between stories using UI controls (left and right tap areas).
- Close the story viewer manually.
- Progress bar indicator showing the remaining time for each story before it advances.
- Smooth transitions and animations for story interactions.

## Setup and Running Instructions

### Prerequisites

- Node.js 
- npm or yarn

### Running

1. Clone the repository:
   ```bash
   git clone https://github.com/Shrayanshi/Instagram-Stories-Feature.git
   cd Instagram-Stories-Feature

2. Install dependencies:
   ```bash
   npm install

4. Start the development server:
   ```bash
   npm run dev

6. Run the test suite:
   ```bash
   npm test

## Design Choices
- Lazy Loading of Stories: The stories are fetched from an API, and the application only fetches a limited number of stories initially. This reduces the initial load time and improves performance.
- Use of React Hooks: State and effect management using useState, useEffect, and useCallback hooks ensures that the component logic is concise and efficient.
- Synchronized Progress Bar: The progress bar is linked with the story duration to visually indicate the remaining time before moving to the next story.
- Debounced Navigation: The automatic advancement to the next story is handled using setTimeout within an useEffect hook, ensuring smooth transitions.
- Optimized Rendering: Only the currently viewed story is rendered in full view, reducing the amount of DOM nodes and improving rendering performance.

## Assumptions

- API Endpoint: The stories are fetched from https://picsum.photos/v2/list?page=${random}&limit=10, which returns a random list of images.
- Story Duration: Each story is displayed for a fixed duration of 5 seconds. This duration is hardcoded for simplicity.
- Single Device Orientation: The application is optimized for mobile devices in portrait mode only.
