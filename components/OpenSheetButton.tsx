'use client';

import * as React from 'react';
import { SheetTrigger } from "@/components/ui/sheet";

const OpenSheetButton = () => {
  return (
    <SheetTrigger asChild>
      <button className="p-2 bg-blue-500 text-white rounded">
        Open Sheet
      </button>
    </SheetTrigger>
  );
};

export default OpenSheetButton;
