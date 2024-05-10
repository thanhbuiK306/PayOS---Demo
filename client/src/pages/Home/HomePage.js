import { useTitle } from "../../hooks/useTitle";
import { Hero } from "./components/Hero";

import { Testimonials } from "./components/Testimonials";
import { Faq } from "./components/Faq";
export const HomePage = () => {
  useTitle ("Access Latest Computer Science eBooks");
  return (
    <main>
     <Hero />
    {/* <Testimonials  />
    <Faq  /> */}
    </main>
  )
}
