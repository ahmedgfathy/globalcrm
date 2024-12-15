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

function DeleteButton({ handleDelete, title, afterDel, className }) {
  const { locale, t } = useTranslation();

  // const onOk = () => {
  //   return handleDelete()
  //     .then(() => {
  //       if (afterDel){
  //         return afterDel();
  //       }else{
  //         console.log("ddd")
  //       }
  //     })
  //     .catch(() => {
  //       console.log("Oops, errors occurred!");
  //     });
  // };
  const onOk = () => {
    const result = handleDelete();
    if (result instanceof Promise) {
      return result
        .then(() => {
          if (afterDel) {
            return afterDel();
          }
        })
        .catch(() => {
          console.log("Oops, errors occurred!");
        });
    } else {
      console.warn("handleDelete did not return a Promise.");
      if (afterDel) {
        afterDel();
      }
      return Promise.resolve();
    }
  };
  
  return (
<Dialog>
  <DialogTrigger
    onClick={(e) => e.stopPropagation()} // منع التفاعل مع صف الجدول
  >
    <Button variant="destructive" aria-label={t("delete")} className={className}>
      {title}
      <AiOutlineDelete className="mx-1 text-lg" />
    </Button>
  </DialogTrigger>
  <DialogContent
    locale={locale}
    dir={locale === "ar" ? "rtl" : "ltr"}
    className="text-start"
    onClick={(e) => e.stopPropagation()}
  >
    <DialogHeader>
      <DialogTitle>{t("sure_delete")}</DialogTitle>
      <DialogDescription>{t("description_delete_dialog")}</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose asChild>
        <Button
          variant="destructive"
          onClick={(e) => {
            e.stopPropagation();
            onOk();
          }}
        >
          {t("Delete")}
          <AiOutlineDelete className="mx-1 text-lg" />
        </Button>
      </DialogClose>
      <DialogClose asChild>
        <Button
          type="button"
          variant="secondary"
          onClick={(e) => e.stopPropagation()}
        >
          {t("close_dialog")}
        </Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>

  );
}

export default DeleteButton;
