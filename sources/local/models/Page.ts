import { PageModel } from '@stackbit/types';

export const Page: PageModel = {
    name: 'Page',
    type: 'page',
    hideContent: true,
    urlPath: '/{slug}',
    fields: [
        { name: 'title', type: 'string', required: true },
        { type: 'slug', name: 'slug', label: 'slug' },
        { name: 'sections', type: 'list', items: { type: 'model', models: ['Button'] } }
    ]
};
