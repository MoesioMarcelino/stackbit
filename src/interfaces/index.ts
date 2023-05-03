export type Metadata = {
    id: string;
    modelName: string;
    urlPath?: string;
};

export type Section = {
    label: string;
    type: string;
    __metadata: Metadata;
};

export type CurrentPage = {
    content: string;
    sections: Section[];
    slug: string;
    title: string;
    __metadata: Metadata;
};

export type SiteConfig = {
    defaultMetaTags: {
        content: string;
        property: string;
        type: string;
    }[];
    defaultSocialImage: string;
    favicon: string;
    footer: string;
    header: string;
    titleSuffix: string;
    __metadata: Metadata;
};

export type PageProps = {
    page: CurrentPage;
    site: SiteConfig;
};
