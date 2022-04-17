import Link from 'next/link';
import { fetchFromPrismic } from '../api/prismic';
import { asText } from '@prismicio/helpers';
import { PrismicRichText } from '@prismicio/react'

type Homepage = {
  _meta: {
    uid: string;
  };
  title: [] | [RTNode, ...RTNode[]] | null | undefined;
  intro: [] | [RTNode, ...RTNode[]] | null | undefined;
};

type Page = {
  _meta: {
    uid: string;
  };
  title: [] | [RTNode, ...RTNode[]] | null | undefined;
  date: string;
  image: string;
  content: [] | [RTNode, ...RTNode[]] | null | undefined;
};

type Props = {
  allPages: Array<{
    node?: Page | undefined;
  }>;
  allHomepages: Array<{
    node?: Homepage | undefined;
  }>;
};

function HomepageContainer({
  homepage,
}: {
  homepage: Array<{
    node?: Homepage | undefined;
  }>;
}) {
  return (
    <ul>
      {homepage.map((item, i) => {
        return (
          <section key={i}>
            <PrismicRichText field={item.node?.title} />
            <PrismicRichText field={item.node?.intro} />
          </section>
        );
      })}
      <br></br>
      <div>
        <h3>Hlekkir á stöff:</h3>
      </div>
    </ul>
  );
}

function PagesContainer({
  page,
}: {
  page: Array<{
    node?: Page | undefined;
  }>;
}) {
  return (
    <ul>
      {page.map((item, i) => {
        const title = asText(item.node?.title);
        return (
          <li key={i}>
            <Link href={`/${item.node?._meta.uid}`}>{title}</Link>
          </li>
        );
      })}
    </ul>
  );
}

export default function Home({ allPages, allHomepages }: Props) {
  return (
    <section>
      <HomepageContainer homepage={allHomepages ?? []} />
      <PagesContainer page={allPages ?? []} />
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
        title
      }
    }
  }
  allHomepages {
    edges {
      node {
        title
        intro
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
  allHomepages?: {
    edges?: Array<{
      node: Homepage;
    }>;
  };
};

export async function getServerSideProps() {
  const result = await fetchFromPrismic<PrismicResponse>(query);

  const allHomepages = result.allHomepages?.edges ?? [];
  const allPages = result.allPages?.edges ?? [];

  return {
    props: { allHomepages, allPages },
  };
}
