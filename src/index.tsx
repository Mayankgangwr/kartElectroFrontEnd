import { render } from "react-dom";
import "./index.css";
import App from "./App";
import { PrimeReactProvider } from "primereact/api";

import "primereact/resources/themes/lara-light-cyan/theme.css";

const rootElement = document.getElementById("root");
render(<div className="rootclass">
    <PrimeReactProvider>
        <App />
    </PrimeReactProvider></div>, rootElement);


