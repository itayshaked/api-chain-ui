"use client";
import { Snippet } from "@nextui-org/snippet";
import { title } from "@/components/primitives";
import { AddButton } from "@/components/AddButton";
import { HttpRequestForm } from "@/components/AddCardForm";
import { CardList } from "@/components/CardList";

import { useFormState, useSelector } from "./hooks";

export default function Home() {
    const cards = useSelector((state) => state.cardsState.cards);
    const { onCardFormOpen } = useFormState();

    return (
        <div className="flex flex-col h-full w-full">
            <section className="flex flex-col items-center justify-center gap-4">
                <div className="inline-block max-w-lg text-center justify-center">
                    <h1 className={title()}>Chain&nbsp;</h1>
                    <h1 className={title({ color: "orange" })}>
                        API requests&nbsp;
                    </h1>
                    <br />
                    <h1 className={title()}>play with</h1>
                    <h1 className={title({ color: "orange" })}> API's&nbsp;</h1>
                    <h1 className={title()}>and</h1>
                    <h1 className={title({ color: "orange" })}> AI models </h1>
                </div>

                <div className="flex gap-3">
                    <AddButton onPress={onCardFormOpen} color="orange">
                        Add
                    </AddButton>
                </div>
                <div className="flex">
                    {cards.length === 0 && (
                        <Snippet hideCopyButton hideSymbol variant="bordered">
                            <span>
                                Get started by clicking the Add button above
                            </span>
                        </Snippet>
                    )}
                </div>
                <HttpRequestForm />
            </section>
            <section className="flex flex-col items-center h-full justify-center">
                <CardList />
            </section>
        </div>
    );
}
