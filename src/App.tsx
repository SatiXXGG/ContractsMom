import { useState } from "react";
import "./App.css";
import Input from "./components/input";
import TextZone from "./components/textzone";
import Questions from "./data/questions.json";
import { generarPDF } from "./func/generatePdf";

function App() {
  const [data, setData] = useState<{ [key: string]: string }>({});
  return (
    <main className="my-12">
      <form
        className="flex gap-4 flex-col"
        onSubmit={(e) => {
          e.preventDefault();
          console.log(data);
          generarPDF(data);
        }}
      >
        {Questions &&
          Questions.map((section, sectionIndex) => {
            return (
              <div className="bg-neutral-50 dark:bg-neutral-800 p-12 rounded-4xl outline-2 outline-neutral-200 dark:outline-neutral-700 shadow-sm flex gap-2 flex-col">
                <p className="text-center font-black text-3xl dark:text-blue-800 text-blue-600">
                  {section.title}
                </p>
                {section.data.map((data, index) => {
                  const elementId = `${sectionIndex}-${index}`;

                  return data.textzone ? (
                    <TextZone
                      onChange={(e) => {
                        setData((data) => {
                          return {
                            ...data,
                            [elementId]: e.target.value,
                          };
                        });
                      }}
                      key={elementId}
                      placeholder={data.placeholder}
                      subtitle={data.subtitle}
                    ></TextZone>
                  ) : (
                    <Input
                      onChange={(e) => {
                        setData((data) => {
                          return {
                            ...data,
                            [elementId]: e.target.value,
                          };
                        });
                      }}
                      placeholder={data.placeholder}
                      subtitle={data.subtitle}
                    ></Input>
                  );
                })}
              </div>
            );
          })}

        <button
          className="px-3 py-2 bg-blue-600 rounded-2xl border-blue-700 border text-white font-black"
          type="submit"
        >
          Descargar
        </button>
        <button
          className="px-3 py-2 bg-red-500 rounded-2xl border-red-400 border text-white w-24 mx-auto"
          type="reset"
        >
          Reiniciar
        </button>
      </form>
    </main>
  );
}

export default App;
