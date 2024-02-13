import Link from "next/link";

const Hero = () => {
  return (
    <div className="hero p-0 bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Fuel your vision</h1>
          <p className="py-6 font-light text-lg">Transform your funding experience with Allo – where democratic capital allocation meets ease of use.</p>
          <div className="flex justify-center space-x-10">
            <Link href="/create" className="btn rounded-lg btn-primary">Get Started</Link>
            <Link href="/learn" className="btn rounded-lg btn-primary">Learn How</Link>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Hero;