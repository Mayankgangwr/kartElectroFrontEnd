import { observer } from "mobx-react";
import React from "react";
import { Link } from "react-router-dom";

const Logo: React.FC = () => {
  return (
    <Link to="/">
      <div className="font-monoton text-3xl hover:text-red-800 cursor-pointer text-center transition" style={{ fontSize: '16px' }}>
        Kart Electro
      </div>
    </Link>
  );
};

export default observer(Logo);
