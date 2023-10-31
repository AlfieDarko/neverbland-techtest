import { IShowInfo } from "../../types";

export const mockShowInfo: IShowInfo = {
  score: 8.5,
  show: {
    id: 12345,
    url: "https://example.com/show/12345",
    name: "Sample Show Name",
    type: "Scripted",
    language: "English",
    genres: ["Drama", "Action"],
    status: "Running",
    averageRuntime: 42,
    premiered: "2020-01-01",
    ended: "2020-12-31",
    schedule: {
      time: "20:00",
      days: ["Monday", "Wednesday"],
    },
    rating: {
      average: 9.2,
    },
    weight: 85,
    externals: {
      thetvdb: 54321,
      imdb: "tt0123456",
    },
    image: {
      medium: "https://example.com/images/medium/12345.jpg",
      original: "https://example.com/images/original/12345.jpg",
    },
    summary: "This is a brief summary of the show.",
    updated: 1629837283,
    _links: {
      self: {
        href: "https://example.com/show/12345/self",
      },
      previousepisode: {
        href: "https://example.com/show/12345/previousepisode",
      },
    },
  },
};
