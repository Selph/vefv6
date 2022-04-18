import Link from 'next/link';
import { fetchFromPrismic } from './api/prismic';
import { asText } from '@prismicio/helpers';
import { PrismicRichText } from '@prismicio/react';
import { Query } from './api/query';
import { Homepage, Page } from './api/types';
import styles from '../styles/Home.module.css';
import { stripVTControlCharacters } from 'util';

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
            <p className={styles.title}>{asText(item.node?.title)}</p>
            <PrismicRichText field={item.node?.intro} />
          </section>
        );
      })}
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
      <h3 className={styles.description}>Hlekkir á stöff:</h3>

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
    <section className={styles.main}>
      <HomepageContainer homepage={allHomepages ?? []} />
      <PagesContainer page={allPages ?? []} />
    </section>
  );
}

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
  const result = await fetchFromPrismic<PrismicResponse>(Query);

  const allHomepages = result.allHomepages?.edges ?? [];
  const allPages = result.allPages?.edges ?? [];

  return {
    props: { allHomepages, allPages },
  };
}
