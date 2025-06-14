import Image from "next/image"
import Link from "next/link"
import BrandLogos from "./components/BrandLogos"
import ContactForm from "./components/ContactForm"



export default function Home() {

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-tan-blonde via-medium-brown to-dark-brown animate-gradient-x z-[0]"></div>
        <div className="absolute inset-0 opacity-50 z-[0]">
          <Image
            src="/landingpage.png?height=800&width=1200"
            alt="Industrial materials background"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-[1] text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-down text-white drop-shadow-lg">
            Riya Electrodes
          </h1>
          <p className="text-xl md:text-3xl mb-8 animate-fade-in-up text-[#fff9e7] font-light">
            Premium Wires, Filters & Resins for Industrial Excellence
          </p>
          <Link
            href="/products"
            className="inline-block bg-white text-dark-brown px-8 py-4 rounded-full text-xl font-semibold hover:bg-pale-blonde transition-all duration-300 transform hover:scale-105 shadow-lg animate-float"
          >
            Explore Products
          </Link>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="max-w-7xl mx-auto my-[64px] px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-12 text-center text-dark-brown">Product Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Brass Wires",
              desc: "High quality wires for precision applications",
              color: "from-tan-blonde to-medium-brown",
              src: "wire_category.png",
              cat:"Wire"
            },
            {
              name: "Filters",
              // desc: "HEPA and carbon filters for clean environments",
              desc:"Designed for industrial-grade EDM machines",
              color: "from-medium-brown to-dark-brown",
              src: "filter_cat.png",
              cat:"Filter"
            },
            {
              name: "Resins",
              // desc: "Epoxy and polyurethane compounds for bonding",
              desc:"Ensures stable machining performance",
              color: "from-dark-brown to-tan-blonde",
              src: "resin_cat.png",
              cat:"Resin"
            },
          ].map((category, index) => (
            <Link href={`/products?category=${category.cat}`} key={category.name} className={`relative h-80 rounded-[2px] overflow-hidden group card-hover shadow-xl`}>
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-90`}></div>
              <Image
                src={`/${category.src}?height=400&width=400`}
                alt={category.name}
                fill
                className="object-cover transition duration-500 group-hover:scale-110 opacity-60"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                <h3 className="text-white text-2xl font-bold mb-3">{category.name}</h3>
                <p className="text-pale-blonde text-sm leading-relaxed">{category.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* About Section */}
      {/* <section className="py-20 bg-gradient-to-b from-pale-blonde to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12 text-center text-dark-brown">About Our Company</h2>
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/2 card-hover">
              <Image
                src="/placeholder.svg?height=500&width=600"
                alt="Industrial facility"
                width={600}
                height={500}
                className="rounded-2xl shadow-2xl"
              />
            </div>
            <div className="w-full lg:w-1/2 space-y-6">
              <p className="text-lg text-medium-brown leading-relaxed">
                We are a leading supplier of precision industrial materials, specializing in high-quality wires,
                filters, and resins. Our commitment to excellence ensures that every product meets the highest standards
                of performance and reliability.
              </p>
              <p className="text-lg text-medium-brown leading-relaxed">
                With partnerships with renowned brands like Nakanishi, Hitachi, and Besdia, we provide cutting-edge
                solutions for industries requiring precision and quality. Our expertise spans across various
                applications, from dental equipment to industrial manufacturing.
              </p>
              <Link
                href="/products"
                className="inline-block btn-primary px-8 py-4 rounded-full text-lg font-semibold shadow-lg"
              >
                View Our Products
              </Link>
            </div>
          </div>
        </div>
      </section> */}

      <section className="py-20 bg-gradient-to-b from-pale-blonde to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12 text-center text-dark-brown">About Our Company</h2>

          <div className="flex flex-col lg:flex-row gap-12">

            <div className="w-full lg:w-1/2 space-y-6 text-[#4d4341] text-lg leading-relaxed">
              <p><strong>RIYA Electrodes Pvt. Ltd.</strong> promoted by Riya International is a well-known company in the area of EDM and Polishing related products. RIYA is known for <strong>QUALITY, INTEGRITY</strong> and <strong>PERSONAL SERVICE</strong> since Jan. 2001 — a one-stop solution for all your EDM and Polishing related needs.</p>
              <p>From our humble beginnings, we have grown steadily to become a supermarket of Quality EDM Supplies & Polishing materials/machines. We have become the industry leader by remaining true to our unique, successful business philosophy.</p>
              <p>RIYA has earned its industry leadership role by offering many value-added services:</p>
              <ul className="list-disc pl-6">
                <li>Extensive inventory assures that most orders are shipped from stocks</li>
                <li>Same day shipment of stock items</li>
                <li>Highest levels of personal and corporate integrity</li>
              </ul>
            </div>

            <div className="w-[90%] lg:w-1/2 flex justify-center items-center relative">
              {/* <div className="absolute left-[24px] md:left-[83px] lg:left-[60px] top-0 bottom-0 w-1 bg-dark-brown rounded-full z-0"></div> */}

              <ol className="space-y-14 pl-12 h-[90%] flex flex-col justify-center border-l-2 border-dark-brown">
                {[
                  {
                    title: "2000 — Established Riya International HQ, Faridabad",
                    desc: "With a vision to offer world-class products to the Indian Tooling Industry",
                  },
                  {
                    title: "2005 — Founded Riya Electrodes Pvt. Ltd., Faridabad",
                  },
                  {
                    title: "Expanded Footprint",
                    desc: "Branches established in Chennai & Pune",
                  },
                  {
                    title: "2018 — Riya Industries Manufacturing Unit",
                    desc: "Set up in Bhiwadi, Rajasthan for automotive injection moulding parts",
                  },
                ].map((item, idx) => (
                  <li key={idx} className="relative group transition-transform duration-300 hover:-translate-y-1">
                    <div className="absolute w-4 h-4 bg-white border-4 border-dark-brown rounded-full -left-14  top-1 group-hover:shadow-lg group-hover:scale-110 transition-all duration-300 z-10"></div>

                    <p className="font-semibold">{item.title}</p>
                    {item.desc && <p className="text-sm text-medium-brown">{item.desc}</p>}
                  </li>
                ))}
              </ol>
            </div>


          </div>

          <div className="mt-12 text-center">
            <Link
              href="/products"
              className="inline-block bg-dark-brown text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:bg-brown-700 transition"
            >
              View Our Products
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Logos Section */}
      <section id="brands" className="py-20 bg-gradient-to-r from-tan-blonde to-medium-brown">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12 text-center text-white">Trusted Brands</h2>
          <BrandLogos />
          <div className="text-center mt-12">
            <p className="text-pale-blonde text-lg mb-6">
              We partner with industry-leading manufacturers to bring you the finest materials
            </p>
            <Link
              href="/products"
              className="inline-block bg-white text-dark-brown px-8 py-3 rounded-full font-semibold hover:bg-pale-blonde transition-all duration-300 shadow-lg"
            >
              Shop by Brand
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="bg-pale-blonde py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12 text-center text-dark-brown">Get In Touch</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-dark-brown">Contact Information</h3>
              <p className="text-[#4d4341] leading-relaxed">
                Ready to discuss your material needs? Our expert team is here to help you find the perfect solution for
                your application.
              </p>
              <div className="space-y-4 text-[#4d4341]">
                <p className="flex items-center">
                  <span className="font-semibold w-20">Email:</span>
                  <span>riyaelectrodesceo@gmail.com</span>
                </p>
                <p className="flex items-center">
                  <span className="font-semibold w-20">Phone:</span>
                  <span>+91 9717012810, +91 9810184577</span>
                </p>
                {/* <p className="flex items-start">
                  <span className="font-semibold w-20">Address:</span>
                  <span>456 Industrial Blvd, Manufacturing District, 78901</span>
                </p> */}
              </div>
              <div className="space-y-4 text-[#4d4341] mt-8">
                <h4 className="text-xl font-semibold text-dark-brown">Our Offices</h4>
                <div>
                  <p className="font-semibold">Head Office:</p>
                  <p>Riya Electrodes Pvt. Ltd., S.C.F-30P, Part-1 Market, Sector -16A, Faridabad-121002, Haryana</p>
                </div>
                <div>
                  <p className="font-semibold">Pune Office:</p>
                  <p>Gala No. C-05, Plot No. T-80, Mangal Murti Indus Complex, MIDC, Bhosari, Pune-411026</p>
                </div>
                <div>
                  <p className="font-semibold">Chennai Office:</p>
                  <p>Plot No-20A, Kumaran Nagar, Kundrathur, Chennai-600069</p>
                </div>
                <div>
                  <p className="font-semibold">Manufacturing Unit:</p>
                  <p>Riya Industries, F-25, Khuskhera, RIICO Industrial Area, Bhiwadi (Rajasthan)</p>
                </div>
              </div>

            </div>
            
            <ContactForm/>
          </div>
        </div>
      </section>
    </div>
  )
}
