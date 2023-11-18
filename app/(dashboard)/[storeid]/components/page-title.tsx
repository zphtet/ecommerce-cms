import { Button } from "@/components/ui/button";

import { Separator } from "@/components/ui/separator";
import Link from "next/link";
type TitleProps = {
  title: string;
  number: number;
  desc: string;
  href: string;
  isNew?: boolean;
};

const PageTitle = ({ title, number, desc, href, isNew }: TitleProps) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold">
            {title} ({number})
          </h3>
          <p>{desc}</p>
        </div>
        {isNew && (
          <Link href={href}>
            <Button> + Add New</Button>
          </Link>
        )}
      </div>
      <Separator className="mt-3" />
    </>
  );
};

export default PageTitle;
