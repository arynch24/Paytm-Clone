import { useNavigate } from 'react-router-dom'

const Navigation = () => {
  const navigate = useNavigate()

  return (
    <header className="bg-gray-900 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-wide">💸 Paytm Banking App</h1>
        <nav>
          <ul className="flex space-x-6 text-md font-medium">
            <li
              className="cursor-pointer hover:text-blue-400 transition"
              onClick={() => navigate('/signup')}
            >
              Sign Up
            </li>
            <li
              className="cursor-pointer hover:text-blue-400 transition"
              onClick={() => navigate('/signin')}
            >
              Sign In
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Navigation
