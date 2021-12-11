import type { VFC } from "react";
import Image from "next/image";
import Link from "next/link";

import { MangaAddTitle } from "src/component/model/manga/MangaAddTitle";
import noImage from "public/image/no_image.png";

export type Title = {
  id: number;
  user_id: string;
  title: string;
  author: string;
  image_url: string;
};

type TitlesProps = {
  titles: Title[];
  uuid: string;
  getTitleList: () => void;
  filterText: string;
};

export const MangaTitleList: VFC<TitlesProps> = (props) => {
  const filteredTitle = props.titles.filter((title) => {
    const searchContent = title.title + " " + title.author;
    return searchContent.toLowerCase().includes(props.filterText.toLowerCase());
  });

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-2 m-4">
      <MangaAddTitle uuid={props.uuid} getTitleList={props.getTitleList} />
      {filteredTitle.map((title) => (
        <Link key={title.id} href={`/title?id=${title.id}`} passHref>
          <div className="p-2 border cursor-pointer">
            <div className="flex justify-center">
              <Image
                src={title.image_url ? title.image_url : noImage}
                alt="thumbnail"
                width={126}
                height={200}
              />
            </div>
            <div className="mt-2 text-center">{title.title}</div>
          </div>
        </Link>
      ))}
    </div>
  );
};
