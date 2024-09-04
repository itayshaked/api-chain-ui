import {
    CurlRequestCardType,
    FormRequestCardType,
    GenericCardType,
} from "@/types";
import { CurlRequestCard, HttpRequestCard } from "./Card";
import { useSelector } from "@/app/hooks";
import { selectCards } from "@/app/cardsSlice";

export const CardList = () => {
    const cards = useSelector(selectCards);

    return (
        <div className="relative h-full w-full">
            {cards.map((card: GenericCardType, index: number) => {
                if (card.type === "form")
                    return (
                        <HttpRequestCard {...(card as FormRequestCardType)} />
                    );
                if (card.type === "curl")
                    return (
                        <CurlRequestCard {...(card as CurlRequestCardType)} />
                    );
            })}
        </div>
    );
};
