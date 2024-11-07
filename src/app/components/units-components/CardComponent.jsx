import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import {
  AiOutlineWhatsApp,
  AiOutlineMail,
  AiOutlinePhone,
} from "react-icons/ai";
import { IoMdPerson } from "react-icons/io";
import { useTranslation } from "@/app/context/TranslationContext";

export function CardUnitComponent({ ele }) {
  const { t } = useTranslation();
  const iconCard = [
    { icon: AiOutlineWhatsApp, href: "", color: "#08521d" },
    { icon: AiOutlineMail, href: "", color: "#08521d" },
    { icon: AiOutlinePhone, href: "", color: "#08521d" },
    { icon: IoMdPerson, href: "", color: "#08521d" },
  ];

  return (
    <Card className="w-full max-w-xs shadow-lg transition-transform duration-300 hover:scale-105">
      <CardHeader className="overflow-hidden rounded-t-xl">
        <Image
          className="w-full h-[140px] object-cover transition-transform duration-500 hover:scale-110"
          src={ele.href}
          alt={`${ele.name} profile picture`}
          width={350}
          height={140}
        />
      </CardHeader>

      <CardContent className="p-4 space-y-2">
        <p className="font-bold text-sm capitalize">{`${t("name")}: ${ele.name}`}</p>
        <p className="text-xs capitalize font-bold">{`${t("mobile_phone")}: ${ele.phone}`}</p>
        <div className="flex items-center gap-2 mt-3">
          {iconCard.map((link, index) => (
            <Link href={link.href} key={index} aria-label="social link">
              <link.icon className="text-lg" style={{ color: link.color }} />
            </Link>
          ))}
        </div>
      </CardContent>

      <CardFooter className="p-4 flex justify-center">
      <Link href={`/units/${ele.id}`} className="GreenButton dark">
          {t("more_details")}
        </Link>
        
      </CardFooter>
    </Card>
  );
}
