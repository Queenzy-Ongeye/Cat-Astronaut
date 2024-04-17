import React from "react";
import { Layout } from "../components";
import { gql, useQuery } from "@apollo/client";
import TrackCard from "../containers/track-card";
import QueryResult from "../components/query-result";

/**
 * Tracks Page is the Catstronauts home page.
 * We display a grid of tracks fetched with useQuery with the TRACKS query
 */

const TRACKS = gql`
  # query goes here
  query GetTracks {
    tracksForHome {
      id
      title
      thumbnail
      length
      modulesCount
      author {
        id
        name
        photo
      }
    }
  }
`;
const Tracks = () => {
  const { loading, error, data } = useQuery(TRACKS);
  if (loading) {
    return <p>Loading</p>;
  }
  if (error) return `Error ${error.message}`;

  return (
    <Layout grid>
      <QueryResult error={error} loading={loading} data={data}>
        {data?.tracksForHome?.map((track) => (
          <TrackCard track={track} key={track.id} />
        ))}
      </QueryResult>
    </Layout>
  );
};

export default Tracks;
