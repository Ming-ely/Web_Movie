import { useState, useMemo } from 'react';
import { useTVRows, useTVTrending } from '@/hooks/useTV'; // 🔥 hook mới
import Banner from '@/components/movie/Banner';
import BannerAmbient from '@/components/movie/BannerAmbient';
import MovieRow from '@/components/movie/MovieRow';
import MovieModal from '@/components/movie/MovieModal';
import SkeletonBanner from '@/components/ui/SkeletonBanner';

const TVShows = () => {
  const { data: trending, isLoading: trendingLoading } = useTVTrending();
  const { rows } = useTVRows();

  const [selectedTV, setSelectedTV] = useState(null);

  const featuredTV = useMemo(() => {
    if (!trending?.length) return null;
    return trending[Math.floor(Math.random() * trending.length)];
  }, [trending]);

  return (
    <div className="relative bg-black text-white">
      {/* 🌌 Background giống Home */}
      <BannerAmbient movie={featuredTV} isTrailerPlaying={false} />

      <div className="relative z-10">
        {/* 🎬 Banner */}
        {trendingLoading ? (
          <SkeletonBanner />
        ) : (
          <Banner
            movie={featuredTV}
            onMoreInfo={(tv) => setSelectedTV(tv)}
          />
        )}

        {/* 📺 Rows */}
        <div className="mt-[-100px] space-y-8 px-4 md:px-12">
          {rows.map((row) => (
            <MovieRow
              key={row.title}
              title={row.title}
              movies={row.data}
              isLoading={row.isLoading}
              isLargeRow={row.isLargeRow}
              onMovieClick={(tv) => setSelectedTV(tv)}
            />
          ))}
        </div>
      </div>

      {/* 🎥 Modal */}
      {selectedTV && (
        <MovieModal
          movie={selectedTV}
          onClose={() => setSelectedTV(null)}
        />
      )}
    </div>
  );
};

export default TVShows;