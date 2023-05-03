import glob from 'glob';
import * as fs from 'fs';
import path from 'path';
import graymatter from 'gray-matter';
import { v4 as uuid } from 'uuid';

import stackbitConfig from '../../stackbit.config';
import { allModels } from 'sources/local/models';
import { Config } from 'sources/local/models/Config';

const pagesDir = stackbitConfig.pagesDir || 'content/pages';
const dataDir = stackbitConfig.dataDir || 'content/data';
const acceptedFileTypes = ['md', 'json'];

const allReferenceFields = {};

// Popula o objeto allReferenceFields para indicar se cada campo está referenciado corretamente
Object.entries(allModels).forEach(([modelName, model]) => {
    model.fields?.forEach((field) => {
        if (field.type === 'reference' || (field.type === 'list' && field.items?.type === 'reference')) {
            allReferenceFields[`${modelName}:${field.name}`] = true;
        }
    });
});

// Verifica se o campo X está referenciado corretamente
function isRefField(modelName: string, fieldName: string) {
    return allReferenceFields[`${modelName}:${fieldName}`];
}

function getFilesInPath(path: string) {
    const globPattern = `${path}/**/*.{${acceptedFileTypes.join(',')}}`;
    return glob.sync(globPattern);
}

function getContent(filePath: string) {
    const rawContent = fs.readFileSync(filePath, 'utf8');

    let content = null as any;
    const extension = path.extname(filePath).substring(1);

    switch (extension) {
        case 'md':
            const parsedMd = graymatter(rawContent);
            content = {
                ...parsedMd.data,
                content: parsedMd.content
            };
            break;

        case 'json':
            content = JSON.parse(rawContent);
            break;

        default:
            throw Error('Unhandled file type: ' + filePath);
    }

    const { name } = path.parse(filePath);

    content.__metadata = {
        id: filePath,
        modelName: content.type || name
    };

    return content;
}

function resolveReferences(content: any, fileToContent: any) {
    if (!content || !content.type) return;

    const modelName = content.type;

    if (!content.__metadata) content.__metadata = { modelName };

    for (const field in content) {
        let value = content[field];
        if (!value) continue;

        const isRef = isRefField(modelName, field);

        // Para o caso de modelos com o type 'list'
        if (Array.isArray(value)) {
            if (value.length === 0) continue;
            if (isRef && typeof value[0] === 'string') {
                value = value.map((filename) => fileToContent(filename));
                content[field] = value;
            }
            if (typeof value[0] === 'object') {
                value.forEach((obj) => resolveReferences(obj, fileToContent));
            }
        } else {
            if (isRef && typeof value === 'string') {
                value = fileToContent[value];
                content[field] = value;
            }

            if (typeof value === 'object') {
                resolveReferences(value, fileToContent);
            }
        }
    }
}

function getPageUrl(page: any) {
    if (!page || !page.slug) return null;
    if (page.slug === '/index') page.slug = '/';
    return (page.slug as string).startsWith('/') ? page.slug : `/${page.slug}`;
}

export function allContent() {
    const [data, pages] = [dataDir, pagesDir].map((directory) => {
        return getFilesInPath(directory).map((file) => getContent(file));
    });

    const objects = [...data, ...pages];
    const fileToContent = Object.fromEntries(objects.map((obj) => [obj.__metadata.id, obj]));

    objects.forEach((obj) => resolveReferences(obj, fileToContent));
    pages.forEach((page) => (page.__metadata.urlPath = getPageUrl(page)));

    const siteConfig = data.find((obj) => obj.__metadata.modelName.toLowerCase() === Config.name.toLowerCase());

    return { objects, pages, props: siteConfig ? { site: siteConfig } : {} };
}
