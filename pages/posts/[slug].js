import PostContent from "../../components/posts/post-detail/post-content";
import { getPostData, getPostsFiles } from "../../lib/posts-util";

function PostDetailPage(props) {
  return <PostContent post={props.post} />;
}

/* Extractracting the concrete "slug" value, from params. */

export function getStaticProps(context) {
  const { params } = context;
  const { slug } = params;

  const postData = getPostData(slug);

  return {
    props: {
      post: postData,
    },
    revalidate: 6000, // every 100 minutes
  };
}
/*
"getStaticProps" can't work on its own. We need to pair it, with "getStaticPaths" 
to let NextJS know which concrete slug values it should pre-generate.
*/
export function getStaticPaths() {
  const postFilenames = getPostsFiles(); // file names with extension
  const slugs = postFilenames.map((fileName) => fileName.replace(/\.md$/, "")); // removes the file extension (.md)

  return {
    // We will define all posts in advance.
    paths: slugs.map((slug) => ({ params: { slug: slug } })),
    fallback: false,
  };
}

export default PostDetailPage;
