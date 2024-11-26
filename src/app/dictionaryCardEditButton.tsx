"use client";
import { EditDictionary } from "@/components/editDictionary";
import { hasPermission } from "@/dictionaryPermission";
import axios from "axios";
import { EllipsisVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const DictionaryCardEditButton = ({
  token,
  dictionaryContent,
}: {
  dictionaryContent: any;
  token: string;
}) => {
  const [openMenu, setOpenMenu] = useState(false);
  const router = useRouter();
  async function handleDeleteDictionary() {
    await axios.post("/api/dict/deleteDictionary", dictionaryContent);
    router.refresh();
  }
  return (
    <div>
      {hasPermission(token, "edit:dictionary") && (
        <div className=" relative p-2  duration-200 h-fit rounded-full hover:bg-gray-100">
          <EllipsisVertical
            onClick={() => setOpenMenu(!openMenu)}
            className="cursor-pointer"
            size={20}
            color="#333"
          />
          {openMenu && (
            <div className=" absolute top-8 right-0 border z-20 rounded flex flex-col shadow-lg">
              <EditDictionary
                dictionaryContent={dictionaryContent}
              ></EditDictionary>
              {hasPermission(token, "delete:dictionary") && (
                <div
                  onClick={handleDeleteDictionary}
                  className=" cursor-pointer hover:bg-gray-100 py-1 px-3"
                >
                  Delete
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DictionaryCardEditButton;
