import Head from 'next/head';
import { ReactNode } from 'react';
import { PageProps } from 'src/interfaces';
import { seoGenerateMetaDescription, seoGenerateMetaTags, seoGenerateTitle } from 'src/utils/seo';

type DefaultTemplateProps = PageProps & {
    children: ReactNode;
};

export default function DefaultTemplate({ page, site, children }: DefaultTemplateProps) {
    const title = seoGenerateTitle(page, site);
    const metaTags = seoGenerateMetaTags(page, site);
    const metaDescription = seoGenerateMetaDescription(page);
    const id = page.__metadata.id;

    return (
        <div>
            <Head>
                <title>{title}</title>
                {metaDescription && <meta name="description" content={metaDescription} />}
                {metaTags.map((metaTag) => {
                    if (metaTag.format === 'property') {
                        return <meta key={metaTag.property} property={metaTag.property} content={metaTag.content} />;
                    }

                    return <meta key={metaTag.property} name={metaTag.property} content={metaTag.content} />;
                })}
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                {site?.favicon && <link rel="icon" href={site.favicon} />}
            </Head>
            {site.header && <h1>Header</h1>}
            {children}
            {site.footer && <h1>Footer</h1>}
        </div>
    );
}
