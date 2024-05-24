import { useEffect } from "react";
import apiClient from "../services/apiClient";
import { useGameStore } from "../store/useGamesStore";
import { useGameCountStore } from "../store/useGameCountStore";
import { useSelectedGenreStore } from "../store/useSelectedGenre";

export interface Platform {
  id: number;
  name: string;
  slug: string;
}

export interface Game {
  id: number;
  name: string;
  background_image: string;
  released: string;
  rating: number;
  playtime: number;
  parent_platforms: { platform: Platform }[];
}

export interface FetchGamesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Game[];
}

const useGames = () => {
  const { updateGame, updateLoading, updateNext, updatePrevious } =
    useGameStore();
  const { updateCount } = useGameCountStore();
  const { setSelectedGenre } = useSelectedGenreStore();

  // Get Games
  useEffect(() => {
    const fetchData = async () => {
      updateLoading(true);
      try {
        const response = await apiClient.get<FetchGamesResponse>("/games");
        updateGame(response.data.results);
        updateCount(response.data.count);
        updateNext(response.data.next);
        updatePrevious(response.data.previous);
      } catch (error) {
        updateLoading(true);
        console.error(error);
      } finally {
        updateLoading(false);
      }
    };

    fetchData();
  }, []);

  // Games selected by Genres
  const handleGenreSelect = async (id: number) => {
    updateLoading(true);
    setSelectedGenre(id);
    try {
      const response = await apiClient.get<FetchGamesResponse>(
        `/games?genres=${id}`
      );
      updateGame(response.data.results);
      updateCount(response.data.count);
      updateNext(response.data.next);
      updatePrevious(response.data.previous);
    } catch (error) {
      updateLoading(true);
      console.error(error);
    } finally {
      updateLoading(false);
    }
  };

  // Games selected by Platforms
  const handlePlatformSelect = async (id: number) => {
    updateLoading(true);
    try {
      const response = await apiClient.get<FetchGamesResponse>(
        `/games?platforms=${id}`
      );
      updateGame(response.data.results);
      updateCount(response.data.count);
      updateNext(response.data.next);
      updatePrevious(response.data.previous);
    } catch (error) {
      updateLoading(true);
      console.error(error);
    } finally {
      updateLoading(false);
    }
  };

  // Games selected by Orders
  const handleOrder = async (value: string) => {
    updateLoading(true);
    try {
      const response = await apiClient.get<FetchGamesResponse>(
        `/games?ordering=${value}`
      );
      updateGame(response.data.results);
      updateCount(response.data.count);
      updateNext(response.data.next);
      updatePrevious(response.data.previous);
    } catch (error) {
      updateLoading(true);
      console.error(error);
    } finally {
      updateLoading(false);
    }
  };

  // Games Search
  const handleSearch = async (keyword: string) => {
    updateLoading(true);
    try {
      const response = await apiClient.get<FetchGamesResponse>(
        `/games?search=${keyword}`
      );
      updateGame(response.data.results);
      updateCount(response.data.count);
      updateNext(response.data.next);
      updatePrevious(response.data.previous);
    } catch (error) {
      updateLoading(true);
      console.error(error);
    } finally {
      updateLoading(false);
    }
  };

  // Next Games Page
  const handleNextPageGames = async (url: string | null) => {
    if (url) {
      updateLoading(true);
      try {
        const response = await apiClient.get<FetchGamesResponse>(url);
        updateGame(response.data.results);
        updateNext(response.data.next);
        updatePrevious(response.data.previous);
      } catch (error) {
        updateLoading(true);
        console.error(error);
      } finally {
        updateLoading(false);
      }
    }
  };

  // Previous Games Page
  const handlePreviousPageGames = async (url: string | null) => {
    if (url) {
      updateLoading(true);
      try {
        const response = await apiClient.get<FetchGamesResponse>(url);

        updateGame(response.data.results);
        updateNext(response.data.next);
        updatePrevious(response.data.previous);
      } catch (error) {
        updateLoading(true);
        console.error(error);
      } finally {
        updateLoading(false);
      }
    }
  };

  return {
    handleGenreSelect,
    handlePlatformSelect,
    handleOrder,
    handleSearch,
    handleNextPageGames,
    handlePreviousPageGames,
  };
};

export default useGames;
