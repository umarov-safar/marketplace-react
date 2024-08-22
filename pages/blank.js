
import Layout from '../components/layout/Layout';

function Test() {
    return (
        <>
            <Layout parent="Home" sub="Pages" subChild="About">
                <h1>Hello world!</h1>
            </Layout>
        </>
    );
}

export default Test;
