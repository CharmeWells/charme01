import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { HtmlQuickReference } from './components/HtmlQuickReference'

function App() {
  return (
    <div id="top" className="app-shell docs-app">
      <Header />
      <HtmlQuickReference />
      <Footer />
    </div>
  )
}

export default App
