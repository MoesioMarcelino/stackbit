import dynamic from 'next/dynamic';
import { ComponentType } from 'react';

const components = {
    Page: dynamic(() => import('./templates/Page')),
    Button: dynamic(() => import('./atoms/Button'))
};

export function getComponent<T = {}>(modelName: string): ComponentType<T> {
    return components[modelName] as ComponentType<T>;
}
