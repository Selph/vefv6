import styles from '../styles/Page.module.css';
import { Slice } from '../pages/api/types';
import { PrismicRichText } from '@prismicio/react';

export default function Text({ data }: { data: Slice }) {
	return (
		<div className={styles.texts}>
			<PrismicRichText field={data.primary.content} />
		</div>
	);
}