import Navbar from "../components/Navbar";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#faf9f6] text-[#292722]">
      <Navbar />

      <section className="mx-auto max-w-4xl px-6 py-20">
        <p className="mb-3 text-sm uppercase tracking-[0.2em] text-[#8b806f]">
          Get in touch
        </p>

        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
          Contact Us
        </h1>

        <p className="mt-5 max-w-2xl text-lg leading-8 text-[#716d64]">
          Have a question, suggestion, or just want to say hello? We would
          love to hear from you.
        </p>

        <div className="mt-12 rounded-[2rem] border border-[#e8e4dc] bg-white p-8 md:p-10">
          <form className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium"
              >
                Name
              </label>

              <input
                id="name"
                type="text"
                placeholder="Your name"
                className="w-full rounded-xl border border-[#e8e4dc] bg-[#faf9f6] px-4 py-3 outline-none transition focus:border-[#8b806f]"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-xl border border-[#e8e4dc] bg-[#faf9f6] px-4 py-3 outline-none transition focus:border-[#8b806f]"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-medium"
              >
                Message
              </label>

              <textarea
                id="message"
                rows={6}
                placeholder="How can we help?"
                className="w-full resize-none rounded-xl border border-[#e8e4dc] bg-[#faf9f6] px-4 py-3 outline-none transition focus:border-[#8b806f]"
              />
            </div>

            <button
              type="button"
              className="rounded-full bg-[#292722] px-7 py-3 text-sm font-medium text-white transition hover:bg-[#454139]"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}