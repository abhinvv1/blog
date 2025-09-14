'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export function BackButton() {
  return (
    <Link
      href="/posts"
      className="inline-flex items-center space-x-2 text-dark-400 hover:text-primary-500 transition-colors duration-200 mb-8"
    >
      <ArrowLeft className="h-4 w-4" />
      <span>Go back</span>
    </Link>
  );
}
