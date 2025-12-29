import React from "react";
import Header from "@/components/Header";
import QuoteForm from "@/components/QuoteForm";
import Footer from "@/components/Footer";

const QuotePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-32">
        <QuoteForm />
      </main>
      <Footer />
    </div>
  );
};

export default QuotePage;