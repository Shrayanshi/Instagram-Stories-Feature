import { useState, useEffect } from "react";
import axios from "axios";

// Define the shape of a story object
interface Story {
  id: "0";
  download_url: "";
}

// Custom hook to fetch stories from an API
const useFetchStories = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Effect to fetch stories when the component mounts
  useEffect(() => {
    const fetchStories = async () => {
      try {
        const randomPage = Math.floor(Math.random() * 100) + 1;
        const response = await axios.get<Story[]>(
          `https://picsum.photos/v2/list?page=${randomPage}&limit=10`,
        );
        setStories(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching stories", error);
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  return { stories, loading };
};

export default useFetchStories;
