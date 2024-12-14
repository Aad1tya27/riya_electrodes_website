import Image from 'next/image'
import Link from 'next/link'
// import BrandLogos from '../components/BrandLogos'
import BrandLogos from '@/components/BrandLogos'

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 animate-gradient-x z-[0]"></div>
        <div className="absolute inset-0 opacity-30 z-[0]">
          <Image
            src="/placeholder.svg"
            alt="Hero background"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-[1] text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in-down">Riya Electrodes</h1>
          <p className="text-xl md:text-2xl mb-8 animate-fade-in-up">Precision Products for Seamless Manufacturing</p>
          <Link href="/products" className="bg-white text-gray-800 px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300 animate-pulse">
            Explore Our Products
          </Link>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Featured Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {['Wires', 'Filters', 'Resin'].map((category) => (
            <div key={category} className="relative h-64 rounded-lg overflow-hidden group shadow-lg transform transition duration-300 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 opacity-75"></div>
              <Image
                src="/placeholder.svg"
                alt={category}
                fill
                className="object-cover transition duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-2xl font-semibold">{category}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">About Riya Electrodes</h2>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2 transform transition duration-300 hover:scale-105">
              <Image
                src="/placeholder.svg"
                alt="About Riya Electrodes"
                width={500}
                height={300}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="w-full md:w-1/2">
              <p className="text-lg mb-4 text-gray-600">
              Riya Electrodes is your trusted partner for all your manufacturing needs, specializing in high-quality EDM wires, filters, resins, and other essential supplies. We offer a comprehensive range of products that cater to various industrial applications, ensuring you have reliable and efficient resources to keep your operations running smoothly and effectively.
              </p>
              <p className="text-lg mb-4 text-gray-600">
              Our mission is to empower the manufacturing industry by delivering top-notch products that meet stringent quality standards and provide outstanding performance. We are dedicated to helping you achieve precision and productivity in your processes, with a focus on excellent customer service, competitive pricing, and swift delivery. Riya Electrodes is committed to supporting your business with unmatched expertise and solutions tailored to your unique requirements.
              </p>
              <Link href="/about" className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition duration-300 transform hover:scale-105">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Logos Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Our Brands</h2>
          <BrandLogos />
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Contact Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-700">Get in Touch</h3>
              <p className="mb-4 text-gray-600">We&#39;d love to hear from you. Please fill out the form below or reach out to us using the contact information provided.</p>
              <div className="space-y-2 text-gray-600">
                <p><strong>Email:</strong> riyaelectrodes.ceo@gmail.com</p>
                <p><strong>Phone:</strong> +91 9717012810</p>
                <p><strong>Address:</strong> S.C.F-30P, Part-1 Market, Sector -16A, Faridabad-121002, Haryana</p>
              </div>
            </div>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block mb-2 text-gray-700">Name</label>
                <input type="text" id="name" name="name" className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-gray-700">Email</label>
                <input type="email" id="email" name="email" className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
              </div>
              <div>
                <label htmlFor="message" className="block mb-2 text-gray-700">Message</label>
                <textarea id="message" name="message" rows={4} className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent" required></textarea>
              </div>
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">Send Message</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

