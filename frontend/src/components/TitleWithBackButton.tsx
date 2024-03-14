import Link from "next/link";
import Button from "@/components/Button";
import Text from "@/components/Text";
import React from "react";

export default function TitleWithBackButton({
  title,
  href,
}: {
  title: string;
  href: string;
}) {
  return (
    <div className="flex items-center">
      <Link href={href}>
        <Button className="h-[40px]">
          <span className="material-symbols-outlined">arrow_back</span>
        </Button>
      </Link>
      <Text level="h2" className="mx-2">
        {title}
      </Text>
    </div>
  );
}
