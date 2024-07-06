"use client";

import Link from "next/link";

export default function Page() {
  return (
    <div>
      <Link href="/dummy">Dummy Route</Link>
      <br />
      <Link href="/author">Author Route</Link>
      <br />
      <Link href="/home">Home</Link>
    </div>
  );
}
