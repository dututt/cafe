"use client";
import { CartProvider } from "@/components/cart.context";
import MenuView from "@/components/menu.view";
import MenuSearch from "./admin/menu.search";
import { useState } from "react";

export default function Home() {
  const [valueSearch, setValueSearch] = useState<string>("");
  return (
    <CartProvider>
      <MenuSearch setValueSearch={setValueSearch} />
      <MenuView valueSearch={valueSearch} />
    </CartProvider>
  );
}
