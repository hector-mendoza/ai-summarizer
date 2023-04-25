import { useState, useEffect } from "react";

import { copy, linkIcon, loader, tick } from "../assets";
import { useLazyGetSummaryQuery } from "../services/article";

const Demo = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });

  const [allArticles, setAllArticles] = useState([]);

  // getSummary will execute when handleSubmit is called
  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  const [copied, setCopied] = useState("");

  useEffect(
    () => {
      const savedArticles = JSON.parse(localStorage.getItem("articles"));
      if (savedArticles) setAllArticles(savedArticles);
    },
    [
      /*allArticles */
    ]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await getSummary({
      articleUrl: article.url,
    });
    if (data?.summary) {
      const newArticle = {
        ...article,
        summary: data.summary,
      };

      const updatedAllArticles = [
        newArticle,
        ...allArticles.filter((article) => article.url !== newArticle.url),
      ];

      setArticle(newArticle);
      setAllArticles(updatedAllArticles);
      localStorage.setItem("articles", JSON.stringify(updatedAllArticles));

      console.log(newArticle);
    }
  };

  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <section className="mt-16 w-full max-w-xl">
      {/* Search */}
      <div className="flex flex-col w-full gap-2">
        <form
          className="relative flex justify-center
        items-center"
          onSubmit={handleSubmit}
        >
          <img
            src={linkIcon}
            alt="Linked"
            className="absolute 
        left-0 my-2 ml-3 w-5"
          />
          <input
            typeof="url"
            placeholder="https://example.com/"
            value={article.url}
            onChange={(e) =>
              setArticle({
                ...article,
                url: e.target.value,
              })
            }
            required
            className="url_input peer"
          />
          <button
            type="submit"
            className="submit_btn 
          peer-focus:border-gray-700 
          peer-focus:text-gray-700"
          >
            ↵
          </button>
        </form>

        {/* Browser URL History */}
        <div
          className="flex flex-col gap-1 max-h-60 
        overflow-y-auto"
        >
          {allArticles.map((article, index) => (
            <div
              key={`link-${index}`}
              onClick={() => setArticle(article)}
              className="link_card"
            >
              <div className="copy_btn" onClick={() => handleCopy(article.url)}>
                <img
                  src={copied === article.url ? tick : copy}
                  alt="Copy this link"
                  className="w-[40%] 
                h-[40%] object-contain"
                />
              </div>
              <p
                className="flex-1 font-satoshi 
              text-blue-700 font-medium text-sm truncate"
              >
                {article.url}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Display Results */}
      <div className="my-10 max-w-full flex justify-center items-center">
        {isFetching ? (
          <img
            src={loader}
            className="w-20 h-20 object-contain"
            title="Loading..."
            alt="Loading..."
          />
        ) : error ? (
          <p
            className="font-inter 
              text-black font-bold text-center"
          >
            Well, that wasn't supposed to happen...
            <br />
            <span className="font-satoshi font-normal text-gray-700">
              {error?.data?.error}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className="flex flex-col gap-3">
              <h2
                className="font-satoshi font-bold 
                  text-gray-700 text-xl"
              >
                Article <span className="blue_gradient">Summary</span>
              </h2>
              <div className="summary_box">
                <p
                  className="font-inter font-medium 
                text-sm text-gray-700"
                >
                  {article.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Demo;
