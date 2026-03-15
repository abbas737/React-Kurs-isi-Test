import Navigator from "./components/Navigator"
import Loading from "./components/Loading"
import { useTokens } from "./stores/TokenStore"


const App = () => {
  const {loading} = useTokens()
  return (
    <div className={`w-full h-full relative ${loading ? "h-screen overflow-hidden" : ""}`}>
      {loading && <Loading />}
    <Navigator/>
    </div>
    
  )
}

export default App
