
const Header = () => {
  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Your App</h1>
        <div className="flex space-x-4">
          <button className="flex items-center bg-green-700 px-2 py-2 rounded-md hover:bg-green-900">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
            <span>チャット</span>
          </button>
          <button className="flex items-center bg-gray-700 px-3 py-2 rounded-md hover:bg-gray-900">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span>通知</span>
          </button>
          <button className="flex items-center bg-red-700 px-3 py-2 rounded-md hover:bg-red-900">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>サインアウト</span>
          </button>
          {/* ここにユーザーボタンを追加 */}
        </div>
      </div>
    </header>
  );
}

export default Header;