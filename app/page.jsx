import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        {/* hide it on large devices but break the content on smaller devices */}
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">AI-Powered Prompts</span>
      </h1>
      <p className="desc text-center">
        Promptopia is an open-source AI prompting tool for modern world to discover, create and share creative propmpts
      </p>

      {/* Feed */}
      <Feed />
    </section>
  )
}

export default Home;