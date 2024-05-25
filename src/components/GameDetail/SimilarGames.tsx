import { Link } from "react-router-dom";
import { Similar } from "../Games/GameDetail";

interface Props {
  name: string;
  similarGame: Similar[];
}

const SimilarGames = ({ name, similarGame }: Props) => {
  return (
    <div>
      <p className="text-lg my-10 font-poppins text-gray-400 lg:px-0 px-3">
        Games like <span className="text-teal-400 font-poppins">{name}</span>
      </p>

      <div className="grid lg:grid-cols-5 grid-cols-3 gap-4 lg:px-0 px-3">
        {similarGame.map((similar) => (
          <Link
            to={`/${similar.id}`}
            key={similar.id}
            className="hover:-translate-y-2 duration-500"
          >
            <img
              src={similar.background_image}
              alt="Similar Games"
              className="aspect-square object-cover rounded"
            />
            <p className="font-poppins text-nowrap overflow-hidden text-xs mt-2 text-gray-400">
              {similar.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SimilarGames;
