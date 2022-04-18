import styles from '../styles/Page.module.css';
import { Slice } from '../pages/api/types';
import { asText } from '@prismicio/helpers';
import { PrismicRichText } from '@prismicio/react';

export default function AccordionSlice({ data }: { data: Slice }) {
  return (
    <details className={styles.accordion}>
      <summary className={styles.accordionTitle}>
        {asText(data.primary.accordion_title)}
      </summary>
      {data.fields.map((innards, j) => {
        return (
          <details key={j} className={styles.inner_accordion}>
            <summary>
              <PrismicRichText field={innards.sub_title} />
            </summary>
            <PrismicRichText field={innards.sub_content} />
          </details>
        );
      })}
    </details>
  );
}
