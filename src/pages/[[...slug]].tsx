import { GetServerSideProps } from 'next';
import { allContent } from '../utils/local-content';
import { resolveProps } from 'src/utils/props-resolver';
import { getComponent } from 'src/components/component-registry';
import { PageProps } from 'src/interfaces';

function Page({ page, site }: PageProps) {
    const { modelName, id } = page.__metadata;
    if (!modelName) {
        throw new Error('Page model not found' + page.__metadata.id);
    }

    const PageLayout = getComponent(modelName);
    if (!PageLayout) {
        throw new Error('Component registry not found ' + modelName);
    }

    return (
        <div data-sb-object-id={id}>
            <PageLayout page={page} site={site} />
        </div>
    );
}

// export function getStaticPaths() {
//     return {
//         paths: '',
//         fallback: false
//     }
// }

// export async function getStaticProps({ params }:GetStaticPropsContext) {
//     const data = allContent()
//     // const urlPath = '/' + (params.slug || []).join('/')
//     // const props = await resolveStaticProps(urlPath, data)
//     return {
//         props: data
//     }
// }

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const data = allContent();
    const urlPath = '/' + ((params.slug || []) as any).join('/');
    const props = await resolveProps(urlPath, data);

    return {
        props
    };
};

export default Page;
