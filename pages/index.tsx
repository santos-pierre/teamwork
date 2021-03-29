import Layout from '../components/layouts/Base';
import { useSession, getSession, signOut } from 'next-auth/client';

const IndexPage = () => {
    const [session, loading] = useSession();

    console.log(session);

    if (loading) return <p>Loading</p>;

    if (!loading && !session) return <p>Access Denied</p>;

    const handleSignOut = async () => {
        await signOut({ callbackUrl: '/signin' });
    };

    return (
        <Layout title="Home | Next.js + TypeScript Example">
            <h1>Hello {session?.user.name} 👋</h1>
            <p>
                <button type="button" onClick={handleSignOut}>
                    Log out
                </button>
            </p>
        </Layout>
    );
};
export default IndexPage;
