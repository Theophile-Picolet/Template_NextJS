"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./page.module.scss";

export default function ActorPage() {
  const [actors, setActors] = useState([]);

  useEffect(() => {
    const fetchActors = async () => {
      const { data } = await axios.get("http://localhost:1337/api/actors");

      setActors(data);
    };
    fetchActors();
  }, []);
  return (
    <div style={{ paddingTop: "50px" }}>
      <h1>Acteurs</h1>
      <div className={styles.containerActor}>
        {actors.map((actor) => (
          <div key={actor.id} className={styles.actorCard}>
            <h2>{actor.name}</h2>
            <p>{actor.description}</p>
            <img src={actor.profile_path} alt={actor.name} />
          </div>
        ))}
      </div>
    </div>
  );
}
