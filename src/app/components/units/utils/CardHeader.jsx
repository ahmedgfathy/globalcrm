import { Button } from "@/components/ui/button";
import { CardDescription } from "@/components/ui/card";
import React from "react";
import DeleteButton from "../../delete-button/DeleteButton";
import { IoMdAddCircle } from "react-icons/io";
import { deleteProperty } from "@/actions/propertiesAction";
import { useRouter } from "next/navigation";

function CardHeader({
  title,
  description,
  page,
  setIsDisabled,
  t,
  handleSubmit,
  isDisabled,
  unit,
}) {
  const router = useRouter();
  return (
    <div
      className="header w-full flex justify-between items-center max-[450px]:flex-wrap gap-y-3 pb-2 px-6"
      dir="rtl"
    >
      <div>
        <p className="text-2xl font-bold">{title}</p>
        <CardDescription>{description}</CardDescription>
      </div>
      <div className="w-max flex justify-between items-center gap-2 buttons">
        {page === "add" ? (
          <Button
            className="GreenButton dark p-1  flex justify-between items-center gap-1"
            onClick={handleSubmit}
          >
            <IoMdAddCircle />
            {t("save")}
          </Button>
        ) : (
          <>
            <Button
              className="GreenButton dark"
              onClick={() => {
                isDisabled ? setIsDisabled(false) : handleSubmit();
              }}
            >
              {isDisabled ? t("Update") : t("save")}
            </Button>
            <Button
              className=""
              variant="secondary"
              onClick={() => {
                !isDisabled ? setIsDisabled(true) : router.back();
              }}
            >
              {!isDisabled ? t("exit") : t("back")}
            </Button>
            <DeleteButton
              handleDelete={() => deleteProperty(unit.$id)}
              afterDel={() => router.back()}
              className="DeleteButton dark"
            >
              {t("Delete")}
            </DeleteButton>
          </>
        )}
      </div>
    </div>
  );
}

export default CardHeader;
