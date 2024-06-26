import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { useEffect, useState } from "react";
import apiClient from "../../services/apiClient";
import Description from "../GameDetail/Description";
import SystemRequirements from "../GameDetail/SystemRequirements";
import { Screenshot } from "../GameDetail/Screenshot";
import GameIntro from "../GameDetail/GameIntro";
import Tags from "../GameDetail/Tags";
import Stores from "../GameDetail/Stores";
import Developer from "../GameDetail/Developer";
import SimilarGames from "../GameDetail/SimilarGames";
import Loading from "../GameDetail/Loading";
import Footer from "../Footer/Footer";

import {
  GameDetails,
  ScreenshotResponse,
  Screenshots,
  Similar,
  SimilarGamesFetch,
} from "../../services/gameDetail";

const GameDetail = () => {
  const { id } = useParams();

  console.log(id);

  const [gameDetail, setGameDetail] = useState<GameDetails>();
  const [screenshot, setScreenshot] = useState<Screenshots[]>([]);
  const [similarGames, setSimilarGames] = useState<Similar[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient
      .get<GameDetails>(`/games/${id}`)
      .then((res) => {
        setGameDetail(res.data);
        setLoading(false);
        document.title = res.data.name;
      })
      .catch(() => (window.location.href = "/404"));
    apiClient
      .get<ScreenshotResponse>(`/games/${id}/screenshots`)
      .then((res) => {
        setScreenshot(res.data.results);
        setLoading(false);
      });
    apiClient.get<SimilarGamesFetch>(`/games/${id}/game-series`).then((res) => {
      setSimilarGames(res.data.results);
      setLoading(false);
    });
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Navbar />
          {gameDetail && (
            <div>
              <GameIntro gameDetail={gameDetail} />

              <div className="container mx-auto text-white mt-5">
                <div className="lg:grid lg:grid-cols-3 justify-between lg:gap-10">
                  {/* Description  and Stores*/}
                  <div className="lg:col-span-2 lg:px-0 px-3">
                    <Description description={gameDetail.description} />
                  </div>
                  <div className="mt-10 bg-zinc-900 rounded p-4">
                    <Stores store={gameDetail} />
                  </div>
                </div>

                {/* Screenshot */}
                {screenshot && <Screenshot screenshots={screenshot} />}

                {/* Developers */}
                <div className="lg:grid lg:grid-cols-2 lg:px-0 px-3">
                  <Developer devs={gameDetail.developers} />
                  <Tags tag={gameDetail.tags} />
                </div>

                {/* System Requirements */}
                {gameDetail.platforms.length > 0 &&
                  Object.keys(gameDetail.platforms[0].requirements).length !=
                    0 && (
                    <SystemRequirements
                      minimum={gameDetail.platforms[0].requirements.minimum}
                      recommended={
                        gameDetail.platforms[0].requirements.recommended
                      }
                    />
                  )}

                {/* Similar Games */}
                <SimilarGames
                  name={gameDetail.name}
                  similarGame={similarGames}
                />
              </div>
              {/* Footer */}
              <Footer />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default GameDetail;
