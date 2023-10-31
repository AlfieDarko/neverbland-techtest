import axios, { AxiosResponse } from "axios";

export interface IShowInfo {
  score: number;
  show: {
    id: number;
    url: string;
    name: string;
    type: string;
    language: string;
    genres: string[];
    status: string;
    runtime: number | null;
    averageRuntime: number;
    premiered: string;
    ended: string;
    officialSite: string | null;
    schedule: {
      time: string;
      days: string[];
    };
    rating: {
      average: number | null;
    };
    weight: number;
    network: {
      id: number;
      name: string;
      country: {
        name: string;
        code: string;
        timezone: string;
      };
      officialSite: string | null;
    } | null;
    webChannel: any | null;
    dvdCountry: any | null;
    externals: {
      tvrage: number | null;
      thetvdb: number;
      imdb: string;
    };
    image: {
      medium: string;
      original: string;
    };
    summary: string;
    updated: number;
    _links: {
      self: {
        href: string;
      };
      previousepisode: {
        href: string;
      };
    };
  };
}

export interface IShowBackgroundImage {
  id: number;
  type: string;
  main: boolean;
  resolutions: {
    original: {
      url: string;
      width: number;
      height: number;
    };
    medium?: {
      url: string;
      width: number;
      height: number;
    };
  };
}

export interface ICastMember {
  person: {
    id: number;
    url?: string;
    name: string;
    country?: {
      name?: string;
      code?: string;
      timezone?: string;
    };
    birthday?: string;
    deathday?: string | null;
    gender?: string;
    image?: {
      medium?: string;
      original?: string;
    };
    updated?: number;
    _links?: {
      self?: {
        href?: string;
      };
    };
  };
  character: {
    id: number;
    url?: string;
    name: string;
    image?: {
      medium?: string;
      original?: string;
    } | null;
    _links?: {
      self?: {
        href?: string;
      };
    };
  };
  self?: boolean;
  voice?: boolean;
}
