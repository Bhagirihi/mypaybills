/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unknown-property */
import Head from "next/head";
import Image from "next/image";
import { Element } from "../components/Element";
import { Navbar } from "../components/Navbar";
import styles from "../styles/Home.module.css";
import { Footer } from "../components/Footer";
import axios from "axios";
import cheerio from "cheerio";

export default function Home() {
  const makePayment = async () => {
    console.log("here...");
    const res = await initializeRazorpay();

    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }

    // Make API call to the serverless API
    const data = await fetch("/api/razorpay", { method: "POST" }).then((t) =>
      t.json()
    );
    console.log(data);
    var options = {
      key: process.env.RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
      name: "Bill Payment",
      currency: data.currency,
      amount: data.amount,
      order_id: data.id,
      description: "Thankyou for your test donation",
      image:
        "https://www.dhruvdave.in/_next/image?url=%2Fassets%2FDhruvdave1.png&w=384&q=75",
      handler: function (response) {
        // Validate payment at server - using webhooks is a better idea.
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
      },
      prefill: {
        name: "Dhruv Dave",
        email: "dvesp1901@gmail.com",
        contact: "9999999999",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };
  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      // document.body.appendChild(script);

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  return (
    <div>
      <Head>
        <title>Welcome Home 🔥</title>
        <meta
          name="description"
          content="Integrate payments in your React and Next.js application with TailwindCSS and Razorpay"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="font-Inter h-screen overflow-auto bg-gradient-to-tr from-[#252B30] to-[#191C22]">
        <Navbar />
        <Hero />
        <Footer />
      </main>
    </div>
  );
}

const Service = [
  {
    title: "GIDC Water Bill",
    onClick: "/",
    image: "/save-water.png",
    imagealt: "WATERBILL",
  },
  {
    title: "GIDC Electricity Bill",
    onClick: "/",
    image: "/plug.png",
    imagealt: "ELECTRICITYBILL",
  },
  {
    title: "LIC Premium Pay",
    onClick: "/",
    image: "/healthcare.png",
    imagealt: "LICPREMIUMPAY",
  },
  {
    title: "Bank Accounts",
    onClick: "/",
    image: "/online-payment.png",
    imagealt: "BANKACCOUNTS",
  },
];

const Hero = ({ onClick }) => {
  return (
    <div class="w-full ">
      <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-12">
        <div class="text-center pb-12">
          <h1 class="font-bold text-3xl md:text-4xl lg:text-5xl font-heading text-white">
            Services
          </h1>
          <h2 class="text-base font-bold text-indigo-600">
            Service that helps you to grow
          </h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-3">
          {Service.map((item) => {
            return (
              // eslint-disable-next-line react/jsx-key
              <a href={item.onClick}>
                <div class="w-full bg-gray-900 hover:bg-gray-800 rounded-lg sahdow-lg p-12 flex flex-col justify-center items-center">
                  <div class="mb-8">
                    <img
                      class="object-center object-cover h-36 w-36"
                      src={item.image}
                      alt={item.imagealt}
                    />
                  </div>
                  <div class="text-center">
                    <p class="text-xl text-white font-bold mb-2">
                      {item.title}
                    </p>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </section>
    </div>
  );
};
