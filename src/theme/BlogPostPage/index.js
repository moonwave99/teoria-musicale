import React from "react";
import BlogPostPage from "@theme-original/BlogPostPage";
import useSoundEngine from "../../hooks/useSoundEngine";
import useAbcEngine from "../../hooks/useAbcEngine";

export default function BlogPostPageWrapper(props) {
    useSoundEngine();
    useAbcEngine();
    return <BlogPostPage {...props} />;
}
