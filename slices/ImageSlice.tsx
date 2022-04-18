/* eslint-disable @next/next/no-img-element */
import styles from '../styles/Page.module.css';
import { Slice } from '../pages/api/types';

export default function ImageSlice({ data }: { data: Slice }) {
  return (
    <div className={styles.imageContainer}>
      <div>
        <img
          src={data.primary.image?.url ?? ''}
          alt={data.primary.image?.alt ?? ''}
        />
      </div>
      <p className={styles.caption}>{data.primary.image?.alt}</p>
    </div>
  );
}
