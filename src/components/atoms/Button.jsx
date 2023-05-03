import { Button as ButtonComponent } from 'moesiomarcelino-react';

export default function Button(props) {
    if (!props.label) {
        return null;
    }
    return <ButtonComponent {...props} data-sb-field-path=".label" />;
}
