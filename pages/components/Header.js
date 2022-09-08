import Link from "next/link";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";

export default function Header() {
  const [results, setResults] = useState([]);
  const searchRef = useRef();
  // locale is the actual language, and locales is the list of languages availables
  const { locale, locales } = useRouter();

  const getValue = () => searchRef.current?.value;

  const handleChange = () => {
    const q = getValue();
    fetch(`/api/search?q=${q}`)
      .then((res) => res.json())
      .then((data) => {
        setResults(data.results);
      });
  };

  // determine which language is active
  const restOfLocales = locales.filter((l) => l !== locale);

  return (
    <header className="flex bg-sky-800 justify-between items-center py-4 px-5 w-screem mb-4">
      <h1 className="font-bold text-gray-50">
        <Link href="/">
          <a className="transition hover:opacity-80">
            Next<span className="font-light">xkcd</span>
          </a>
        </Link>
      </h1>
      <nav className="flex items-center">
        <ul className="flex gap-2 justify-around items-center">
          <li className="mb-0">
            <Link href="/">
              <a className="text-sm font-semibold text-gray-50">Home</a>
            </Link>
          </li>
          <li className="mb-0">
            {/* we use locale prop to deterine which is the correct locale to get an URL */}
            <Link href={`/`} locale={restOfLocales[0]}>
              <a className="text-sm font-semibold text-gray-50">
                {restOfLocales[0]}
              </a>
            </Link>
          </li>
          <li className="mb-0">
            <input
              ref={searchRef}
              type="text"
              placeholder="Search"
              onChange={handleChange}
              className="text-sm font-semibold bg-gray-100 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:bg-white"
            />
            <div className="relative z-10">
              {!!results.length && (
                <div className="absolute left-0 w-full top-1">
                  <ul className="border border-gray-50 shadow-xl rounded-lg bg-white overflow-hidden">
                    <li className="m-0">
                      <Link href={`/search?q=${getValue()}`}>
                        <a className="text-sm italic text-gray-500 hover:bg-slate-200 block px-2 py-1 text-ellipsis overflow-hidden whitespace-nowrap">
                          Ver {results.length} resultados
                        </a>
                      </Link>
                    </li>
                    {results.map((result) => (
                      <li key={result.id} className="m-0">
                        <Link href={`/comic/${result.id}`}>
                          <a className="text-sm hover:bg-slate-200 block px-2 py-1 text-ellipsis overflow-hidden whitespace-nowrap">
                            {result.title}
                          </a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
}
