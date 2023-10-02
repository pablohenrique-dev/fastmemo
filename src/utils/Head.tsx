import React from "react";

interface HeadProps {
  description: string;
  title: string | null;
}

export const Head = ({ description, title }: HeadProps) => {
  React.useEffect(() => {
    document.title = "Fastmemo | " + title;
    document
      .querySelector("meta[name='description']")
      ?.setAttribute("content", description);
  }, [title, description]);
  return <></>;
};
