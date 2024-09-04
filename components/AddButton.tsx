"use client";
import { Button } from "@nextui-org/button";
import { extendVariants } from "@nextui-org/system";

export const AddButton = extendVariants(Button, {
    variants: {
        color: {
            orange: "text-[#000] bg-gradient-to-r from-[#FFA826] to-[#FF7A26]",
            hoverOrange:
                "bg-transparent hover:bg-gradient-to-r from-[#FFA826] to-[#FF7A26]",
        },
    },
});
