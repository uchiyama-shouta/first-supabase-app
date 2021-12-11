import type { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import { Auth } from "@supabase/ui";
import {
  MangaTitleList,
  Title,
} from "src/component/model/manga/MangaTitleList";
import { getTitles } from "src/lib/supabase";

const Home: NextPage = () => {
  const { user } = Auth.useUser();
  const [text, setText] = useState("");
  const [titles, setTitles] = useState<Title[]>([]);

  const handleChangeText = (e: ChangeEvent<HTMLInputElement>) =>
    setText(e.target.value);

  const getTitleList = useCallback(async () => {
    const data = await getTitles();
    setTitles(data);
  }, [setTitles]);

  useEffect(() => {
    getTitleList();
  }, [getTitleList]);

  return (
    <div>
      <div className="flex gap-2 justify-center p-4">
        <input
          className="px-4 w-full h-12 bg-white rounded border border-gray-300 hover:border-gray-700 shadow appearance-none"
          placeholder="Filtering text"
          value={text}
          onChange={handleChangeText}
        />
      </div>
      {user && (
        <MangaTitleList
          titles={titles}
          uuid={user.id}
          getTitleList={getTitleList}
          filterText={text}
        />
      )}
    </div>
  );
};

export default Home;
