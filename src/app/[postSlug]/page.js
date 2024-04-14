import React from "react";
import BlogHero from "@/components/BlogHero";
import styles from "./postSlug.module.css";
import { MDXRemote } from "next-mdx-remote/rsc";
import { loadBlogPost } from "@/helpers/file-helpers";
import CodeSnippet from "@/components/CodeSnippet";

export async function generateMetadata({ params }) {
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
  const post = await loadBlogPost(params.postSlug);
  const {
    content,
    frontmatter: { title, publishedOn },
  } = post;

  return (
    <article className={styles.wrapper}>
      <BlogHero title={title} publishedOn={new Date(publishedOn)} />
      <div className={styles.page}>
        <MDXRemote source={content} components={{ pre: CodeSnippet }} />
      </div>
    </article>
  );
}

export default BlogPost;
