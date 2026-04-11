import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import tmdb from "@/api/tmdb";
import { useNewPopularRows } from "@/hooks/useNewPopular";

import Banner from "@/components/movie/Banner";
import BannerAmbient from "@/components/movie/BannerAmbient";
import MovieRow from "@/components/movie/MovieRow";
import MovieModal from "@/components/movie/MovieModal";
import SkeletonBanner from "@/components/ui/SkeletonBanner";
import Top10Row from "@/components/movie/Top10Row";
import ComingSoonRow from "@/components/movie/ComingSoonRow";

const NewPopular = () => {
  const { rows } = useNewPopularRows();
  const [selected, setSelected] = useState(null);

  const { data: trending, isLoading } = useQuery({
    queryKey: ["new", "banner"],
    queryFn: () =>
      tmdb.get("/trending/all/week").then(res => res.data.results),
  });

  const featured = useMemo(() => {
    if (!trending?.length) return null;
    return trending[Math.floor(Math.random() * trending.length)];
  }, [trending]);

  return (
    <div className="relative bg-black text-white">

      <BannerAmbient movie={featured} isTrailerPlaying={false} />

      <div className="relative z-10">
        {isLoading ? (
          <SkeletonBanner />
        ) : (
          <Banner movie={featured} onMoreInfo={setSelected} />
        )}

        <div className="mt-[-100px] space-y-10 px-4 md:px-12">
          {rows.map((row) => (
            <div key={row.title}>
              <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
  {row.type === "top10" && <span>🏆</span>}
  {row.type === "coming" && <span>⏳</span>}
  {!row.type && <span>🔥</span>}
  {row.title}
</h2>

              {/* Top 10 */}
              {row.type === "top10" ? (
                <Top10Row movies={row.data} onClick={setSelected} />
              ) : row.type === "coming" ? (
                <ComingSoonRow movies={row.data} onClick={setSelected} />
              ) : (
            <MovieRow
     movies={row.data}   // 
      isLoading={row.isLoading}
      isLargeRow={row.isLargeRow}
      onMovieClick={setSelected}
    />
              )}
            </div>
          ))}
        </div>
      </div>

      {selected && (
        <MovieModal
          movie={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
};

export default NewPopular;