import React, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import {Link} from "react-router-dom"


const Assembly = (props) => {
  const [selectedData, setSelectedData] = useState(props.select);
  const [assemblyData, setAssemblyData] = useState([]);

  const [{ isOver }, addToTeamRef] = useDrop({
    accept: "player",
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const [{ isOver: isPlayerOver }, removeFromTeamRef] = useDrop({
    accept: "assemblyData",
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const movePlayer = (item) => {
    console.log(item);
    if (item && item.type === "player") {
      //Accepting player into the assemblyData
      setAssemblyData((_team) => [..._team, selectedData[item.index]]);
      setSelectedData((_players) => _players.filter((_, idx) => idx !== item.index));
    } else {
      //Removing a player from assemblyData
      setSelectedData((_players) => [..._players, assemblyData[item.index]]);
      setAssemblyData((_team) => _team.filter((_, idx) => idx !== item.index));
    }
  };

  const dragHoverTeamBG = isOver ? "bg-warning" : "bg-light";
  const dragHoverPlayerBG = isPlayerOver ? "bg-warning" : "bg-light";

  return (<>
        <h2>Drag and Drop Products</h2>
        
        <Link to={{
                    pathname:`/finalassembly`,
                    state:{products:assemblyData}
                }} 
        >
            <button className="btn btn-primary m-2">Go To Final Assembly</button>
        </Link>
        <div className="row justify-content-md-center ">
            <div className={`col-4 border m-2 overflow-scroll  ${dragHoverPlayerBG}`} style={{height:"100vh"}}>
                <div className="bg-success  text-white">
                <h3 className="p-1 font-weight-bold">Selected Product</h3>
                </div>

                <div className="h-100" ref={removeFromTeamRef}>
                {selectedData.map((player, idx) => (
                    <Player
                    {...player}
                    key={player.id}
                    index={idx}
                    playerType="player"
                    onDropPlayer={movePlayer}
                    />
                ))}
                </div>

            </div>
            
            <div className={`col-6 border m-2 ${dragHoverTeamBG}`}>
                <div className="bg-success text-white">
                <h3 className="p-1 font-weight-bold">Select for Final Assembly</h3>
                </div>
                
                <div className="h-100" ref={addToTeamRef}>
                {assemblyData.map((player, idx) => (
                    <Player
                    {...player}
                    key={player.id}
                    index={idx}
                    playerType="assemblyData"
                    onDropPlayer={movePlayer}
                    />
                ))}
                </div>
            </div>
        </div>
    </>
  );
};

const Player = ({
  name,
  url,
  index,
  playerType,
  onDropPlayer,
}) => {
  const [{ isDragging }, dragRef] = useDrag({
    item: {
      type: playerType,
      index,
    },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();

      if (item && dropResult) {
        onDropPlayer(item);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
        <div className="card m-2 my-3 d-flex justify-content-center flex-column border border-primary" ref={dragRef}>
            <div>
                <img src={url} className="card-img-top px-5" alt="Not Found!!" height="250"/>
            </div>
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
            </div>
        </div>
    );
};
export default Assembly;