"use client"
import React, { useEffect, useState } from 'react';
import { motion, Reorder } from 'framer-motion';
import PageCard, { mockPages, Page } from './PageCard'; // ???? ?? ?? ????? ????? ????

const PageList: React.FC = () => {
  const [pages, setPages] = useState<Page[]>(mockPages);
  useEffect(() => {
    // ????? ????????? ????? ???? ?? ?? ???? ?? ????????????? ????? ????
    //alert("Updated pages order: "+ pages.map((p)=>p.title));
  }, [pages]);
  const movePage = (fromIndex: number, toIndex: number) => {
    const newPages = [...pages];
    const [movedPage] = newPages.splice(fromIndex, 1);
    newPages.splice(toIndex, 0, movedPage);
    setPages(newPages);
  };

  return (
    <div className="p-1">
      <h1 className="text-2xl font-bold mb-4">Website Pages</h1>
      <Reorder.Group axis="y" values={pages} onReorder={setPages} className="w-fulls">
        {pages.map((page, index) => (
          <Reorder.Item key={page.id} value={page}>
            <PageCard
              key={page.id}
              page={page}
              index={index}
              movePage={movePage}
            />
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  );
};

export default PageList;
