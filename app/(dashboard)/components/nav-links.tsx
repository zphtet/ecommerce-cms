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
      label: "Billboards",
      href: `/${storeid}/billboards`,
      active: pathname === `/${storeid}/billboards`,
    },
    {
      label: "Categories",
      href: `/${storeid}/categories`,
      active: pathname === `/${storeid}/categories`,
    },
    {
      label: "Sizes",
      href: `/${storeid}/sizes`,
      active: pathname === `/${storeid}/sizes`,
    },
    {
      label: "Colors",
      href: `/${storeid}/colors`,
      active: pathname === `/${storeid}/colors`,
    },
    {
      label: "Products",
      href: `/${storeid}/products`,
      active: pathname === `/${storeid}/products`,
    },
    {
      label: "Orders",
      href: `/${storeid}/orders`,
      active: pathname === `/${storeid}/orders`,
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
