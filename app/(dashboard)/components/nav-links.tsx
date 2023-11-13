"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

const NavLinks = () => {
  const { storeid } = useParams();
  const pathname = usePathname();
  const navLinks = [
    {
      label: "Overview",
      href: `/${storeid}/overview`,
      active: pathname === `/${storeid}/overview`,
    },
    {   
      label: "Settings",
      href: `/${storeid}/settings`,
      active: pathname === `/${storeid}/settings`,
    },
  ];
  return (
    <div>
      <ul className="flex items-center gap-5">
        {navLinks.map((link) => {
          return (
            <li key={link.label} className={`${link.active && "opacity-70"}`}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default NavLinks;
