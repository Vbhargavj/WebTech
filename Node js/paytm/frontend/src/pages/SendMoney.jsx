export function SendMoney() {
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center ">
        
          <div className="font-bold text-2xl p-3"> Send Money</div>

          <div className="flex justify-center  text-xl font-medium px-3 ">
            Friends name
          </div>

          <div className="flex justify-center">
            <input
              placeholder="Enter the amount "
              className=" border-2  mb-3 mt-3 "
            ></input>
          </div>
          
          <div>
            <button
              type="button"
              className=" mt-4 mb-6 py-2 p-1 px-6 me-2 text-sm  font-bold text-green-900 focus:outline-none bg-white rounded-lg border border-green-200 hover:bg-green-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-green-100 dark:focus:ring-green-700 dark:bg-green-800 dark:text-green-400 dark:border-green-600 dark:hover:text-white dark:hover:bg-green-700"
            >
              Initilize Transfer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
