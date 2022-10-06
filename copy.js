const EPISODE_PREVIEW_FRAGMENT = `
  fragment EpisodePreview on Episode {
      id
      date: publishedAt
      title
      image {
        url
      }
  }
`

const EPISODES_PAGE_QUERY = `
    query {
    first: episodes(first: 1) {
      id
      title
      image {
        url
      }
      audio: audioFile {
        url
        mime: mimeType
      }
    }

    previous: episodes(skip: 1) {
      ...EpisodePreview,
    }
  }
  
  ${EPISODE_PREVIEW_FRAGMENT}
`;

const SINGLE_EPISODE_PAGE_QUERY = `
  query($id: ID) {
    episode(where: { id: $id }) {
      number: episodeNumber
      date: publishedAt
      title
      description
      notes: showNotes
      audio: audioFile {
        url
        mime: mimeType
      }
      image {
        url
      }
      guests {
        fullName
        photo {
          url
        }
      }
      tags {
        name
      }
      sponsors {
        company {
          name
          website
        }
      }
    }
  }
`;

const SINGLE_EPISODE_NEIGHBORS_QUERY = `
  query($previous: Int, $next: Int) {
    previous: episode(where: { episodeNumber: $previous }) { id }
    next: episode(where: { episodeNumber: $next }) { id }
  }
`;

const GUESTS_PAGE_QUERY = `
  query {
   peoples {
    fullName
    photo {
      url
    }
    episodes: appearedOn {
      ...EpisodePreview
    }
  }
 }
 
 ${EPISODE_PREVIEW_FRAGMENT}
`;

const TOPICS_PAGE_QUERY = `
  query {
    tags {
      name
      episodes {
        ...EpisodePreview
      }
    }
  }
  
  ${EPISODE_PREVIEW_FRAGMENT}
`;

const RESOURCES_PAGE_QUERY = `
  query {
     assets {
      fileName
      mimeType
      url
    }
  }
  
  ${EPISODE_PREVIEW_FRAGMENT}
`;

const SPONSORS_PAGE_QUERY = `
  query {
    sponsorships {
      company {
        name
      }
      episodes {
        ...EpisodePreview
      }
    }
  }
  
  ${EPISODE_PREVIEW_FRAGMENT}
`;

const gqlQuery = async (query, variables) => {
  const response = await fetch(
    "https://api-ap-southeast-2.hygraph.com/v2/cl8vi8w4f6mae01uq4t021qbq/master",
    {
      method: "POST",
      body: JSON.stringify({ query, variables })
    }
  );

  if (!response || !response.ok) {
    throw new Error("Query failed");
  }

  const { data } = await response.json()
  return data;
};

const getData = async () => {
  const episodes = await gqlQuery(EPISODES_PAGE_QUERY);
  const guests = await gqlQuery(GUESTS_PAGE_QUERY);
  const topics = await gqlQuery(TOPICS_PAGE_QUERY)
  const sponsors = await gqlQuery(SPONSORS_PAGE_QUERY)
  
  const [{ id }] = episodes.first;
  const singleEpisode = await gqlQuery(SINGLE_EPISODE_PAGE_QUERY, { id });

  const { number } = singleEpisode.episode;

  const singleEpisodeNeighbhors = await gqlQuery(
    SINGLE_EPISODE_NEIGHBORS_QUERY,
    { previous: number + 1, next: number - 1 }
  )

  console.log({
    episodes,
    guests,
    topics,
    sponsors,
    singleEpisode,
    singleEpisodeNeighbhors,
  });
};

getData();
