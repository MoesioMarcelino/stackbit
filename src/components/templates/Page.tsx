import { PageProps, Section } from 'src/interfaces';
import { getComponent } from '../component-registry';
import DefaultTemplate from './Default';
import { ComponentType } from 'react';

export default function Page({ page, site }: PageProps) {
    const { title, sections = [], __metadata } = page;

    return (
        <DefaultTemplate page={page} site={site}>
            <main id="main">
                {title && <h1 className="sr-only">{title}</h1>}
                {sections.length > 0 && (
                    <div>
                        {sections.map((section, index) => {
                            const Component = getComponent<Section>(section.__metadata.modelName);
                            if (!Component) {
                                throw new Error(`no component matching the page section's model name: ${section.__metadata.modelName}`);
                            }
                            return (
                                <div data-sb-field-path={`sections.${index}`} key={index}>
                                    <Component {...section} />
                                </div>
                            );
                        })}
                    </div>
                )}
            </main>
        </DefaultTemplate>
    );
}
