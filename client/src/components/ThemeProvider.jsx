import { useSelector } from 'react-redux'

export default function ThemeProvider({ children }) {
  const { theme } = useSelector((state) => state.theme)
  return (
    <div className={theme}>
      <div className='bg-zinc-50 text-zinc-800 dark:text-gray-200 dark:bg-[#161616] min-h-screen'>
        {children}
      </div>
    </div>
  )
}