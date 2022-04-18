import { RTNode } from '@prismicio/types';

export type Homepage = {
  _meta: {
    uid: string;
  };
  title: [] | [RTNode, ...RTNode[]] | null | undefined;
  intro: [] | [RTNode, ...RTNode[]] | null | undefined;
};

export type Page = {
  _meta: {
    uid: string;
  };
  title: [] | [RTNode, ...RTNode[]] | null | undefined;
  date: string;
  content: [] | [RTNode, ...RTNode[]] | null | undefined;
  image: {
    src: string;
    url: string;
    dimensions: {
      height: number;
      width: number;
    };
    copyright: string;
    alt: string;
  };
  body: Slices;
};

export type Slices = Array<Slice>;

export type Slice = {
  type: string;
  primary: {
    accordion_title?: [] | [RTNode, ...RTNode[]] | null | undefined;
    content?: [] | [RTNode, ...RTNode[]] | null | undefined;
    image?: {
      src: string;
      url: string;
      dimensions: {
        height: number;
        width: number;
      };
      copyright: string;
      alt: string;
    };
    embed?: {
      height: number;
      width: number;
      embed_url: string;
      type: string;
      version: string;
      title: string;
      author_name: string;
      author_url: string;
      provider_name: string;
      provider_url: string;
      cache_age: number;
      thumbnail_url: string;
      thumbnail_width: number;
      thumbnail_height: number;
      html: string;
    };
  };
  fields: Array<{
    sub_title: [] | [RTNode, ...RTNode[]] | null | undefined;
    sub_content: [] | [RTNode, ...RTNode[]] | null | undefined;
  }>;
};
