import SectionHeading from "@/components/SectionHeading";

export default function WhyCleanAIText() {
  return (
    <section className="bg-neutral-50">
      <div className="container mx-auto flex flex-col gap-6 px-6 py-20">
        <SectionHeading
          title="Why clean AI text"
          subtitle="AI writing tools leave more behind than words."
        />
        <div className="mx-auto flex max-w-2xl flex-col gap-4 text-left">
          <p className="text-body-md text-neutral-700">
            Text copied from ChatGPT, Claude, Gemini, and other AI tools
            often carries hidden characters, smart quotes, em dashes, and
            leftover Markdown syntax that were never meant to leave the chat
            window.
          </p>
          <p className="text-body-md text-neutral-700">
            These artifacts can break search and find-and-replace, cause
            formatting problems when pasted into another document, and make
            plain text behave unpredictably.
          </p>
          <p className="text-body-md text-neutral-700">
            Cleaning your text removes these quirks, so it reads and behaves
            like text you typed yourself.
          </p>
        </div>
      </div>
    </section>
  );
}
