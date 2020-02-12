import React from "react";
import { Image } from 'react-bootstrap';

class Startpage extends React.Component {
    render() {
        return (
            <section className="startPage">
                <div className="startText">
                <h1>My Car App</h1>
                <br/>
                <h4>... vielleicht das Beste Flottenmanagement in ganz Deutschland ...</h4>
                <br/>
                <p>Möchtest du auch deine Autokosten unter Kontrolle haben?</p>
                <br/>
                <p>Registriere dich kostenlos in unserer Plattform und hinterlege beliebig viele Autos</p>
                <br/>
                <p>Lade deine Rechnungen hoch und führe ein Logbuch</p>
                <br/>
                <p>Damit siehst du am Ende wie viel dein Auto noch Restwert hat</p>
                <br/>
                <p>Benutze unser Feature und finde deine bevorzugte Tankstellen mit den aktuellen Preisen</p>
                <br/>
                </div>
                <div className="startBild">
                <Image  className="startImage" src="./image/lamborgini.jpg" />
                </div>
            </section>
        )
    }

}

export default Startpage;