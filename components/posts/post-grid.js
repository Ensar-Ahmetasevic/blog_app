import classes from "./posts-grid.module.css";
import PostItem from "./post-item";

function PostsGrid(props) {
  const { posts } = props;

  return (
    <ul className={classes.grid}>
      {posts.map((post) => (
        <PostItem key={post.slug} post={post} />
      ))}
      {/* Map my posts data into "PostItem" component.*/}
    </ul>
  );
}

export default PostsGrid;
