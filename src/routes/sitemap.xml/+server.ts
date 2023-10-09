import { BRAND } from '$lib/config';

export async function GET() {
	const files = import.meta.glob('$routes/**/*.{svelte,md}');
	const urls = Object.keys(files).map((file) => {
		const url = file
			.replace('/src/routes', '')
			.replace('[[lang]]', '')
			.replace('.svelte', '')
			.replace('.md', '')
			.replace('+page', '')
			.replace('+layout', '')
			.replace('+error', '')
			.replace('+server', '')
			.replace('+404', '')
			.replace(/\(([^)]+)\)\//g, '')
			.slice(0, -1);
		return `${BRAND.url}${url}`;
	});

	const uniqueUrls = [...new Set(urls)];

	let ResponseToReturn = `
        <?xml version="1.0" encoding="UTF-8" ?>
        <urlset
            xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:xhtml="https://www.w3.org/1999/xhtml"
            xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
            xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
            xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
            xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
        >`;

	for (const url of uniqueUrls) {
		ResponseToReturn += `
            <url>
                <loc>${url}</loc>
                <changefreq>monthly</changefreq>
                <priority>0.9</priority>
            </url>`;
	}

	ResponseToReturn += `
        </urlset>`;

	return new Response(ResponseToReturn.trim(), {
		headers: {
			'Content-Type': 'application/xml'
		}
	});
}
