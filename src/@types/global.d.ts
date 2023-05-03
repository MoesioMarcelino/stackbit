import { DOMAttributes } from 'react';

declare global {
    namespace JSX {
        interface IntrinsicAttributes extends DOMAttributes<HTMLElement> {
            'data-sb-object-id'?: string | number;
            'data-sb-field-path'?: string;
            page?: any;
            site?: any;
        }
    }
}
