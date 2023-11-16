import ReactDOM from "react-dom/client";
import GameManager from "./game/gameManager";
import "./i18n";
import UI from "./ui/ui";

// Create the game with a city the size of 10x10. All the necessary setup
// will be done for you.  This will load all the THREE.js components.
GameManager.init(16, "Georgiaville");

GameManager.start();

// Load the UI React components.
const root = ReactDOM.createRoot(document.getElementById("ui-target")!);

root.render(<UI />);
