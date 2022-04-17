import type { NextPage, GetServerSideProps } from 'next';
import Link from 'next/link';
import { fetchFromPrismic } from '../api/prismic';
import { asText, asImageSrc } from '@prismicio/helpers';
import { PrismicRichText, PrismicImage } from '@prismicio/react'

type Page = {
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
};

type Props = {
  page: Page | undefined;
};

export default function Home({ page }: Props) {
  return (
    <section>
      <h1>{asText(page?.title)}</h1>
      <div>
          <p>{page?.date}</p>
          <PrismicRichText field={page?.content} />
          <PrismicImage field={page?.image} />
          <p>{page?.image.alt}</p>
      </div>
      <Link href='/'>Til baka</Link>
    </section>
  );
}

const query = `
fragment page on Page {
    _meta {
      uid
    }
    title
    content
    date
    image
  }
  
  query ($uid: String = "") {
    page(uid: $uid, lang: "is") {
      ...page
    }
    allPages(sortBy: date_DESC, first: 20) {
      totalCount
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        cursor
        node {
          _meta {
            uid
          }
        }
      }
    }
  }
`;

type PrismicResponse = {
  page?: Page;
  allPages?: {
    edges?: Array<{
      node: Page;
    }>;
  };
};

export async function getServerSideProps({ params }) {
  const { uid } = params;
  const result = await fetchFromPrismic<PrismicResponse>(query, { uid });

  const page = result.page ?? null;

  if (!page) {
      return {
          notFound: true,
          props: {}
      }
  }

  return {
    props: { page },
  };
}
