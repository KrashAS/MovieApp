import React from "react";
import { useParams } from "react-router-dom";
import axios, { AxiosError } from "axios";
import styles from "./FullPost.module.scss";
import { Movie } from "../Home";
import { Skeleton } from "@mui/material";

export const FullMovie = () => {
  const [data, setData] = React.useState<Movie | null>();
  const { id } = useParams();
  const youtubeId = data?.youtube_url.split("watch?v=")[1];

  React.useEffect(() => {
    axios
      .get(`https://61db06d64593510017aff7a8.mockapi.io/movies/${id}`)
      .then(({ data }) => {
        setData(data);
      })
      .catch((err: AxiosError) => {
        setData(null);
        console.warn("FullMovie", err);
      });
  }, [id]);
  
  return (
    <div className={styles.root}>
      <div className={styles.topBlock}>
        <div className={styles.poster}>
          {!data ? (
            <>
              <Skeleton width={230} height={300} variant="rectangular" />
            </>
          ) : (
            <img src={data.imageUrl} alt="test" />
          )}
        </div>
        <div className={styles.details}>
          <h2 className={styles.title}>
            {data?.title || <Skeleton width={350} variant="text" />}
          </h2>
          <div className={styles.tags}>
            {!data ? (
              <>
                <Skeleton width={30} height={50} variant="text" />
                <Skeleton width={30} height={50} variant="text" />
                <Skeleton width={30} height={50} variant="text" />
              </>
            ) : (
              data.tags.map((tag) => <span key={tag}>{tag}</span>)
            )}
          </div>
          <p className={styles.description}>
            {!data?.description ? (
              <>
                <Skeleton width={600} height={20} variant="text" />
                <Skeleton width={560} height={20} variant="text" />
                <Skeleton width={590} height={20} variant="text" />
                <Skeleton width={190} height={20} variant="text" />
              </>
            ) : (
              data.description
            )}
          </p>
        </div>
      </div>
      <div className={styles.actors}>
        <h3>Actors</h3>
        <div className={styles.actorsList}>
          {!data ? (
            <div className={styles.actor}>
              <Skeleton
                animation="wave"
                width={138}
                height={175}
                style={{ marginBottom: 10 }}
                variant="rectangular"
              />
              <Skeleton animation="wave" variant="text" width={100} />
            </div>
          ) : (
            data.actors.map((obj) => (
              <div key={obj.name} className={styles.actor}>
                {!data ? (
                  <>
                    <Skeleton
                      animation="wave"
                      width={138}
                      height={175}
                      style={{ marginBottom: 10 }}
                      variant="rectangular"
                    />
                    <Skeleton animation="wave" variant="text" width={100} />
                  </>
                ) : (
                  <div>
                    <img src={obj.imageUrl} alt="Актер" />
                    <h4>{obj.name}</h4>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
      <div className="trailer">
        <h3>Trailer</h3>
        {!data ? (
          <Skeleton
            width={900}
            height={450}
            className={styles.iframeSkeleton}
          />
        ) : (
          <iframe
            width="900"
            height="450"
            src={`https://www.youtube.com/embed/${youtubeId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
    </div>
  );
};
