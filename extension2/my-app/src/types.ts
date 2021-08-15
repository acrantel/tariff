export enum Sender {
  React,
  Content,
  Background,
}

export interface ChromeMessage {
  from: Sender;
  message: any;
}

export interface Product {
  link: string;
  name: string;
  price: number;
}
