import React from "react";

class Startpage extends React.Component {

    render() {

        let imgUrl = '..image/backgroundImage.jpg'

        const sectionStyle = {
            backgroundImage: `url(${"image/backgroundImage.jpg"})`,
            height: '95vh',
            backgroundSize: 'cover',
            margin: 0,
            padding: 0
          };

        return (
            <div style={ sectionStyle }>
            <div id="landingText">

                <p>My-Car-App</p>
                <p>Die smarte Lösung für ihre Fuhrpark Verwaltung</p>
              
            </div>
            </div>
        )
    }

}

export default Startpage;