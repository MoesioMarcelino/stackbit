import { Model } from '@stackbit/types';

export const Button: Model = {
    type: 'object',
    name: 'Button',
    label: 'Button',
    labelField: 'label',
    fields: [
        {
            type: 'string',
            name: 'label',
            required: false,
            default: 'Learn more',
            hidden: false,
            localized: false
        },
        {
            type: 'enum',
            name: 'size',
            options: ['small', 'medium', 'large'],
            default: 'medium'
        }
    ]
};
