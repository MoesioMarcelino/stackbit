import { Model } from '@stackbit/types';

export const ThemeStyle: Model = {
    type: 'data',
    name: 'ThemeStyle',
    label: 'Theme Style',
    labelField: 'light',
    singleInstance: true,
    file: 'themeStyle.json',
    fields: [
        {
            type: 'color',
            name: 'light',
            label: 'Light',
            required: false,
            hidden: false,
            localized: false
        }
    ]
};
