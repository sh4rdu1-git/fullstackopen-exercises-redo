import "./Header.css";

const Header = () => {
  return (
    <>
      <header className="header">
        <div className="container row">
          <div>
            <h1 className="header-title">Phonebook</h1>
          </div>
          <div>
            {" "}
            <a
              href="https://github.com/sh4rdu1-git/fullstackopen-exercises-redo/tree/main/part3/phonebook"
              className="btn__btnlink"
              target="_blank"
              rel="noreferrer"
            >
              Github Repo
            </a>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
