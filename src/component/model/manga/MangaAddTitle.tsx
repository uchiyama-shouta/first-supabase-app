import { ChangeEvent, Fragment, useCallback, useState } from "react";
import type { VFC } from "react";
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import { Button, IconPlus, IconX } from "@supabase/ui";
import { client } from "src/lib/supabase";
import add from "public/image/add.png";

type Props = {
  uuid: string;
  getTitleList: () => void;
};

export const MangaAddTitle: VFC<Props> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const handleTile = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);

  const handleAuthor = (e: ChangeEvent<HTMLInputElement>) =>
    setAuthor(e.target.value);

  const handleOpenModal = useCallback(() => setIsOpen(true), []);

  const handleCloseModal = useCallback(() => {
    setTitle("");
    setAuthor("");
    setIsOpen(false);
  }, []);

  const handleAdd = useCallback(
    async (uuid: string) => {
      if (title === "") {
        alert("Input title!");
        return;
      }
      const { data, error } = await client
        .from("manga_title")
        .insert([{ user_id: uuid, title: title, author: author }]);

      if (error) {
        alert("Failed: Add Title.");
      } else {
        if (data) {
          props.getTitleList();
          handleCloseModal();
        }
      }
    },
    [title, author, props, handleCloseModal],
  );

  return (
    <>
      <div className="p-2 border cursor-pointer" onClick={handleOpenModal}>
        <div className="flex justify-center">
          <Image src={add} alt="thumbnail" width={126} height={200} />
        </div>
        <div className="mt-2 text-center">ADD NEW</div>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="overflow-y-auto fixed inset-0 z-10"
          onClose={handleCloseModal}
        >
          <div className="px-4 min-h-screen text-center border-2">
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block overflow-hidden p-6 my-8 w-full max-w-md text-left align-middle bg-gray-50 rounded-xl border border-gray-300 shadow-xl transition-all transform">
                <Dialog.Title
                  as="h3"
                  className="text-2xl font-medium leading-6 text-center text-gray-900"
                >
                  Add Title
                </Dialog.Title>
                <div className="grid grid-cols-4 gap-2 mt-4">
                  <div className="col-span-1 text-xl text-center">Title</div>
                  <input
                    className="col-span-3 p-2 w-full h-10 bg-white rounded border border-gray-300 hover:border-gray-700 shadow appearance-none"
                    value={title}
                    onChange={handleTile}
                  />
                </div>
                <div className="grid grid-cols-4 gap-2 mt-4">
                  <div className="col-span-1 text-xl text-center">Author</div>
                  <input
                    className="col-span-3 p-2 w-full h-10 bg-white rounded border border-gray-300 hover:border-gray-700 shadow appearance-none"
                    value={author}
                    onChange={handleAuthor}
                  />
                </div>
                <div className="flex justify-center mt-4">
                  <div className="p-2 w-32">
                    <Button
                      block
                      type="default"
                      size="large"
                      icon={<IconX />}
                      onClick={handleCloseModal}
                    >
                      Cancel
                    </Button>
                  </div>
                  <div className="p-2 w-32">
                    <Button
                      block
                      size="large"
                      icon={<IconPlus />}
                      onClick={() => handleAdd(props.uuid)}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
