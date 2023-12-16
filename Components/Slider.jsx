
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import "@splidejs/splide/dist/css/splide.min.css";
import Slider1 from '@/public/images/Ministry_of_Law_and_Justice.png';
import Slider2 from '@/public/images/g20.png';
import Slider3 from '@/public/images/amrit_mohatsav.png';
import Slider4 from '@/public/images/data-gov.png';
import Slider5 from '@/public/images/india-gov.png';
import Slider6 from '@/public/images/Make_In_India.png';
import Slider7 from '@/public/images/digital_india.png';
import Slider8 from '@/public/images/mygov.png';
import Image from "next/image";

export default function App() {
  return (
    <Splide
      options={{
        type: "loop",
        gap: "10px",
        drag: "free",
        arrows: false,
        pagination: false,
        perPage: 5,
        autoScroll: {
          pauseOnHover: false,
          pauseOnFocus: false,
          rewind: false,
          speed: 1
        }
      }}
      extensions={{ AutoScroll }}
    >
      <SplideSlide>
        <Image src={Slider1} alt="Image 1" />
      </SplideSlide>
      <SplideSlide>
        <Image src={Slider2} alt="Image 2" />
      </SplideSlide>
      <SplideSlide>
        <Image src={Slider3} alt="Image 3" />
      </SplideSlide>
      <SplideSlide>
        <Image src={Slider4} alt="Image 4" />
      </SplideSlide>
      <SplideSlide>
        <Image src={Slider5} alt="Image 5" />
      </SplideSlide>
      <SplideSlide>
        <Image src={Slider6} alt="Image 6" />
      </SplideSlide>
      <SplideSlide>
        <Image src={Slider7} alt="Image 7" />
      </SplideSlide><SplideSlide>
        <Image src={Slider8} alt="Image 8" />
      </SplideSlide>
    </Splide>
  );
}
