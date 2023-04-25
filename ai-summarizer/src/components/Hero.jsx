import { logo } from "../assets";

const Hero = () => {
  return (
    <header
      className="w-full flex justify-center 
    flex-col items-center"
    >
      <nav
        className="flex justify-between 
      items-center w-full mb-10 pt-3"
      >
        <img src={logo} alt="AI Summarizer" className="w-28 object-contain" />

        <button
          onClick={() => window.open("https://github.com/hector-mendoza")}
          className="black_btn"
        >
          GitHub
        </button>
      </nav>
      <h1 className="head_text">
        Summarize Articles with <br className="max-md:hidden" />
        <span className="orange_gradient">OpenAI GPT-4</span>
      </h1>
      <h2 className="desc">
        Simplify your reading with Summarize, an open-source AI tool that that
        transforms long articles or any website into short, clear and concise
        summaries.
      </h2>
    </header>
  );
};

export default Hero;
