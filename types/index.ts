import { UUID } from "crypto";
import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};
export type CardType = {
  id: string;
  type: "form" | "curl"
  title: string;
  description?: string;
  cardListRef?: React.RefObject<HTMLDivElement> | null;
};

export interface FormRequestCardType extends CardType {
  method: "GET" | "POST" | "PUT" | "DELETE";
  url: string;
  params?: string;
  body?: string;
}

export interface CurlRequestCardType extends CardType {
  curl: string;
}

export type GenericCardType = FormRequestCardType | CurlRequestCardType;


