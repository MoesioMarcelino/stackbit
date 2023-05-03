function getRootPagePath(url: string) {
    const pagePathMatched = url.match(/\/page\/\d+$/);
    if (!pagePathMatched) return url;

    return url.substring(0, pagePathMatched.index);
}

export function resolveProps(url: string, data: any) {
    const rootUrlPath = getRootPagePath(url);
    const { __metadata, ...rest } = data.pages.find(({ __metadata }) => __metadata.urlPath === rootUrlPath);

    const props = {
        page: {
            __metadata: {
                ...__metadata,
                urlPath: url
            },
            ...rest
        },
        ...data.props
    };

    return props;
}

/**
 * /blog
 * /blog/dfdf/1212
 * /blog/4sdfsdf/234234
 */
