import React, { useEffect } from "react";
import BlogPostPage from "@theme-original/BlogPostPage";
import useSoundEngine from "../../hooks/useSoundEngine";

export default function BlogPostPageWrapper(props) {
    useSoundEngine();
    return <BlogPostPage {...props} />;
}
