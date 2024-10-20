"use client";
import { CartProvider } from "@/components/cart.context";
import MenuView from "@/components/menu.view";
import MenuSearch from "./admin/menu.search";
import { useState } from "react";
import OrderCard from "@/components/order.cart";

export default function Home() {
  const [valueSearch, setValueSearch] = useState<string>("");
  return (
    <>
      <CartProvider>
        <MenuSearch setValueSearch={setValueSearch} />
        <MenuView valueSearch={valueSearch} />
        <OrderCard />
      </CartProvider>
    </>
  );
}
