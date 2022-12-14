import { useSession, getSession } from "next-auth/react"
import Layout from "../../components/layout"
import type { GetServerSidePropsResult, NextPageContext } from "next"
import { Session } from "next-auth";
import { useAuthSession } from "../../hooks/useAuthSession";

const ServerSidePage: React.FunctionComponent<{}> = ({ }) => {
  // As this page uses Server Side Rendering, the `session` will be already
  // populated on render without needing to go through a loading stage.
  // This is possible because of the shared context configured in `_app.js` that
  // is used by `useSession()`.
  // const loading = status === "loading"
  const { userId } = useAuthSession();

  return (
    <Layout>
      <h1>Protected by middleware</h1>
      <p>{userId}</p>
      {/* <p>
        This page uses the universal <strong>getSession()</strong> method in{" "}
        <strong>getServerSideProps()</strong>.
      </p>
      <p>
        Using <strong>getSession()</strong> in{" "}
        <strong>getServerSideProps()</strong> is the recommended approach if you
        need to support Server Side Rendering with authentication.
      </p>
      <p>
        The advantage of Server Side Rendering is this page does not require
        client side JavaScript.
      </p>
      <p>
        The disadvantage of Server Side Rendering is that this page is slower to
        render.
      </p> */}
    </Layout>
  )
}

export default ServerSidePage;

// Export the `session` prop to use sessions with Server Side Rendering
// export async function getServerSideProps(context: NextPageContext): Promise<GetServerSidePropsResult<any>> {

//   const session = await getSession(context);

//   if (!session) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false
//       }
//     }
//   }

//   return {
//     props: {
//       session
//     },
//   }
// }
