import { Slice } from '../pages/api/types';
import styles from '../styles/Page.module.css';

export default function EmbedSlice({ data }: { data: Slice }) {
  return (
    <div className={styles.embed}
      dangerouslySetInnerHTML={{
        __html: data.primary.embed?.html || '',
      }}
    />
  );
}
