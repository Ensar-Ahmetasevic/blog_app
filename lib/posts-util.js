import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");

export function getPostsFiles() {
  return fs.readdirSync(postsDirectory); // "readdirSync" read the entire content of a directory in one go here.
}

// ******** helper function  *************
export function getPostData(postIdentifier) {
  const postSlug = postIdentifier.replace(/\.md$/, "");
  // removes the file extension (.md) , So if we received just this "slug", "replace" will do nothing, which is ok.
  /*
    That leaves us with a slug which is just a file name without the extension. And therefore we should make sure that your file names
    do have this slug format (getting-started-with-nextjs.md) and do not contain any special characters or white space.
    */
  const filePath = path.join(postsDirectory, `${postSlug}.md`);
  /*
  We create a string (with a template literal), and we use "postSlug" which is guaranteed that we have not an extension, and then add ".md".
   So we always create a file, path or a file name with extension.
  */

  const fileContent = fs.readFileSync(filePath, "utf-8"); // With second argument (UTF-8) we support all those Unicode characters.
  // The overall content is what we extracted (metadata and the actual content). To split it up, we'll use this "gray-matter" package.

  const { data, content } = matter(fileContent);
  /* 
  "matter" return an object with two properties, with a data property, (which contains the metadata) as a JavaScript object. 
  And a content property which contains the actual content, the markdown text as a string. So we can use object destructuring 
  to pull these two properties out of the returned object and store them in separate constants (data and content).
  And those properties  ("data" and "content") has to be named like that  because they are made in that object created by "matter".
    */

  const postData = {
    slug: postSlug,
    ...data,
    content, // content = content
  };

  return postData;
}

// ***********getAllPosts***********************

export function getAllPosts() {
  const postFiles = getPostsFiles();

  // Now we can call "getPostData" for every post we got here in "getAllPosts".

  const allPosts = postFiles.map((postFile) => {
    return getPostData(postFile);
  });

  /*
Return "getPostData" for the given "postFile". So then we would map our array of file names into an array of objects with the
actual data for those different posts. Now, map returns a new array it does not change the existing array. So we will create a
new "allPosts" array which is an array full of "postData".
*/

  const sortedPosts = allPosts.sort((postA, postB) =>
    postA.date > postB.date ? -1 : 1
  );

  // JavaScript "sort" method which will make sure that posts with a greater date are actually sort in front of older posts.

  return sortedPosts;
}

/* ************getFeaturedPosts**************** */

export function getFeaturedPosts() {
  const allPosts = getAllPosts();

  const featuredPosts = allPosts.filter((post) => post.isFeatured);
  /*
If it's true, we'll keep it.
If it's false, we'll drop it.
So "featuredPosts" then only contains the posts where 
"isFeatured" is set to true.
    */

  return featuredPosts;
}
