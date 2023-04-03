import { Inter } from "next/font/google";
import GifList from "@/components/ListGifs";
import Pokemon from "@/components/Pokemon";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return <Pokemon />;
}
