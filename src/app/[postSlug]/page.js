import React from "react";
import BlogHero from "@/components/BlogHero";
import styles from "./postSlug.module.css";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getBlogPostList, loadBlogPost } from "@/helpers/file-helpers";
import CodeSnippet from "@/components/CodeSnippet";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
const DivisionGroupsDemo = dynamic(() =>
  import("/src/components/DivisionGroupsDemo/DivisionGroupsDemo.js")
);
const CircularColorsDemo = dynamic(() =>
  import("/src/components/CircularColorsDemo/CircularColorsDemo.js")
);

export async function generateMetadata({ params }) {
  const postList = await getBlogPostList();

  const validLink = postList.some((post) => {
    return post.slug === params.postSlug;
  });
  if (validLink === false) {
    return;
  }

  const post = await loadBlogPost(params.postSlug);
  const {
    content,
    frontmatter: { title, abstract },
  } = post;
  return {
    title: title,
    name: abstract,
    content: content,
  };
}

async function BlogPost({ params }) {
  const postList = await getBlogPostList();

  const validLink = postList.some((post) => {
    return post.slug === params.postSlug;
  });
  if (validLink === false) {
    notFound();
  }

  const post = await loadBlogPost(params.postSlug);
  const {
    content,
    frontmatter: { title, publishedOn },
  } = post;

  return (
    <article className={styles.wrapper}>
      <BlogHero title={title} publishedOn={new Date(publishedOn)} />
      <div className={styles.page}>
        <MDXRemote
          source={content}
          components={{
            pre: CodeSnippet,
            DivisionGroupsDemo,
            CircularColorsDemo,
          }}
        />
      </div>
    </article>
  );
}

export default BlogPost;
