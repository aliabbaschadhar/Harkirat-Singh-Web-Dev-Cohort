import { PlusIcon } from "./assets/icons/PlusIcon"
import { ShareIcon } from "./assets/icons/ShareIcon"
import { Button } from "./components/ui/Button"

function App() {
  return (
    <>
      <div className="flex items-center">
        <Button
          endIcon={<ShareIcon />}
          variant="primary"
          text="Share"
          size="sm"
          onClick={() => console.log("I am clicked")}
        />
        <Button
          startIcon={<PlusIcon />}
          variant="secondary"
          text="Add Content"
          size="md"
          onClick={() => console.log("I am clicked")}
        />
        <Button
          startIcon={<PlusIcon />}
          variant="secondary"
          text="Add Content"
          size="lg"
          onClick={() => console.log("I am clicked")}
        />
      </div>
    </>
  )
}

export default App
