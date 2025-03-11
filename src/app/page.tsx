import Image from "next/image";
import "./page.module.css"; 

export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen p-6">
      
      <div className="relative w-full h-[200px]">
      <Image
  src="/image/luxurious-car-parked-highway-with-illuminated-headlight-sunset.jpg"
  alt="Luxurious Car Parked on Highway"
  width={1600}
  height={200}
  className="rounded-lg shadow-lg w-full"
/>

</div>


    </main>
  );
}
