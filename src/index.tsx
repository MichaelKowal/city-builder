import ReactDOM from "react-dom/client";
import Game from "./game/game";
import "./i18n";
import UI from "./ui/ui";

// Create the game with a city the size of 10x10. All the necessary setup
// will be done for you.  This will load all the THREE.js components.
Game.init(16, "Test City");

Game.start();

// Load the UI React components.
const root = ReactDOM.createRoot(document.getElementById("ui-target")!);

root.render(<UI />);
