/*
Delete Button to use confirm on delete, control messages in confirm  dialog
handleDelete function have id of data to be deleted
*/
import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useTranslation } from "@/app/context/TranslationContext";

function DeleteButton({ handleDelete, title }) {
  const { locale, t } = useTranslation();
  const onOk = () => {
    return new Promise((resolve, reject) => {
      handleDelete().then(resolve).catch(reject);
    }).catch(() => console.log("Oops, errors occurred!"));
  };
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="destructive" className="">
          {title}
          <AiOutlineDelete className="mx-1 text-lg" />
        </Button>
      </DialogTrigger>
      <DialogContent
        locale={locale}
        dir={locale === "ar" ? "rtl" : "ltr"}
        className="text-start"
      >
        <DialogHeader className="text-start sm:text-start">
          <DialogTitle>{t("sure_delete")}</DialogTitle>
          <DialogDescription>
            {t("description_delete_dialog")}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <Button variant="destructive" onClick={onOk} className="">
            {title}
            <AiOutlineDelete className="mx-1 text-lg" />
          </Button>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              {t("close_dialog")}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteButton;
