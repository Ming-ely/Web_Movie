import { img } from "@/api/tmdb";

const ComingSoonRow = ({ movies, onClick }) => {
  return (
    <div className="space-y-6">
      {movies?.slice(0, 8).map((movie) => (
        <div
          key={movie.id}
          className="flex gap-4 cursor-pointer hover:bg-white/5 p-3 rounded-lg transition"
          onClick={() => onClick(movie)}
        >
          <img
            src={img.poster(movie.poster_path)}
            className="w-32 rounded"
          />

          <div>
            <h3 className="text-lg font-semibold">
              {movie.title}
            </h3>

            <p className="text-sm text-gray-400">
              Coming on: {movie.release_date}
            </p>

            <p className="text-sm text-gray-300 line-clamp-3 mt-2">
              {movie.overview}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ComingSoonRow;