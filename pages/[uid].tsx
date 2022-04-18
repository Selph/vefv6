import Link from 'next/link';
import styles from '../styles/Page.module.css';
import { fetchFromPrismic } from './api/prismic';
import { asText } from '@prismicio/helpers';
import { PrismicRichText, PrismicImage } from '@prismicio/react';
import { Params } from 'next/dist/server/router';
import { Query } from './api/query';
import { Page, Slice } from './api/types';
import AccordionSlice from '../slices/AccordionSlice';
import ImageSlice from '../slices/ImageSlice';
import TextSlice from '../slices/TextSlice';
import EmbedSlice from '../slices/EmbedSlice';
import Head from 'next/head';

type Props = {
  page: Page | undefined;
};

function Slices({ data }: { data: Array<Slice> }) {
  return (
    <div>
      {data.map((parent, i) => {
        if (parent.type === 'accordion') {
          return <AccordionSlice data={parent} key={i} />;
        } else if (parent.type === 'image') {
          return <ImageSlice data={parent} key={i} />;
        } else if (parent.type === 'content') {
          return <TextSlice data={parent} key={i} />;
        } else if (parent.type === 'embed') {
          return <EmbedSlice data={parent} key={i} />;
        }
      })}
    </div>
  );
}

export default function Home({ page }: Props) {
  return (
    <>
      <Head>
        <title>{asText(page?.title)}</title>
      </Head>
      <div className={styles.main}>
        <PrismicRichText field={page?.title} />
        <div className={styles.pageContent}>
          {page?.body ? <Slices data={page.body} /> : null}
        </div>
      </div>
      <Link href={'/'}>Til baka á forsíðu</Link>
    </>
  );
}

type PrismicResponse = {
  page?: Page;
  allPages?: {
    edges?: Array<{
      node: Page;
    }>;
  };
};

export async function getServerSideProps({ params }: Params) {
  const { uid } = params;
  const result = await fetchFromPrismic<PrismicResponse>(Query, { uid });

  const page = result.page ?? null;

  console.log(page);

  if (!page) {
    return {
      notFound: true,
      props: {},
    };
  }

  return {
    props: { page },
  };
}
