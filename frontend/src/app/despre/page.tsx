export default function Despre() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Despre Sudexpert
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-500">
            Partenerul tău de încredere în echipamente de sudură profesionale.
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="pt-6">
              <div className="flow-root rounded-lg bg-gray-50 px-6 pb-8">
                <div className="-mt-6">
                  <div className="inline-flex items-center justify-center rounded-md bg-orange-500 p-3 shadow-lg">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <h3 className="mt-8 text-lg font-medium tracking-tight text-gray-900">Calitate Superioară</h3>
                  <p className="mt-5 text-base text-gray-500">
                    Oferim doar echipamente și consumabile de la producători de top, garantând durabilitate și performanță.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <div className="flow-root rounded-lg bg-gray-50 px-6 pb-8">
                <div className="-mt-6">
                  <div className="inline-flex items-center justify-center rounded-md bg-orange-500 p-3 shadow-lg">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="mt-8 text-lg font-medium tracking-tight text-gray-900">Livrare Rapidă</h3>
                  <p className="mt-5 text-base text-gray-500">
                    Înțelegem importanța timpului tău. Asigurăm livrare rapidă în toată țara pentru a-ți menține proiectele în mișcare.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <div className="flow-root rounded-lg bg-gray-50 px-6 pb-8">
                <div className="-mt-6">
                  <div className="inline-flex items-center justify-center rounded-md bg-orange-500 p-3 shadow-lg">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="mt-8 text-lg font-medium tracking-tight text-gray-900">Expertiză Tehnică</h3>
                  <p className="mt-5 text-base text-gray-500">
                    Echipa noastră de specialiști este pregătită să ofere consultanță tehnică pentru a alege soluția optimă.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
