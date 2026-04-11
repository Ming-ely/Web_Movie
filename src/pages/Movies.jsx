import { useState, useMemo } from 'react';
import { useMovieRows } from '@/hooks/useMovies';
import { useQuery } from '@tanstack/react-query';
import Banner from '@/components/movie/Banner';
import BannerAmbient from '@/components/movie/BannerAmbient';
import MovieRow from '@/components/movie/MovieRow';
import MovieModal from '@/components/movie/MovieModal';
import SkeletonBanner from '@/components/ui/SkeletonBanner';

const API_KEY = "966741e6a93b974626716efc718d939e";

const Movies = () => {
  const { rows } = useMovieRows();
  const [selectedMovie, setSelectedMovie] = useState(null);

  // 🔥 riêng trending cho banner
  const { data: trending, isLoading } = useQuery({
    queryKey: ['movies', 'trending-banner'],
    queryFn: () =>
      fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`)
        .then(res => res.json())
        .then(res => res.results),
  });

  const featuredMovie = useMemo(() => {
    if (!trending?.length) return null;
    return trending[Math.floor(Math.random() * trending.length)];
  }, [trending]);

  return (
    <div className="relative bg-black text-white">
      <BannerAmbient movie={featuredMovie} isTrailerPlaying={false} />

      <div className="relative z-10">
        {isLoading ? (
          <SkeletonBanner />
        ) : (
          <Banner
            movie={featuredMovie}
            onMoreInfo={(movie) => setSelectedMovie(movie)}
          />
        )}

        <div className="mt-[-100px] space-y-8 px-4 md:px-12">
          {rows.map((row) => (
            <MovieRow
              key={row.title}
              title={row.title}
              movies={row.data}
              isLoading={row.isLoading}
              isLargeRow={row.isLargeRow}
              onMovieClick={(movie) => setSelectedMovie(movie)}
            />
          ))}
        </div>
      </div>

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
};

export default Movies