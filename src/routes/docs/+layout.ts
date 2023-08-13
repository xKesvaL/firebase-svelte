// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { LayoutLoad } from './$types';

type Category = 'firestore' | 'realtime' | 'auth' | 'global';

interface DocMetadata {
	category: Category;
	title: string;
}

interface Doc extends DocMetadata {
	paths: string[];
}

const load: LayoutLoad = () => {
	const docs: Doc[] = [];

	const paths = import.meta.glob('/src/routes/docs/**/*.md', { eager: true });

	for (const path in paths) {
		const file = paths[path];
		const pathParts = path.split('/').slice(3).slice(0, -1);

		if (file && typeof file === 'object' && 'metadata' in file) {
			const metadata = file.metadata as DocMetadata;
			const doc = { ...metadata, paths: pathParts } as Doc;
			docs.push(doc);
		}
	}

	return {
		docs
	};
};

export { load };
